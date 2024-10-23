# Meditation Booth

This project provides a customizable meditation experience by integrating smart home automation, music, and diffuser scent control. The booth is equipped with EEG feedback from the Neurosity Crown [sdk](https://github.com/neurosity/neurosity-sdk-js) to dynamically adjust the environment based on the user’s emotional state.

[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)

## Architecture

The project consists of four main components:

- **booth/**:  
  The server that runs inside the physical booth, responsible for controlling smart home devices like smart plugs, managing customized music playlists, and controlling a diffuser for scent adjustments. It is also connected to the Neurosity Crown, which monitors EEG data for real-time analysis and alters the booth environment accordingly (adjusting music and scent based on the user’s brain state).

- **client/**:  
  The frontend of the web app, enabling users to log in, start meditation sessions, choose their preferred music and scent settings, and access session history. This provides an interactive and customizable experience for the user.

- **server/**:  
  The backend that handles database operations and coordinates with the booth server. It manages user data and controls the automation of devices inside the booth, ensuring seamless communication between the client app and the booth.

- **website/**:  
  A static landing page introducing the Meditation Booth project, providing general information, and allowing users to explore the concept and functionality of the booth.

