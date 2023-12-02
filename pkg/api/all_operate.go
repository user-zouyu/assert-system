package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
)

func AllOperate(ctx *gin.Context) {

	var operates []model.Operate
	err := conf.DB.Model(&model.Operate{}).Order("id desc").Preload("Assert").Find(&operates).Error
	if err != nil {
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	httpx.Ok(ctx, operates)
}
