package model

import (
	"gorm.io/gorm"
	"time"
)

type Operate struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	AssertID  int            `json:"assertId"`
	Username  string         `gorm:"index;type:varchar(128)" json:"username"`
	Password  string         `gorm:"type:varchar(128)" json:"password"`
	Count     int            `gorm:"default:0" json:"count"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
	//Assert    *Assert        `gorm:"foreignKey:AssertId;references:id" json:"assert"`
}
