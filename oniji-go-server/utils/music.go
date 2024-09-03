package utils

import (
	"github.com/hanzili/oniji-go-server/models"
)

type Mood string

const (
	MoodHighEnergyPleasant   Mood = "HIGH_ENERGY_PLEASANT"
	MoodHighEnergyUnpleasant Mood = "HIGH_ENERGY_UNPLEASANT"
	MoodLowEnergyPleasant    Mood = "LOW_ENERGY_PLEASANT"
	MoodLowEnergyUnpleasant  Mood = "LOW_ENERGY_UNPLEASANT"
)

type MusicInfo struct {
	Mood        Mood
	SessionType models.SessionType
	Language    string
	IsLong      bool
}

func GetMusicForSession(info MusicInfo) models.Music {
	defaultMusic := models.Music{Name: "high-energy-pleasant-en", Duration: 300} // 10 minutes
	shortMusicMap := map[Mood]map[string]models.Music{
		MoodHighEnergyPleasant: {
			"en":    {Name: "high-energy-pleasant-en", Duration: 300}, // 6 minutes
			"fr":    {Name: "high-energy-pleasant-fr", Duration: 300}, // 6 minutes
			"music": {Name: "high-energy-pleasant", Duration: 300},    // 6 minutes
		},
		MoodHighEnergyUnpleasant: {
			"en":    {Name: "high-energy-unpleasant-en", Duration: 300}, // 10 minutes
			"fr":    {Name: "high-energy-unpleasant-fr", Duration: 300}, // 10 minutes
			"music": {Name: "high-energy-unpleasant", Duration: 300},    // 10 minutes
		},
		MoodLowEnergyPleasant: {
			"en":    {Name: "low-energy-pleasant-en", Duration: 600}, // 10 minutes
			"fr":    {Name: "low-energy-pleasant-fr", Duration: 600}, // 10 minutes
			"music": {Name: "low-energy-pleasant", Duration: 600},    // 10 minutes
		},
		MoodLowEnergyUnpleasant: {
			"en":    {Name: "low-energy-unpleasant-en", Duration: 600}, // 10 minutes
			"fr":    {Name: "low-energy-unpleasant-fr", Duration: 600}, // 10 minutes
			"music": {Name: "low-energy-unpleasant", Duration: 600},    // 10 minutes
		},
	}

	longMusicMap := map[string]models.Music{
		"en": {Name: "long-en", Duration: 1800}, // 30 minutes
		"fr": {Name: "long-fr", Duration: 1800}, // 30 minutes
	}

	if info.IsLong {
		if music, ok := longMusicMap[info.Language]; ok {
			return music
		}
		return defaultMusic
	}

	moodMusic, ok := shortMusicMap[info.Mood]
	if !ok {
		return defaultMusic
	}

	key := info.Language
	if info.SessionType == models.SessionTypeMusicOnly {
		key = "music"
	}

	if music, ok := moodMusic[key]; ok {
		return music
	}

	return defaultMusic
}
