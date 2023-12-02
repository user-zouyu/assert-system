package model

import (
	"gorm.io/gorm"
	"time"
)

type Operate struct {
	ID        int64          `gorm:"primaryKey" json:"id"`
	AssertID  int64          `json:"assertId"`
	Username  string         `gorm:"type:varchar(128);index" json:"username"`
	Count     int            `gorm:"default:0" json:"count"`
	Status    string         `gorm:"type:varchar(32);default '审批中'" json:"status"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"deletedAt"`
	Assert    *Assert        `json:"assert"`
}
