package models

import (
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
	Id            uuid.UUID `bun:",pk,type:uuid,default:uuid_generate_v4()"`
	Email         string    `json:"email,omitempty" bun:"email"`
	Password      string    `json:"password,omitempty" bun:"password"`
	FirstName     *string   `json:"first_name,omitempty" bun:"first_name"`
	LastName      *string   `json:"last_name,omitempty" bun:"last_name"`
	Language      *Language `json:"role,omitempty" bun:"type:language"`
}
