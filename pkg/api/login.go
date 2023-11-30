package api

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/model"
	"com.zouyu/pkg/utils"
	"com.zouyu/pkg/utils/httpx"
	"errors"
	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"gorm.io/gorm"
	"time"
)

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

type userVO struct {
	ID        uint      `json:"id"`
	Username  string    `json:"username"`
	Type      string    `json:"type"`
	CreatedAt time.Time `json:"createdAt"`
}

type loginVO struct {
	User  userVO `json:"user"`
	Token string `json:"token"`
}

func LoginApi(ctx *gin.Context) {
	var req loginRequest
	if err := ctx.BindJSON(&req); err != nil {
		zap.L().Info("参数错误", zap.Error(err))
		httpx.ParamsError(ctx, "参数错误")
		return
	}

	var user model.User

	err := conf.DB.Model(&model.User{}).Where("username = ?", req.Username).First(&user).Error
	if errors.Is(err, gorm.ErrRecordNotFound) {
		zap.L().Info("用户不存在", zap.String("username", req.Username))
		httpx.ParamsError(ctx, "用户不存在")
		return
	}

	if err != nil {
		zap.L().Error("处理出错啦", zap.String("username", req.Username))
		httpx.ParamsError(ctx, "处理出错啦")
		return
	}

	if req.Password != user.Password {
		zap.L().Info("密码错误", zap.String("username", req.Username))
		httpx.ParamsError(ctx, "密码错误")
		return
	}

	token, err := utils.GenToken(user.Username, user.Type)
	if err != nil {
		zap.L().Error("token 生成错误", zap.String("username", req.Username), zap.Error(err))
		httpx.ParamsError(ctx, "处理出错啦")
		return
	}

	httpx.Ok(ctx, &loginVO{
		User: userVO{
			ID:        user.ID,
			Username:  user.Username,
			Type:      user.Type,
			CreatedAt: user.CreatedAt,
		},
		Token: token,
	})

}
