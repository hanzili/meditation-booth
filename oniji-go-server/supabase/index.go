package supabase

import (
	"sync"

	"github.com/supabase-community/supabase-go"

	"github.com/hanzili/oniji-go-server/config"
)

var (
	supabaseClient *supabase.Client
	initSupabase   sync.Once
)

func NewSupabase() *supabase.Client {
	sConfig := config.GetConfig().SupabaseConfig
	supabaseClient, err := supabase.NewClient(sConfig.Url, sConfig.AnonKey, nil)
	if err != nil {
		panic(err)
	}

	return supabaseClient
}

func GetClient() *supabase.Client {
	initSupabase.Do(func() {
		supabaseClient = NewSupabase()
	})
	return supabaseClient
}

func init() {
	GetClient()
}
