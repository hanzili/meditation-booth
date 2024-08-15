package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type Session struct {
	bun.BaseModel `bun:"sessions"`
	Id            uuid.UUID   `bun:",pk,type:uuid,default:uuid_generate_v4()"`
	UserId        uuid.UUID   `json:"user_id,omitempty" bun:"type:uuid,notnull"`
	Mood          Mood        `json:"mood,omitempty" bun:"type:mood"`
	SessionType   SessionType `json:"session_type,omitempty" bun:"type:session_type"`
	HasScent      bool        `json:"has_scent,omitempty" bun:"has_scent"`
	StartTime     *time.Time  `json:"start_time,omitempty" bun:"start_time"`
	EndTime       *time.Time  `json:"end_time,omitempty" bun:"end_time"`
	Music         Music       `json:"music,omitempty" bun:"type:jsonb"`
	CreatedAt     time.Time   `json:"created_at,omitempty" bun:"created_at,default:current_timestamp"`
	UpdatedAt     time.Time   `json:"updated_at,omitempty" bun:"updated_at,default:current_timestamp"`
	DeletedAt     *time.Time  `json:"deleted_at,omitempty" bun:"deleted_at,soft_delete"`
}

type Music struct {
	Name     string `json:"name"`
	Url      string `json:"url"`
	Duration int    `json:"duration"`
}

type Mood string

const (
	MoodEnum                 string   = "mood"
	MoodHighEnergyPleasant   Language = "HIGH_ENERGY_PLEASANT"
	MoodHighEnergyUnpleasant Language = "HIGH_ENERGY_UNPLEASANT"
	MoodLowEnergyPleasant    Language = "LOW_ENERGY_PLEASANT"
	MoodLowEnergyUnpleasant  Language = "LOW_ENERGY_UNPLEASANT"
)

type SessionType string

const (
	SessionTypeEnum      string      = "session_type"
	SessionTypeGuided    SessionType = "GUIDED"
	SessionTypeMusicOnly SessionType = "MUSIC_ONLY"
)
