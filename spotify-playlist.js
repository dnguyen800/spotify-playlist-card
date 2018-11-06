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

            #row {
              display: flex;
              justify-content: center;
            }

            button {
              float: center;
              border: 0;
              padding: 0;
              margin: 2px 2px;
              border-radius: 4px;
              -webkit-transition-duration: 0.4s; /* Safari */
              transition-duration: 0.4s;             
            }

            button:hover {
              box-shadow: 0 5px 50px 0 rgba(0,0,0,0.2), 0 5px 20px 0 rgba(0,0,0,0.19);
            }
            img {
                display: block;
                height: 200px;
                width: 200px;
                border-radius: 4px;   
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
      let card_content = ''
      card_content += `
        <div id="row">
      `;
       
      if (hass.states[config.entity]) {
        const playlist = hass.states[config.entity].attributes;
        let column_count = 0
        
        for (let entry in playlist) {
          if (entry !== "friendly_name" && entry !== "icon" && entry !== "homebridge_hidden") {
            card_content += `<button raised id ='playlist${playlist[entry]['id']}'><img src="${playlist[entry]['image']}"></button>`;
            column_count += 1
            if (column_count == 2) {
              card_content += `</div><div id="row">`;
            }
            if (column_count == 4) {
              card_content += `</div><div id="row">`;
            }
            debugger;
          }
        } 
      };
      card_content += `</div>`;
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