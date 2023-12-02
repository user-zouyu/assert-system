package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils/httpx"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"time"
)

type userInfoVO struct {
	ID        int64     `json:"id"`
	Username  string    `json:"username"`
	Type      string    `json:"type"`
	CreatedAt time.Time `json:"createdAt"`
}

func GetUser(ctx *gin.Context) {
	username, exists := httpx.GetUsername(ctx)
	if !exists {
		zap.L().Info("未登录")
		httpx.Forbidden(ctx, "未登录")
		return
	}

	var user model.User
	err := conf.DB.Model(&model.User{}).Where("username = ?", username).First(&user).Error
	if err != nil {
		httpx.BadRequest(ctx, "查询出差啦")
		return
	}

	httpx.Ok(ctx, userInfoVO{
		ID:        user.ID,
		Username:  user.Username,
		Type:      user.Type,
		CreatedAt: user.CreatedAt,
	})
}
