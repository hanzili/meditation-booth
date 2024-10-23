// services/neurosityService.js
import { Neurosity } from '@neurosity/sdk';
import config from '../config/index.js';

let neurosityInstance = null;

async function initNeurosity() {
  if (!neurosityInstance) {
    neurosityInstance = new Neurosity({ deviceId: config.deviceId });
    await neurosityInstance.login({
      email: config.email,
      password: config.password,
    });
  }
  return neurosityInstance;
}

async function disconnectNeurosity() {
  if (neurosityInstance) {
    await neurosityInstance.logout();
    neurosityInstance = null;
  }
}

export { initNeurosity, disconnectNeurosity };
