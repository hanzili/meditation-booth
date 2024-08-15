package repositories

import (
	"context"
	"database/sql"
	"errors"

	"github.com/google/uuid"
	"github.com/hanzili/oniji-go-server/database"
	"github.com/hanzili/oniji-go-server/models"
)

type SessionRepoInterface interface {
	Create(u *models.Session) error
	Update(u *models.Session) error
	GetById(id string) (*models.Session, error)
	GetAllSessionByUserId(userId uuid.UUID) ([]*models.Session, error)
	DeleteById(id string) error
}

type sessionRepoInstrumentedImpl struct{}

func NewSessionRepoInterface() SessionRepoInterface {
	return &sessionRepoInstrumentedImpl{}
}

func (u sessionRepoInstrumentedImpl) Create(session *models.Session) error {
	_, err := database.GetClient().NewInsert().Model(session).Exec(context.Background())
	return err
}

func (u sessionRepoInstrumentedImpl) Update(session *models.Session) error {
	_, err := database.GetClient().NewUpdate().
		Model(session).
		OmitZero().
		WherePK().
		Exec(context.Background())
	return err
}

func (u sessionRepoInstrumentedImpl) GetById(id string) (*models.Session, error) {
	session := new(models.Session)
	err := database.GetClient().NewSelect().Model(session).Where("id = ?", id).Scan(context.Background())
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return session, nil
}

func (u sessionRepoInstrumentedImpl) GetAllSessionByUserId(userId uuid.UUID) ([]*models.Session, error) {
	var sessions []*models.Session
	err := database.GetClient().NewSelect().
		Model(&sessions).
		Where("user_id = ?", userId).
		Scan(context.Background())
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return sessions, nil
}

func (u sessionRepoInstrumentedImpl) DeleteById(id string) error {
	_, err := database.GetClient().NewDelete().Model((*models.Session)(nil)).Where("id = ?", id).Exec(context.Background())
	return err
}
