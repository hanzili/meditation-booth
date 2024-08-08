package repositories

var (
	UserRepo UserRepoInterface
)

func init() {
	UserRepo = NewUserRepoInterface()
}
