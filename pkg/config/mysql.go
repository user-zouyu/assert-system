package conf

import (
	"com.zouyu/pkg/model"
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB

func initDb() {
	database, err := gorm.Open(mysql.Open(Conf.DB.Dns), &gorm.Config{})
	if err != nil {
		fmt.Printf("数据库初始化错误")
		panic(err)
	}

	DB = database

	err = DB.AutoMigrate(
		&model.User{},
		&model.Assert{},
		model.Operate{},
	)
	if err != nil {
		fmt.Println("数据库数据初始化错误")
		panic(err)
	}
}
