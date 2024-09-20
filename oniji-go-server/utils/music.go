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
			"en":    {Name: "high-energy-pleasant-en.wav", Duration: 300}, // 6 minutes
			"fr":    {Name: "high-energy-pleasant-fr.wav", Duration: 300}, // 6 minutes
			"music": {Name: "high-energy-pleasant.wav", Duration: 300},    // 6 minutes
		},
		MoodHighEnergyUnpleasant: {
			"en":    {Name: "high-energy-unpleasant-en.wav", Duration: 300}, // 10 minutes
			"fr":    {Name: "high-energy-unpleasant-fr.wav", Duration: 300}, // 10 minutes
			"music": {Name: "high-energy-unpleasant.wav", Duration: 300},    // 10 minutes
		},
		MoodLowEnergyPleasant: {
			"en":    {Name: "low-energy-pleasant-en.wav", Duration: 600}, // 10 minutes
			"fr":    {Name: "low-energy-pleasant-fr.wav", Duration: 600}, // 10 minutes
			"music": {Name: "low-energy-pleasant.wav", Duration: 600},    // 10 minutes
		},
		MoodLowEnergyUnpleasant: {
			"en":    {Name: "low-energy-unpleasant-en.wav", Duration: 600}, // 10 minutes
			"fr":    {Name: "low-energy-unpleasant-fr.wav", Duration: 600}, // 10 minutes
			"music": {Name: "low-energy-unpleasant.wav", Duration: 600},    // 10 minutes
		},
	}

	longMusicMap := map[string]models.Music{
		"en": {Name: "long-en.wav", Duration: 1800}, // 30 minutes
		"fr": {Name: "long-fr.wav", Duration: 1800}, // 30 minutes
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
