package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
)

func GetOperate(ctx *gin.Context) {
	username, exists := httpx.GetUsername(ctx)
	if !exists {
		httpx.BadRequest(ctx, "参数错误")
		return
	}

	var operates []model.Operate
	err := conf.DB.Model(&model.Operate{}).
		Preload("Assert").
		Where("username = ?", username).
		Order("id desc").Find(&operates).Error
	if err != nil {
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	//conf.DB.Model(&operates).Association("Assert").Find(&roles)

	httpx.Ok(ctx, operates)
}
