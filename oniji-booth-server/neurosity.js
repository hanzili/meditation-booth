const { Neurosity } = require('@neurosity/sdk');
const { deviceId, email, password } = require('./config');

let neurosity = null;

exports.initNeurosity = async () => {
  if (!neurosity) {
    neurosity = new Neurosity({ deviceId });
    try {
      await neurosity.login({ email, password });
      console.log('Logged in to Neurosity');
    } catch (error) {
      console.error('Failed to log in to Neurosity:', error);
      throw error;
    }
  }
  return neurosity;
};

exports.getNeurosity = () => {
  if (!neurosity) {
    throw new Error('Neurosity not initialized. Call initNeurosity first.');
  }
  return neurosity;
};