package repositories

import (
	"context"
	"database/sql"
	"errors"

	"github.com/hanzili/oniji-go-server/database"
	"github.com/hanzili/oniji-go-server/models"
)

type UserRepoInterface interface {
	Create(u *models.User) error
	Update(u *models.User) error
	GetById(id string) (*models.User, error)
	GetByEmail(email string) (*models.User, error)
	DeleteById(id string) error
}

type userRepoInstrumentedImpl struct{}

func NewUserRepoInterface() UserRepoInterface {
	return &userRepoInstrumentedImpl{}
}

func (u userRepoInstrumentedImpl) Create(user *models.User) error {
	_, err := database.GetClient().NewInsert().Model(user).Exec(context.Background())
	return err
}

func (u userRepoInstrumentedImpl) Update(user *models.User) error {
	_, err := database.GetClient().NewUpdate().
		Model(user).
		OmitZero().
		WherePK().
		Exec(context.Background())
	return err
}

func (u userRepoInstrumentedImpl) GetById(id string) (*models.User, error) {
	user := new(models.User)
	err := database.GetClient().NewSelect().Model(user).Where("id = ?", id).Scan(context.Background())
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}
	return user, nil
}

func (u userRepoInstrumentedImpl) GetByEmail(email string) (*models.User, error) {
	user := new(models.User)
	err := database.GetClient().NewSelect().Model(user).Where("email = ?", email).Scan(context.Background())
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (u userRepoInstrumentedImpl) DeleteById(id string) error {
	_, err := database.GetClient().NewDelete().Model((*models.User)(nil)).Where("id = ?", id).Exec(context.Background())
	return err
}
