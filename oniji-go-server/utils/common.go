package utils

import (
	"github.com/google/uuid"
)

func Bool(b bool) *bool {
	return &b
}

func String(s string) *string {
	return &s
}

func Int(i int) *int {
	return &i
}

func Int64(i int64) *int64 {
	return &i
}

// ConvertStringToUUID converts a *string to a *uuid.UUID
func ConvertPtrStringToPtrUUID(s *string) *uuid.UUID {
	if s == nil {
		return nil
	}

	parsedUUID := uuid.MustParse(*s)
	return &parsedUUID
}
