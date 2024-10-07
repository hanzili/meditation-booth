// neurosity.js
import { Neurosity } from "@neurosity/sdk";
import config from "./config.js";

let neurosity;

const initNeurosity = async () => {
  neurosity = new Neurosity({ deviceId: config.deviceId });
  try {
    await neurosity.login({ email: config.email, password: config.password });
    console.log("Logged in to Neurosity");
    const info = await neurosity.getInfo();
    console.log(info);

    let battery = null;
    neurosity.status().subscribe((status) => {
      if (!battery || status.battery !== battery) {
        battery = status.battery;
        console.log("battery", battery);
      }
    });
  } catch (error) {
    console.error("Failed to log in to Neurosity:", error);
    throw error;
  }
  return neurosity;
};

const disconnectNeurosity = async () => {
  if (neurosity) {
    neurosity.disconnect();
    console.log("Disconnected from Neurosity");
  }
};

export { initNeurosity, disconnectNeurosity };
