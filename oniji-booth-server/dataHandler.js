import fs from "fs";
import path from "path";
import { initNeurosity, disconnectNeurosity } from "./neurosity.js";
import config from "./config.js";
import { playMusic, stopMusic } from "./audioPlayer.js";
import { togglePlugOn, togglePlugOff } from "./plug.js";
import { promises as fsPromises } from 'fs';

let isSessionActive = false;
let currentSessionId = null;
let dataBuffer = [];

async function saveBufferedData() {
  if (dataBuffer.length === 0) {
    console.log("No data to save, buffer is empty");
    return;
  }

  const filename = path.join(config.dataDir, `${currentSessionId}_${Date.now()}.json`);
  try {
    await fsPromises.writeFile(filename, JSON.stringify(dataBuffer));
    console.log(`Saved ${dataBuffer.length} data points to ${filename}`);
    dataBuffer = [];
  } catch (error) {
    console.error(`Error saving data for session ${currentSessionId}:`, error);
    throw error;
  }
}

const startSessionWithMusic = async (req, res) => {
  togglePlugOff();

  const { sessionId, musicName } = req.params;
  console.log(
    `Attempting to start session: ${sessionId} with music: ${musicName}`
  );

  if (!isSessionActive) {
    console.log(`Starting new session: ${sessionId}`);
    currentSessionId = sessionId;
    isSessionActive = true;
    dataBuffer = [];

    try {
      await fs.promises.mkdir(config.dataDir, { recursive: true });
      console.log(`Ensured data directory exists: ${config.dataDir}`);
    } catch (error) {
      console.error(`Error creating data directory: ${error.message}`);
      return res
        .status(500)
        .send(`Failed to create data directory: ${error.message}`);
    }

    const neurosity = await initNeurosity();
    // console.log("Subscribing to brainwaves data");
    // neurosity.brainwaves("powerByBand").subscribe((brainwaves) => {
    //   if (isSessionActive && currentSessionId) {
    //     dataBuffer.push(brainwaves);
    //     if (dataBuffer.length >= bufferSize) {
    //       console.log(`Buffer full (${bufferSize} items), saving data`);
    //       saveBufferedData();
    //     }
    //   }
    // });

    console.log("Subscribing to calm data");
    let lastDataPoint = null;
    neurosity.calm().subscribe((calm) => {
      if (isSessionActive && currentSessionId) {
        const timestamp = calm.timestamp;
        if (!lastDataPoint || (timestamp - lastDataPoint) >= 5000) {
          console.log(timestamp - lastDataPoint);
          dataBuffer.push(calm.probability);
          lastDataPoint = calm.timestamp;
          console.log('Calm data point saved:', calm.probability);
        }
      }
    });

    // Start playing music
    try {
      await playMusic(musicName);
      console.log(`Started playing music: ${musicName}`);
      res.send({
        message: "Session started with brainwave logging and music",
        sessionId: currentSessionId,
        musicName,
      });
    } catch (error) {
      console.error(`Failed to start music: ${error.message}`);
      res.status(500).send(`Failed to start music: ${error.message}`);
    }
  } else {
    console.log(
      `Cannot start new session, session ${currentSessionId} is already active`
    );
    res.status(400).send("A session is already active");
  }
};

const endSessionAndMusic = async (req, res) => {
  const { sessionId } = req.params;
  console.log(`Attempting to end session: ${sessionId}`);
  console.log(`Current session: ${currentSessionId}`);
  console.log(`Is session active: ${isSessionActive}`);

  if (!isSessionActive) {
    console.log("No active session to end");
    return res.status(400).send("No active session");
  }

  if (sessionId !== currentSessionId) {
    console.log(
      `Session ID mismatch. Received: ${sessionId}, Current: ${currentSessionId}`
    );
    return res.status(400).send("Invalid session ID");
  }

  try {
    console.log(`Ending session ${sessionId}`);
    isSessionActive = false;
    console.log("Saving final buffered data");
    await saveBufferedData();
    console.log("Stopping music");
    stopMusic();
    console.log(`Session ${sessionId} ended successfully`);
    res.send("Session stopped, final data saved, and music stopped");
  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).send(`Error stopping session: ${error.message}`);
  } finally {
    console.log("Resetting current session ID");
    currentSessionId = null;
  }
  await disconnectNeurosity();
  togglePlugOn();
};

const listSessionFiles = async (req, res) => {
  const { sessionId } = req.params;
  console.log(`Listing files for session: ${sessionId}`);
  try {
    const files = await fs.readdir(dataDir);
    console.log(`Total files in directory: ${files.length}`);
    const sessionFiles = files.filter((file) => file.startsWith(sessionId));
    console.log(`Files matching session ${sessionId}: ${sessionFiles.length}`);
    res.json(sessionFiles);
  } catch (error) {
    console.error("Error listing session files:", error);
    res.status(500).send("Error listing session files");
  }
};

const downloadSessionFile = (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(dataDir, filename);
  console.log(`Attempting to download file: ${filePath}`);
  res.download(filePath, (err) => {
    if (err) {
      console.error("Error downloading file:", err);
      res.status(500).send("Error downloading file");
    } else {
      console.log(`File downloaded successfully: ${filename}`);
    }
  });
};

export {
  startSessionWithMusic,
  endSessionAndMusic,
  listSessionFiles,
  downloadSessionFile,
};
