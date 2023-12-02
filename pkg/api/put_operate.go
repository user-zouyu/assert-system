package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
)

type putOperateReq struct {
	ID int64 `json:"id"`
}

func PutOperate(ctx *gin.Context) {
	var req putOperateReq
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

	if operate.Status != "资产使用中" {
		tx.Rollback()
		httpx.BadRequest(ctx, "资产不可归还")
		return
	}

	err = tx.Exec("UPDATE asserts SET count = count + ?,updated_at=now() WHERE id = ? AND asserts.deleted_at IS NULL", operate.Count, operate.AssertID).Error
	if err != nil {
		tx.Rollback()
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	err = tx.Model(&model.Operate{}).Where("id = ?", req.ID).Update("status", "已归还").Error
	if err != nil {
		tx.Rollback()
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	tx.Commit()

	operate.Status = "已归还"
	httpx.OkWithMsg(ctx, operate, "归还成功")
}
