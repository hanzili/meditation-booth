package config

import (
	"github.com/go-playground/validator/v10"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

type PostgresConfig struct {
	Host     string `validate:"required"`
	Port     string `validate:"required"`
	Username string `validate:"required"`
	Password string `validate:"required"`
	DB       string `validate:"required"`
}

func loadPostgresConfig() *PostgresConfig {
	pgConfig := &PostgresConfig{
		Host:     viper.GetString("POSTGRES.HOST"),
		Port:     viper.GetString("POSTGRES.PORT"),
		Username: viper.GetString("POSTGRES.USER"),
		Password: viper.GetString("POSTGRES.PASSWORD"),
		DB:       viper.GetString("POSTGRES.DATABASE"),
	}
	validate := validator.New()
	err := validate.Struct(pgConfig)
	if err != nil {
		log.WithFields(log.Fields{
			"error": err.Error(),
		}).Panic("failed to load postgres config")
	}

	return pgConfig
}
