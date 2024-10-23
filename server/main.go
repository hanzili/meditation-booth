package main

import (
	"net/http"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/hanzili/oniji-go-server/graph"
	"github.com/hanzili/oniji-go-server/graph/directives"
	"github.com/hanzili/oniji-go-server/middleware"
)

func main() {
	runWebServer()
}

func runWebServer() {
	r := gin.Default()
	// r.Use(cors.Default())
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))
	CreateRouter(r)
	r.POST("/query", middleware.GqlAuthRequired(), graphqlHandler())
	r.GET("/playground", playgroundHandler())

	port := ":8080"
	r.Run(port)
}

func playgroundHandler() gin.HandlerFunc {
	h := playground.Handler("GraphQL playground", "/query")
	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}

func CreateRouter(router *gin.Engine) {
	router.GET("/health-check", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "ok",
		})
	})
}

// Defining the Graphql handler
func graphqlHandler() gin.HandlerFunc {
	// NewExecutableSchema and Config are in the generated.go file
	// Resolver is in the resolver.go file
	conf := graph.Config{Resolvers: &graph.Resolver{}}
	conf.Directives.Auth = directives.RequireAuthDirective
	// conf.Directives.AdminRequired = directives.RequireAdminAuthDirective
	// conf.Directives.UserMessageReceivedHook = directives.UserMessageReceivedHookDirective
	h := handler.NewDefaultServer(graph.NewExecutableSchema(conf))

	return func(c *gin.Context) {
		h.ServeHTTP(c.Writer, c.Request)
	}
}
