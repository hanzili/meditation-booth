// services/plugService.js
import { exec } from 'child_process';
import util from 'util';
import config from '../config/index.js';

const execAsync = util.promisify(exec);

function getPlugHost(plugType) {
  if (plugType === 'neurosity') {
    return config.neurosityPlugHost;
  } else if (plugType === 'scent') {
    return config.scentPlugHost;
  }
  return null;
}

async function togglePlug(state, plugType) {
  if (!config.usePlug) {
    console.log('Plug is not enabled, skipping');
    return;
  }
  const host = getPlugHost(plugType);
  const command = `kasa --host ${host} ${state}`;
  try {
    const { stdout } = await execAsync(command);
    return stdout;
  } catch (error) {
    throw new Error(`Error turning plug ${state}: ${error.message}`);
  }
}

export { togglePlug };
