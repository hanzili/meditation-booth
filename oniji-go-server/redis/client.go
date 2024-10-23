package redis

import (
	"context"
	"sync"
	"time"

	"github.com/redis/go-redis/v9"
	log "github.com/sirupsen/logrus"

	"github.com/hanzili/oniji-go-server/config"
)

var (
	redisClient *redis.Client
	initRedis   sync.Once
)

func NewRedis() *redis.Client {
	rConfig := config.GetConfig().RedisConfig
	addr := rConfig.Host + ":" + rConfig.Port
	redisClient = redis.NewClient(&redis.Options{
		Addr:     addr,
		DB:       rConfig.DB,
		Username: rConfig.User,
		Password: rConfig.Password,
		OnConnect: func(ctx context.Context, conn *redis.Conn) error {
			log.WithFields(log.Fields{"conn": conn.String()}).Info("Connected to Redis")
			err := conn.Set(ctx, "last_deployed_at", time.Now(), 0).Err()
			return err
		},
	})
	return redisClient
}

func GetClient() *redis.Client {
	initRedis.Do(func() {
		redisClient = NewRedis()
	})
	return redisClient
}

func init() {
	err := GetClient().Ping(context.Background()).Err()
	if err != nil {
		log.WithFields(log.Fields{
			"err": err,
		}).Error("failed to ping redis")
	}
}
