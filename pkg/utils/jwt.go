package utils

import (
	conf "com.zouyu/pkg/config"
	"fmt"
	"github.com/golang-jwt/jwt/v5"
	"go.uber.org/zap"
	"log"
	"time"
)

func GenToken(username, usertype string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"username": username,
		"type":     usertype,
		"nbf":      time.Now().Add(conf.Conf.Jwt.Duration),
	})

	return token.SignedString([]byte(conf.Conf.Jwt.Secret))
}

func PauseToken(tokenString string) (string, string, error) {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return []byte(conf.Conf.Jwt.Secret), nil
	})
	if err != nil {
		log.Fatal(err)
	}

	var (
		username string
		usertype string
	)

	claims, ok := token.Claims.(jwt.MapClaims)
	if ok {
		zap.L().Info("用户名格式错误")
		return "", "", fmt.Errorf("解析错误")
	}

	if username, ok = claims["username"].(string); !ok {
		zap.L().Info("用户名格式错误")
		return "", "", fmt.Errorf("解析错误")
	}
	if usertype, ok = claims["type"].(string); !ok {
		zap.L().Info("用户类型格式错误")
		return "", "", fmt.Errorf("解析错误")
	}

	return username, usertype, err
}
