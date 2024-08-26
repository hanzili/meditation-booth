package middleware

import (
	"context"
	"fmt"

	"github.com/gin-gonic/gin"
	"github.com/hanzili/oniji-go-server/config"
	"github.com/hanzili/oniji-go-server/constants"
	"github.com/supabase-community/gotrue-go/types"
	"github.com/supabase-community/supabase-go"
)

func GqlAuthRequired() gin.HandlerFunc {
	return func(c *gin.Context) {
		authorizationToken := c.GetHeader(string(constants.CtxKeyAuthorization))
		if authorizationToken != "" {
			sConfig := config.GetConfig().SupabaseConfig
			client, err := supabase.NewClient(sConfig.Url, sConfig.AnonKey, nil)
			session := types.Session{}
			session.AccessToken = authorizationToken
			client.UpdateAuthSession(session)
			if err == nil {
				res, err := client.Auth.GetUser()
				if err == nil {
					c.Request = c.Request.WithContext(context.WithValue(c.Request.Context(), constants.CtxKeyUserId, res.User.ID.String()))
					c.Request = c.Request.WithContext(context.WithValue(c.Request.Context(), constants.CtxKeyAuthorization, authorizationToken))
				} else {
					fmt.Printf("error in verifying user token: %v", err)
				}
			}
		}

		c.Next()
	}
}
