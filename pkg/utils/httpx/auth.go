package httpx

import "github.com/gin-gonic/gin"

const (
	UsernameKey = "APP_USER_NAME"
	UsertypeKey = "APP_USER_TYPE"
)

func GetUsername(ctx *gin.Context) (string, bool) {
	userId, exists := ctx.Get(UsernameKey)
	if exists {
		return userId.(string), true
	}

	return "", false
}
