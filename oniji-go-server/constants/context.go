package constants

type ContextKey string

const (
	CtxKeyAuthorization ContextKey = "Authorization"
	CtxKeyUserId        ContextKey = "sub"
)
