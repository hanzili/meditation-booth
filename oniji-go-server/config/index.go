package config

import (
	"fmt"
	"strings"
	"sync"

	"github.com/spf13/viper"
)

var (
	appConfig  *Config
	initConfig sync.Once
)

type Config struct {
	AppName        string          `validate:"required"`
	Environment    string          `validate:"required"`
	PostgresConfig *PostgresConfig `validate:"required"`
}

func NewConfig() *Config {
	postgresConfig := loadPostgresConfig()
	config := &Config{
		AppName:        strings.Trim(viper.GetString("APP_NAME"), " "),
		Environment:    strings.Trim(viper.GetString("ENVIRONMENT"), " "),
		PostgresConfig: postgresConfig,
	}

	return config
}

func GetConfig() *Config {
	initConfig.Do(func() {
		appConfig = NewConfig()
	})
	return appConfig
}

func init() {
	viper.SetConfigName("config.yml")
	viper.SetConfigType("yml")
	viper.AddConfigPath(".")

	viper.AutomaticEnv()
	viper.SetEnvKeyReplacer(strings.NewReplacer(".", "_"))

	if err := viper.ReadInConfig(); err != nil {
		fmt.Printf("Error reading config file, %s", err)
	}
}
