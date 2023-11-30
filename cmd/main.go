package main

import (
	conf "com.zouyu/pkg/config"
	"com.zouyu/pkg/router"
)

func main() {
	conf.Init()
	router.InitAndRun()
}
