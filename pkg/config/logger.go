package conf

import (
	"fmt"
	"go.uber.org/zap"
)

var Log *zap.Logger

func initLog() {
	var logger *zap.Logger
	var err error

	if Conf.Mode == "prod" {
		logger, err = zap.NewProduction(zap.AddCaller())
	} else {
		logger, err = zap.NewDevelopment(zap.AddCaller())
	}

	if err != nil {
		fmt.Printf("日志初始错误")
		panic(err)
	}

	Log = logger
	zap.ReplaceGlobals(Log)
}
