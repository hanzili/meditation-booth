# Meditation Booth

An adaptive meditation system that uses EEG data to personalize the environment in real-time, enhancing relaxation through smart home automation.

![Meditation Booth](https://cdn.discordapp.com/attachments/1297389225871806489/1298486466091024486/meeeaaowy4620_An_adaptive_meditation_booth_that_uses_EEG_data_t_70d4b5e8-ffb7-484a-81a0-b27046154e43.png?ex=6719bd42&is=67186bc2&hm=b001660e7d5ea48d2006387670da8c830a08d9ddcbec4c852dbf229a2aaf46c6&)

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

## Architecture

The project consists of four main components:

- **booth/**:  
  The server that runs inside the physical booth, responsible for controlling smart home devices like smart plugs, managing customized music playlists, and controlling a diffuser for scent adjustments. It is also connected to the Neurosity Crown, which monitors EEG data for real-time analysis and alters the booth environment accordingly (adjusting music and scent based on the user's brain state).

- **client/**:  
  The frontend of the web app, enabling users to log in, start meditation sessions, choose their preferred music and scent settings, and access session history. This provides an interactive and customizable experience for the user.

- **server/**:  
  The backend that handles database operations and coordinates with the booth server. It manages user data and controls the automation of devices inside the booth, ensuring seamless communication between the client app and the booth.

- **website/**:  
  A static landing page introducing the Meditation Booth project, providing general information, and allowing users to explore the concept and functionality of the booth.


## Setup Guide

Booth: [booth/README.md](booth/README.md)

Server: [server/README.md](server/README.md)

Client: [client/README.md](client/README.md)

Website: [website/README.md](website/README.md)
