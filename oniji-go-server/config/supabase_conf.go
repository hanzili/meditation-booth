package config

import (
	"strings"

	"github.com/go-playground/validator/v10"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

type SupabaseConfig struct {
	Url     string `validate:"required"`
	AnonKey string `validate:"required"`
}

func loadSupabaseConfig() *SupabaseConfig {
	sbConfig := &SupabaseConfig{
		Url:     strings.TrimSuffix(viper.GetString("SUPABASE.URL"), "/"),
		AnonKey: viper.GetString("SUPABASE.ANON_KEY"),
	}
	validate := validator.New()
	err := validate.Struct(sbConfig)
	if err != nil {
		log.WithFields(log.Fields{
			"error": err.Error(),
		}).Panic("failed to load supabase config")
	}

	return sbConfig
}
