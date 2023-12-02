package middleware

import (
	"com.zouyu/pkg/utils"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
	"strings"
)

func Jwt() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		token := ctx.GetHeader("Authorization")
		if !strings.HasPrefix(token, "Bearer ") {
			httpx.Forbidden(ctx, "登录错误")
			ctx.Abort()
			return
		}
		token = token[7:]

		username, err := utils.ParseToken(token)
		if err != nil {
			httpx.Forbidden(ctx, "登录错误")
			ctx.Abort()
			return
		}

		ctx.Set(httpx.UsernameKey, username)
		ctx.Next()

	}
}
