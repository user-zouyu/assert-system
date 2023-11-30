package httpx

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func ParamsError(ctx *gin.Context, msg string) {
	ctx.JSON(http.StatusBadRequest, gin.H{
		"code": http.StatusBadRequest,
		"msg":  msg,
	})
}
