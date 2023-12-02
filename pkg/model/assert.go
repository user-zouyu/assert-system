package model

import (
	"gorm.io/gorm"
	"time"
)

type Assert struct {
	ID        uint           `gorm:"type:bigint;primaryKey;autoIncrement" json:"id"`
	Name      string         `gorm:"index;type:varchar(128)" json:"name"`
	Price     float32        `gorm:"default:0" json:"price"`
	Count     int            `gorm:"default:0" json:"count"`
	Detail    string         `gorm:"default:null" json:"detail"`
	CreatedAt time.Time      `gorm:"autoCreateTime" json:"createdAt"`
	UpdatedAt time.Time      `gorm:"autoCreateTime;autoUpdateTime" json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
}
