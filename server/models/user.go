package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/uptrace/bun"
)

type Language string

const (
	LanguageEnum string   = "language"
	LanguageFr   Language = "FRENCH"
	LanguageEn   Language = "ENGLISH"
)

type User struct {
	bun.BaseModel `bun:"users"`
	Id            uuid.UUID  `bun:",pk,type:uuid,default:uuid_generate_v4()"`
	Email         string     `json:"email,omitempty" bun:"email"`
	Password      string     `json:"password,omitempty" bun:"password"`
	FirstName     *string    `json:"first_name,omitempty" bun:"first_name"`
	LastName      *string    `json:"last_name,omitempty" bun:"last_name"`
	Language      *Language  `json:"role,omitempty" bun:"type:language"`
	CreatedAt     time.Time  `json:"created_at,omitempty" bun:"created_at,default:current_timestamp"`
	UpdatedAt     time.Time  `json:"updated_at,omitempty" bun:"updated_at,default:current_timestamp"`
	DeletedAt     *time.Time `json:"deleted_at,omitempty" bun:"deleted_at,soft_delete"`
	Survey        *string    `json:"survey,omitempty" bun:"survey"`
}
