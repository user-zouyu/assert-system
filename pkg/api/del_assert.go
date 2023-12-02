package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
	"strconv"
)

func DelAssert(ctx *gin.Context) {
	idStr, exists := ctx.GetQuery("id")
	if !exists {
		httpx.BadRequest(ctx, "参数错误")
		return
	}
	id, err := strconv.ParseInt(idStr, 10, 64)
	if err != nil {
		httpx.BadRequest(ctx, "参数错误")
		return
	}

	err = conf.DB.Model(&model.Assert{}).Delete("id = ?", id).Error
	if err != nil {
		httpx.BadRequest(ctx, "处理出错啦")
		return
	}

	httpx.OkWithMsg(ctx, nil, "资产报废成功")

}
