import { exec } from "child_process";
import config from "../config/index.js";

function keepBluetoothConnection() {
  const speakerAddress = config.speakerAddress;
  if (!speakerAddress) {
    console.error("Speaker address is not set, use default speaker");
    return;
  }
  // Check if the speaker is connected
  exec(`blueutil --is-connected ${speakerAddress}`, (err, stdout) => {
    if (err) {
      console.error("Error checking connection:", err);
      return;
    }

    if (stdout.trim() === "1") {
      console.log("Speaker is connected, sending keep-alive signal...");
    } else {
      console.log("Speaker is not connected, attempting to connect...");
      // Try to connect
      exec(`blueutil --connect ${speakerAddress}`, (err) => {
        if (err) {
          console.error("Error connecting to the speaker:", err);
        } else {
          console.log("Successfully connected to the speaker.");
        }
      });
    }
  });
}

export { keepBluetoothConnection };
