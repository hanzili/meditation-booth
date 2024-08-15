package repositories

var (
	UserRepo    UserRepoInterface
	SessionRepo SessionRepoInterface
)

func init() {
	UserRepo = NewUserRepoInterface()
	SessionRepo = NewSessionRepoInterface()
}
