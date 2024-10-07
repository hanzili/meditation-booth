// dataHandler.js
import fs from "fs";
import path from "path";
import { initNeurosity, disconnectNeurosity } from "./neurosity.js";
import config from "./config.js";
import { playMusic, stopMusic } from "./audioPlayer.js";
import { togglePlugOn, togglePlugOff } from "./plug.js";
import { promises as fsPromises } from 'fs';
import { sendSessionEndMutation } from './graphqlClient.js'; // Add this import

let isSessionActive = false;
let currentSessionId = null;
let dataBuffer = [];


const startSessionWithMusic = async (req, res) => {
  //togglePlugOff();

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

    // Start playing music and get the duration
    try {
      const musicDuration = await playMusic(musicName);
      console.log(`Started playing music: ${musicName}, duration: ${musicDuration} seconds`);

      // Set a timeout to end the session when the music finishes
      setTimeout(async () => {
        if (isSessionActive && currentSessionId === sessionId) {
          console.log(`Music finished for session ${sessionId}. Ending session.`);
          await endSessionAndMusic({ params: { sessionId } }, {
            status: () => ({
              send: (message) => console.log(`Session end status: ${message}`)
            }),
            json: (data) => console.log('Session end data:', data)
          });

          // Send GraphQL mutation
          try {
            await sendSessionEndMutation(sessionId, dataBuffer);
            dataBuffer = [];
            console.log(`Sent session end mutation for session ${sessionId}`);
          } catch (error) {
            console.error(`Error sending session end mutation: ${error.message}`);
          }
        }
      }, musicDuration * 1000);

      res.send({
        message: "Session started with brainwave logging and music",
        sessionId: currentSessionId,
        musicName,
        duration: musicDuration
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
    console.log("Stopping music");
    stopMusic();
    
    console.log("Sending final buffered data");
    let calmData = [];
    if (dataBuffer.length > 0) {
      calmData = dataBuffer.slice();
      dataBuffer = [];
    }
    res.json({ message: "Session ended", calmData });
    console.log("Successfully sent final buffered data, calmData:", calmData);
  } catch (error) {
    console.error("Error ending session:", error);
    res.status(500).send(`Error stopping session: ${error.message}`);
  } finally {
    console.log("Resetting current session ID");
    currentSessionId = null;
    await disconnectNeurosity();
    //togglePlugOn();
  }
};


export {
  startSessionWithMusic,
  endSessionAndMusic,
};
