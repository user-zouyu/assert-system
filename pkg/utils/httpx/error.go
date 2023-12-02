package httpx

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func BadRequest(ctx *gin.Context, msg string) {
	ctx.JSON(http.StatusBadRequest, gin.H{
		"code": http.StatusBadRequest,
		"msg":  msg,
	})
}

func Forbidden(ctx *gin.Context, msg string) {
	ctx.JSON(http.StatusForbidden, gin.H{
		"code": http.StatusForbidden,
		"msg":  msg,
	})
}

func NotFound(ctx *gin.Context, msg string) {
	ctx.JSON(http.StatusNotFound, gin.H{
		"code": http.StatusNotFound,
		"msg":  msg,
	})
}
