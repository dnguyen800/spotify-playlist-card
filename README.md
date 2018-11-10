# Spotify Playlist Card
Home Assistant Lovelace card &amp; sensor that lists your current Spotify playlists. Requires the [Spotify Playlist sensor](https://github.com/dnguyen800/Spotify-Playlist-Sensor) to be configured with playlist image and URI fields defined. 

## Features

  - specify number of columns, image size
  

## Options

| Name | Type | Default | Example | Description
| ---- | ---- | ------- | --------- | -----------
| media_player | string | **Required** | media_player.spotify | Name of the Spotify media player in your Home Assistant instance.
| entity| string | **Required** | sensor.playlists | Name of the Spotify Playlist sensor that holds your playlist info.
| columns | int | Optional | '3' | Number of columns to display. Default is 3
| size | string | Optional | '140px' | Size of playlist image. Can be listed as pixel (50px) or percentage (50%).
| show_name | boolean | Optional | 'false' | Show playlist names. Defaults to false.
| show_title | boolean | Optional | 'false' | Shows the card title, 'Playlist'. Defaults to false.

## Instructions
1. Install the Spotify Playlist sensor and confirm playlist data is loaded in the sensor.
1. Download the [spotify-playlist-card](https://raw.githubusercontent.com/dnguyen800/Spotify-Playlist/master/spotify-playlist-card.js)
2. Place the file in your `config/www` folder
3. Include the card code in your `ui-lovelace-card.yaml`
```yaml
title: Home
resources:
  - url: /local/spotify-playlist.js
    type: module
```
4. Write configuration for the card in your `ui-lovelace.yaml`

```yaml
- type: "custom:spotify-playlist"
    sensors:
      - sensor.insert_name_here
```


## Credits
  - Home Assistant Spotify media player component
  - [Tracker-card](https://github.com/custom-cards/tracker-card) which I studied and re-used some of the code.

