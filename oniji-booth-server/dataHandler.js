const fs = require("fs").promises;
const path = require("path");
const { getNeurosity } = require("./neurosity");
const { dataDir, bufferSize } = require("./config");
const { playMusic, stopMusic } = require("./audioPlayer");

let isSessionActive = false;
let currentSessionId = null;
let dataBuffer = [];

async function saveBufferedData() {
  if (dataBuffer.length === 0) return;

  const filename = path.join(dataDir, `${currentSessionId}_${Date.now()}.json`);
  try {
    await fs.writeFile(filename, JSON.stringify(dataBuffer));
    console.log(`Saved ${dataBuffer.length} data points to ${filename}`);
    dataBuffer = [];
  } catch (error) {
    console.error(`Error saving data for session ${currentSessionId}:`, error);
  }
}

exports.startSessionWithMusic = async (req, res) => {
  const { sessionId, musicName } = req.params;
  if (!isSessionActive) {
    currentSessionId = sessionId;
    isSessionActive = true;
    dataBuffer = [];
    
    await fs.mkdir(dataDir, { recursive: true });
    
    const neurosity = getNeurosity();
    neurosity.brainwaves("powerByBand").subscribe((brainwaves) => {
      if (isSessionActive && currentSessionId) {
        dataBuffer.push(brainwaves);
        if (dataBuffer.length >= bufferSize) {
          saveBufferedData();
        }
      }
    });

    // Start playing music
    try {
      await playMusic(musicName);
      res.send({ message: "Session started with brainwave logging and music", sessionId: currentSessionId, musicName });
    } catch (error) {
      res.status(500).send(`Failed to start music: ${error.message}`);
    }
  } else {
    res.status(400).send("A session is already active");
  }
};

exports.stopSessionAndMusic = async (req, res) => {
  const { sessionId } = req.params;
  if (isSessionActive && sessionId === currentSessionId) {
    isSessionActive = false;
    try {
      await saveBufferedData();
      stopMusic(); // Stop the music
      currentSessionId = null;
      res.send("Session stopped, final data saved, and music stopped");
    } catch (error) {
      console.error("Error saving final data:", error);
      res.status(500).send("Error stopping session and saving final data");
    }
  } else {
    res.status(400).send("Invalid session or no active session");
  }
};

exports.listSessionFiles = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const files = await fs.readdir(dataDir);
    const sessionFiles = files.filter((file) => file.startsWith(sessionId));
    res.json(sessionFiles);
  } catch (error) {
    console.error("Error listing session files:", error);
    res.status(500).send("Error listing session files");
  }
};

exports.downloadSessionFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(dataDir, filename);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    }
  });
};
