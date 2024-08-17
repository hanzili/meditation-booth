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

func convertToGqlSession(session *models.Session) *model.Session {
	if session == nil {
		return nil
	}
	gqlSession := &model.Session{
		ID:          session.Id.String(),
		UserID:      session.UserId.String(),
		Mood:        string(session.Mood),
		SessionType: string(session.SessionType),
		HasScent:    session.HasScent,
		Music: &model.Music{
			Name:     &session.Music.Name,
			URL:      &session.Music.Url,
			Duration: &session.Music.Duration,
		},
	}
	if session.StartTime != nil {
		startTime := session.StartTime.String()
		gqlSession.StartTime = &startTime
	}
	if session.EndTime != nil {
		endTime := session.EndTime.String()
		gqlSession.EndTime = &endTime
	}

	return gqlSession
}

func convertToGqlSessions(sessions []*models.Session) []*model.Session {
	var result []*model.Session
	for _, s := range sessions {
		result = append(result, convertToGqlSession(s))
	}
	return result
}
