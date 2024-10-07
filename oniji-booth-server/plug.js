// plug.js
import { exec } from 'child_process';
import config from './config.js';

const togglePlugOn = () => {
    const command  = `kasa --host ${config.neurosityPlugHost} on`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error turning plug on: ${error}`);
            return;
        }
        console.log(`Plug turned on: ${stdout}`);
    });
}

const togglePlugOff = () => {
    const command  = `kasa --host ${config.neurosityPlugHost} off`;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error turning plug off: ${error}`);
            return;
        }
    });
}

export { togglePlugOn, togglePlugOff };