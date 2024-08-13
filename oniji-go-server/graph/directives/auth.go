package directives

import (
	"context"
	"errors"

	"github.com/99designs/gqlgen/graphql"

	"github.com/hanzili/oniji-go-server/constants"
)

func RequireAuthDirective(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
	// Get the token from the header
	userId := ctx.Value(constants.CtxKeyUserId)

	if userId == nil {
		return nil, errors.New("unauthorized")
	}

	return next(ctx)
}
