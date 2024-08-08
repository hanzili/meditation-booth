package graph

import (
	"github.com/hanzili/oniji-go-server/graph/model"
	"github.com/hanzili/oniji-go-server/models"
)

func convertToGqlUser(user *models.User) *model.User {
	if user == nil {
		return nil
	}
	gqlUser := &model.User{
		ID:        user.Id.String(),
		Email:     user.Email,
		FirstName: user.FirstName,
		LastName:  user.LastName,
	}

	if user.Language != nil {
		language := model.Language(*user.Language)
		gqlUser.Language = &language
	}

	return gqlUser
}
