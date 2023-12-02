package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
)

type consentOperateReq struct {
	ID int64 `json:"id"`
}

func ConsentOperate(ctx *gin.Context) {

	var req consentOperateReq
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

	if operate.Status != "借出审核中" {
		tx.Rollback()
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	exec := tx.Exec("UPDATE asserts SET count = count - ?,updated_at=now() WHERE id = ? AND asserts.deleted_at IS NULL AND count - ? >= 0", operate.Count, operate.AssertID, operate.Count)

	if exec.RowsAffected != 1 || exec.Error != nil {
		tx.Rollback()
		httpx.BadRequest(ctx, "数量不够哦")
		return
	}

	err = tx.Model(&model.Operate{}).Where("id = ?", req.ID).Update("status", "资产使用中").Error
	if err != nil {
		tx.Rollback()
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	tx.Commit()

	operate.Status = "资产使用中"
	httpx.OkWithMsg(ctx, operate, "已同意资产申请")
}
