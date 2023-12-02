package utils

import (
	conf "com.zouyu/pkg/config"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"go.uber.org/zap"
	"time"
)

func GenToken(username, usertype string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.RegisteredClaims{
		Issuer:  "system",
		Subject: username,
		ExpiresAt: &jwt.NumericDate{
			Time: time.Now().Add(time.Hour * 24),
		},
	})

	return token.SignedString([]byte(conf.Conf.Jwt.Secret))
}

func ParseToken(tokenString string) (string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(conf.Conf.Jwt.Secret), nil
	})
	if err != nil {
		return "", err
	}

	var username string

	claims, ok := token.Claims.(jwt.MapClaims)
	if !ok {
		zap.L().Info("JWT Token 格式错误")
		return "", fmt.Errorf("解析错误")
	}

	if username, ok = claims["sub"].(string); !ok {
		zap.L().Info("用户名格式错误")
		return "", fmt.Errorf("解析错误")
	}

	return username, err
}
