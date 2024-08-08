package models

import (
	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type Session struct {
	bun.BaseModel `bun:"sessions"`
	Id            uuid.UUID `bun:",pk,type:uuid,default:uuid_generate_v4()"`
	Mood          string    `bun:"mood"`
	SessionType   string    `bun:"session_type"`
	HasScent      bool      `bun:"has_scent"`
	StartAt       string    `bun:"start_at"`
	EndAt         string    `bun:"end_at"`
	UserId        int64     `bun:"user_id"`
}
