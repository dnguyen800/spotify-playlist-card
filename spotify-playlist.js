// Examples:
// const entityId = this.config.entity;
// const playlist = hass.states[entityId].attributes;
//    ${playlist['Unorganized']['name']}<br>
// ${playlist['Unorganized']['image']}<br>
// ${playlist['Unorganized']['uri']}<br>


class SpotifyPlaylist extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    setConfig(config) {
      if (!config.entity) {
        throw new Error('Please define an entity');
      }
      const root = this.shadowRoot;
      if (root.lastChild) root.removeChild(root.lastChild);
  
      const cardConfig = Object.assign({}, config);
      if (!cardConfig.title) {
        cardConfig.title = 'Playlists';
      } else {
        cardConfig.title = '📣 ' + cardConfig.title;
      }
      const card = document.createElement('ha-card');
      const content = document.createElement('div');
      const style = document.createElement('style');
      style.textContent = `
            ha-card {
              /* sample css */
            }
            table {
              width: 100%;
              padding: 0 32px 0 32px;
            }
            thead th {
              text-align: left;
            }
            tbody tr:nth-child(odd) {
              background-color: var(--paper-card-background-color);
            }
            tbody tr:nth-child(even) {
              background-color: var(--secondary-background-color);
            }
            button {
              overflow: auto;
              padding: 0;
              margin: 0;
            }
            paper-button {
              float: right;
            }
            tbody td.name a {
              color: var(--primary-text-color);
              text-decoration-line: none;
              font-weight: normal;
            }
            td a {
              color: red;
              font-weight: bold;
            }
            tbody td.separator {
              font-weight: bold;
              padding-top: 10px;
              text-transform: capitalize;
            }
            img {
                display: block;
                height: 150px;
                width: 150px;
            }
          `;
      content.innerHTML = `
      <div id='content'>
      </div>
      `;
      
      card.header = cardConfig.title
      card.appendChild(content);
      card.appendChild(style);
      root.appendChild(card);
      this._config = cardConfig;
    }
  
 
    set hass(hass) {
      const config = this._config;
      const root = this.shadowRoot;
      const card = root.lastChild;
      this.myhass = hass;
      this.handlers = this.handlers || [];
      let card_content = ''
       
      if (hass.states[config.entity]) {
        const playlist = hass.states[config.entity].attributes;
        for (let entry in playlist) {
          if (entry !== "friendly_name" && entry !== "icon" && entry !== "homebridge_hidden") {
            card_content += `<button raised id ='playlist${playlist[entry]['id']}'><img src="${playlist[entry]['image']}"></button>`;
            debugger;
          }
        } 
      };
      
      root.lastChild.hass = hass;
      root.getElementById('content').innerHTML = card_content;

      if (hass.states[config.entity]) {
        const playlist = hass.states[config.entity].attributes;
        const media_player = config.media_player;

        for (let entry in playlist) {
          if (entry !== "friendly_name" && entry !== "icon" && entry !== "homebridge_hidden") {
            debugger;
            card.querySelector(`#playlist${playlist[entry]['id']}`).addEventListener('click', event => {
              console.log('callService started')
              debugger;
              const myPlaylist = {"entity_id": media_player, "media_content_type": "playlist", "media_content_id": `${playlist[entry]['uri']}`};
              this.myhass.callService('media_player', 'play_media', myPlaylist);
              console.log('callService ended')
              debugger;
            });            
          }  
        }
      }
    }
    getCardSize() {
      return 1;
    }
}
  
customElements.define('spotify-playlist', SpotifyPlaylist);