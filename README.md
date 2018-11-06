# Spotify Playlist Card
Home Assistant Lovelace card &amp; sensor that lists your current Spotify playlists. Requires the Spotify Playlist sensor to be configured with playlist image and URI fields defined.

## Features

  - it barely works right now
  - TBD resizes playlist images to fit # of columns specified
  

## Options

| Name | Type | Default | Supported options  | Description
| ---- | ---- | ------- | --------- | -----------
| media_player | string | **Required** | `custom:button-card` | Name of the Spotify media player in your Home Assistant instance.
| sensor | string | **Required** | '' | Name of the Spotify Playlist sensor that holds your playlist info.
| columns | int | Optional | '' | Number of columns to display. Default is 3

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
  - List-card

