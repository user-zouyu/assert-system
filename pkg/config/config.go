package conf

import (
	"github.com/spf13/viper"
)

var Conf conf

func Init() {
	viper.SetConfigName("config")
	viper.SetConfigType("yaml")
	viper.AddConfigPath(".")

	if err := viper.ReadInConfig(); err != nil {
		panic(err)
	}
	if err := viper.Unmarshal(&Conf); err != nil {
		panic(err)
	}

	initDb()
	initLog()
}

type conf struct {
	Port int    `yaml:"port" json:"port"`
	Mode string `yaml:"mode"`
	DB   db     `yaml:"db" json:"db"`
	Jwt  jwt    `yaml:"jwt" json:"jwt"`
}

type db struct {
	Dns string `yaml:"dns" json:"dns"`
}

type jwt struct {
	Secret   string `yaml:"secret" json:"secret"`
	Duration int64  `yaml:"duration" json:"duration"`
}
