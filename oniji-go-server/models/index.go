package models

import (
	"context"
	"fmt"

	"github.com/hanzili/oniji-go-server/database"
)

func CreateExtensions() {
	query := `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`
	_, err := database.GetClient().Query(query)
	if err != nil {
		fmt.Printf("failed to create uuid-ossp: %s\n", err.Error())
	}
}

func CreateEnums() {
	languageQuery := fmt.Sprintf(
		"CREATE TYPE public.%s AS ENUM ('%s', '%s');",
		LanguageEnum,
		LanguageFr,
		LanguageEn,
	)
	database.GetClient().Exec(languageQuery)

	moodQuery := fmt.Sprintf(
		"CREATE TYPE public.%s AS ENUM ('%s', '%s', '%s', '%s');",
		MoodEnum,
		MoodHighEnergyPleasant,
		MoodHighEnergyUnpleasant,
		MoodLowEnergyPleasant,
		MoodLowEnergyUnpleasant,
	)
	database.GetClient().Exec(moodQuery)

	sessionTypeQuery := fmt.Sprintf(
		"CREATE TYPE public.%s AS ENUM ('%s', '%s');",
		SessionTypeEnum,
		SessionTypeGuided,
		SessionTypeMusicOnly,
	)
	database.GetClient().Exec(sessionTypeQuery)
}

func CreateSchemas() {
	CreateEnums()
	CreateExtensions()
	createModels := []interface{}{
		(*User)(nil),
		(*Session)(nil),
	}
	for _, model := range createModels {
		_, err := database.GetClient().NewCreateTable().Model(model).IfNotExists().Exec(context.Background())
		if err != nil {
			fmt.Printf("create table on model: %T failed: %s\n", model, err.Error())
		}
	}
}

func init() {
	CreateSchemas()
}
