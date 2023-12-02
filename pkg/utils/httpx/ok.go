package httpx

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func Ok(ctx *gin.Context, data interface{}) {
	ctx.JSON(http.StatusOK, gin.H{
		"code": http.StatusOK,
		"msg":  "success",
		"data": data,
	})
}

func OkWithMsg(ctx *gin.Context, data interface{}, msg string) {
	ctx.JSON(http.StatusOK, gin.H{
		"code": http.StatusOK,
		"msg":  msg,
		"data": data,
	})
}
