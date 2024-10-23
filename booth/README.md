### Booth Server Setup

The booth server is responsible for controlling the smart home devices in the booth (smart plugs, diffuser, music system) and integrating EEG data from the Neurosity Crown to adjust the environment based on real-time feedback.

#### 1. Prerequisites

Before setting up the booth server, ensure you have the following:

- A **Linux** or **macOS** machine (the booth server runs on this).
- **Neurosity Crown** device.
- **TP-Link Kasa smart plugs** for controlling smart devices like scent diffusers and lighting.
- Installed `nmap` for network scanning.
- Installed Neurosity Crown [SDK](https://github.com/neurosity/neurosity-sdk-js) (via npm or yarn).
- Installed `kasa` command-line tool to control smart plugs.

#### 2. Install Dependencies

Navigate to the `booth/` directory and install the necessary dependencies:

```bash
cd booth
npm install
```

This will install all required packages, including the Neurosity Crown SDK.

#### 3. Network Setup

##### Scan for Devices on Your Network

You need to identify all smart home devices on the network to control them via the booth server. Use the nmap tool to scan for devices:

```bash
sudo nmap 192.168.100.0/24
```

This will return a list of all devices connected to the same network, including IP addresses of your smart plugs.

##### Connect to TP-Link Kasa Smart Plug

Once you have the IP address of the smart plug, you can join its network:

```bash
kasa --debug --host 192.168.100.1 wifi join Oniji --password onijioniji
```

After the plug is connected to your network, use the following command to discover and control it:

```bash
kasa discover
```

Now, the smart plug is accessible and can be controlled by the booth server for automating scent and lighting.

#### 4. Connect Bluetooth Devices

To connect to the Neurosity Crown device over Bluetooth, use the `bluetoothctl` command:

```bash
sudo bluetoothctl
```

Once inside the Bluetooth control terminal, follow these steps:

1. Start scanning for nearby devices:

```bash
scan on
```

2. Pair with the Neurosity Crown (replace `XX:XX:XX:XX:XX:XX` with the actual MAC address):

```bash
pair XX:XX:XX:XX:XX:XX
```

3. Trust the device:

```bash
trust XX:XX:XX:XX:XX:XX
```

4. Connect to the device:

```bash
connect XX:XX:XX:XX:XX:XX
```

5. Stop scanning once connected:

```bash
scan off
exit
```

#### 5. Connect Neurosity Crown to Wi-Fi

To enable Wi-Fi connectivity for the Neurosity Crown, follow these steps:

1. Ensure your phone and Neurosity Crown are connected to the same network.
2. Open the Neurosity mobile app and follow the instructions to connect the device to your Wi-Fi.
3. Once connected, the booth server can use the Neurosity Crown SDK to receive real-time EEG feedback.

#### 6. Environment Variables

Create a `.env` file in the `booth/` directory to store configuration details like smart device IPs, Neurosity credentials, and any other sensitive data.

Example `.env` file:

```plaintext
NEUROSITY_API_KEY=your_neurosity_api_key
KASA_PLUG_SCENT=192.168.100.1
KASA_PLUG_LIGHT=192.168.100.2
```

Make sure to replace the placeholders with the actual IP addresses and API keys.

#### 7. Starting the Booth Server

Once everything is configured, you can start the booth server:

```bash
npm start
```

This will initialize the connection to the smart plugs, Neurosity Crown, and any other devices, allowing for real-time control and automation of the booth.

#### 8. Troubleshooting

- **Smart Plug Not Connecting**: Ensure the smart plug is powered on and within range of your network. Check that the `kasa` tool has the correct IP address.
- **Neurosity Crown Bluetooth Issues**: Make sure the device is in pairing mode and not already connected to another device.
- **EEG Data Not Syncing**: Check your Wi-Fi connection and verify that the Neurosity Crown is correctly connected via the mobile app.
