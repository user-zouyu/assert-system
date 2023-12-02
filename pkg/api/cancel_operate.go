package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
)

type cancelOperateReq struct {
	ID int64 `json:"id"`
}

func CancelOperate(ctx *gin.Context) {
	var req cancelOperateReq
	if err := ctx.BindJSON(&req); err != nil {
		httpx.BadRequest(ctx, "参数错误")
		return
	}

	var operate model.Operate
	tx := conf.DB.Begin()
	err := tx.Model(&model.Operate{}).Where("id = ?", req.ID).First(&operate).Error
	if err != nil {
		tx.Rollback()
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	if operate.Status == "资产使用中" {
		tx.Rollback()
		httpx.BadRequest(ctx, "资产正在使用中")
		return
	}

	operate.Status = "已撤销"
	err = tx.Model(&model.Operate{}).Where("id = ?", req.ID).Update("status", operate.Status).Error
	if err != nil {
		tx.Rollback()
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	tx.Commit()
	httpx.OkWithMsg(ctx, operate, "撤销成功")
}
