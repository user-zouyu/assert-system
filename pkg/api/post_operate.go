package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type postOperateReq struct {
	ID    int64 `json:"id"`
	Count int   `json:"count,string"`
}

func PostOperate(ctx *gin.Context) {
	var req postOperateReq
	err := ctx.BindJSON(&req)
	if err != nil {
		httpx.BadRequest(ctx, "参数错误")
		return
	}

	username, ok := httpx.GetUsername(ctx)
	if !ok {
		httpx.Forbidden(ctx, "认证错误")
		return
	}

	operate := model.Operate{
		AssertID: req.ID,
		Count:    req.Count,
		Username: username,
		Status:   "借出审核中",
	}

	err = conf.DB.Transaction(func(tx *gorm.DB) error {

		err = tx.Model(&model.Operate{}).Create(&operate).Error
		if err != nil {
			return err
		}
		return nil
	})

	if err != nil {
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	httpx.OkWithMsg(ctx, operate, "借出成功")

}
