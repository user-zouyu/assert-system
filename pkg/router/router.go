package router

import (
	"com.zouyu/pkg/api"
	conf "com.zouyu/pkg/config"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func InitAndRun() {
	if conf.Conf.Mode == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "pong",
		})
	})

	auth := r.Group("/api/auth")
	auth.POST("/login", api.LoginApi)

	//api := r.Group("/api")

	run(r)
}

func run(r *gin.Engine) {
	if err := r.Run(fmt.Sprintf(":%d", conf.Conf.Port)); err != nil {
		conf.Log.Error("服务启动错误")
		panic(err)
	}
}
