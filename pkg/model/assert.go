package model

import (
	"gorm.io/gorm"
	"time"
)

type Assert struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Name      string         `gorm:"index;type:varchar(128)" json:"name"`
	Price     float32        `gorm:"default:0" json:"price"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
	Operate   []Operate      `gorm:"foreignKey:AssertID"`
}
