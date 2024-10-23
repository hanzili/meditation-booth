package config

import (
	"github.com/go-playground/validator/v10"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/viper"
)

type RedisConfig struct {
	Host     string `validate:"required"`
	Port     string `validate:"required"`
	DB       int    `validate:"required"`
	User     string
	Password string
}

func loadRedisConfig() *RedisConfig {
	redisConfig := &RedisConfig{
		Host:     viper.GetString("REDIS.HOST"),
		Port:     viper.GetString("REDIS.PORT"),
		User:     viper.GetString("REDIS.USER"),
		Password: viper.GetString("REDIS.PASSWORD"),
		DB:       viper.GetInt("REDIS.DB"),
	}
	validate := validator.New()
	err := validate.Struct(redisConfig)
	if err != nil {
		log.WithFields(log.Fields{
			"error": err.Error(),
		}).Panic("failed to load redis config")
	}

	return redisConfig
}
