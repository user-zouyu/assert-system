package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
)

type addAssertReq struct {
	Name  string  `json:"name"`
	Price float32 `json:"price,string"`
	Count int     ` json:"count,string"`
}

func AddAssert(ctx *gin.Context) {
	var req addAssertReq
	err := ctx.BindJSON(&req)
	if err != nil {
		httpx.BadRequest(ctx, "参数错误")
		return
	}

	assert := model.Assert{
		Name:  req.Name,
		Price: req.Price,
		Count: req.Count,
	}
	err = conf.DB.Model(&model.Assert{}).Create(&assert).Error
	if err != nil {
		httpx.BadRequest(ctx, "添加资产错误啦")
		return
	}

	httpx.OkWithMsg(ctx, assert, "资产创建成功")
}
