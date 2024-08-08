package database

import (
	"fmt"
	"sync"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/stdlib"
	log "github.com/sirupsen/logrus"
	"github.com/uptrace/bun"
	"github.com/uptrace/bun/dialect/pgdialect"

	"github.com/hanzili/oniji-go-server/config"
)

var (
	client *bun.DB
	initDB sync.Once
)

func NewDB() *bun.DB {
	conf := config.GetConfig()
	connString := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s",
		conf.PostgresConfig.Username,
		conf.PostgresConfig.Password,
		conf.PostgresConfig.Host,
		conf.PostgresConfig.Port,
		conf.PostgresConfig.DB,
	)

	pgConfig, err := pgx.ParseConfig(connString)
	if err != nil {
		panic(err)
	}
	sqldb := stdlib.OpenDB(*pgConfig)

	return bun.NewDB(sqldb, pgdialect.New())
}

func GetClient() *bun.DB {
	initDB.Do(func() {
		client = NewDB()
	})
	return client
}

func init() {
	err := GetClient().Ping()
	if err != nil {
		panic(err)
	}
	log.Info("database connection established")
}
