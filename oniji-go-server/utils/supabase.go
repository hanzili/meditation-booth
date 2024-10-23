package utils

import (
	"bytes"
	"encoding/json"
	"net/http"

	"github.com/hanzili/oniji-go-server/config"
)

func Recover(email string, redirectTo string) error {
	sConfig := config.GetConfig().SupabaseConfig
	url := sConfig.Url + "/auth/v1/recover"

	body := map[string]string{
		"email": email,
	}

	jsonBody, err := json.Marshal(body)
	if err != nil {
		return err
	}

	req, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(jsonBody))
	if err != nil {
		return err
	}

	req.Header.Add("apiKey", sConfig.AnonKey)
	req.Header.Add("Content-Type", "application/json")

	q := req.URL.Query()
	q.Add("redirect_to", redirectTo)
	req.URL.RawQuery = q.Encode()

	// send request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()

	return nil
}
