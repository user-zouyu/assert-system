package router

import (
	"com.zouyu/pkg/api"
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/router/middleware"
	"com.zouyu/pkg/utils/httpx"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func InitAndRun() {
	if conf.Conf.Mode == "prod" {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.Use(middleware.Cors())

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"msg": "pong",
		})
	})

	auth := r.Group("/api/auth")
	{
		auth.POST("/login", api.LoginApi)
	}

	user := r.Group("/api/user")
	user.Use(middleware.Jwt())
	{
		user.GET("/info", api.GetUser)
		user.GET("/assert", api.ListAssert)
		user.POST("/assert", api.AddAssert)
		user.DELETE("/assert", api.DelAssert)

		user.GET("/operate", api.GetOperate)
		user.POST("/operate", api.PostOperate)
		user.PUT("/operate/cancel", api.CancelOperate)
		user.PUT("/operate", api.PutOperate)
		user.PUT("/operate/consent", api.ConsentOperate)
		user.GET("/operate/all", api.AllOperate)

	}

	r.NoMethod(func(ctx *gin.Context) {
		httpx.BadRequest(ctx, "不支持该方法")
	})

	r.NoRoute(func(ctx *gin.Context) {
		httpx.NotFound(ctx, "资源不存在")
	})

	run(r)
}

func run(r *gin.Engine) {
	if err := r.Run(fmt.Sprintf(":%d", conf.Conf.Port)); err != nil {
		conf.Log.Error("服务启动错误")
		panic(err)
	}
}
