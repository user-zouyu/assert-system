package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
)

func ListAssert(ctx *gin.Context) {
	var asserts []model.Assert
	err := conf.DB.Model(&model.Assert{}).Order("id desc").Find(&asserts).Error
	if err != nil {
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	httpx.Ok(ctx, asserts)
}
