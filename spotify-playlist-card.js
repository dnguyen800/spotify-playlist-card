// Examples:
// const entityId = this.config.entity;
// const playlist = hass.states[entityId].attributes;
//    ${playlist['Unorganized']['name']}<br>
// ${playlist['Unorganized']['image']}<br>
// ${playlist['Unorganized']['uri']}<br>


class SpotifyPlaylistCard extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    setConfig(config) {
      if (!config.entity) {
        throw new Error('Please define an entity.');
      }
      const root = this.shadowRoot;
      if (root.lastChild) root.removeChild(root.lastChild);
  
      const cardConfig = Object.assign({}, config);
      if (!cardConfig.title) {
        cardConfig.title = `Playlists`;
      } 
      
      if (!config.size) {
        config.size = `160px`;
      }

      if (!config.columns) {
        config.columns = 3;
      }

      const card = document.createElement('div');
      const content = document.createElement('div');
      const style = document.createElement('style');

      style.textContent = `

            button {
              float: center;
              border: 0px;
              padding: 1px 1px;
              color: rgb(120, 120, 120);
              border: 0;
              font-weight: bold;
              text-align: center;
              font-size: 14px;
              margin: 1px 1px;
              border-radius: 4px;
              -webkit-transition-duration: 0.4s; /* Safari */
              transition-duration: 0.4s;       
              background-color: rgba(0,0,0,0.0);      
            }

            button:hover {
              box-shadow: 0 5px 40px 0 rgba(0,0,0,0.2), 0 5px 20px 0 rgba(0,0,0,0.19);
            }

            button img {
                display: block;
                width: 100%;
                border: 0;      
                border-radius: 4px;       
            `;
             
      style.textContent += `    height: `;
      style.textContent += config.size;
      style.textContent += `;
                width: `;
      style.textContent += config.size;
      style.textContent += `;
    }`
            
      style.textContent += `
            .grid-container {
              justify-content: center;
              justify-items: center;
              align-items: center;
              display: grid;
              border: 0;
              gap: 1px 1px;              
              grid-gap: 1px 1px;
              grid-template-columns: auto`;
      var cssColumns = ' auto'.repeat(config.columns);
      style.textContent += cssColumns;
      style.textContent += `;}

      .grid-item {
        border: 0;
        padding: 1px;
        font-size: 14px;
        text-align: center;
      }
      
      .grid-title {
        grid-row: 1 / span 4; 
        text-align: center; 
        vertical-align: text-top;
        writing-mode: vertical-rl; 

      }
      .grid-item ha-icon {
        -ms-transform: rotate(90deg); /* IE 9 */
        -webkit-transform: rotate(90deg); /* Safari */
        transform: rotate(90deg);
      }
      `; 
      content.innerHTML = `
      <div id='content'>
      </div>
      `;
      
      if (config.show_title) {
        card.header = cardConfig.title;
      }
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
      <div class="grid-container">
        <div class="grid-item grid-title">
          <ha-icon icon="mdi:spotify"></ha-icon>
          <strong>Spotify Playlists</strong>
        </div>
      `;
       
      if (hass.states[config.entity]) {
        const playlist = hass.states[config.entity].attributes;
        let column_count = 0
        
        for (let entry in playlist) {
          if (entry !== "friendly_name" && entry !== "icon" && entry !== "homebridge_hidden") {
            card_content += `<div class="grid-item"><button raised id ='playlist${playlist[entry]['id']}'><img src="${playlist[entry]['image']}">`;
            if (config.show_name == true) {
              card_content += `${playlist[entry]['name']}`
            };
            card_content += `</button></div>`;
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
            card.querySelector(`#playlist${playlist[entry]['id']}`).addEventListener('click', event => {
              console.log('callService started')
              const myPlaylist = {"entity_id": media_player, "media_content_type": "playlist", "media_content_id": `${playlist[entry]['uri']}`};
              this.myhass.callService('media_player', 'play_media', myPlaylist);
              console.log('callService ended')
            });            
          }  
        }
      }
    }
    getCardSize() {
      return 1;
    }
}
  
customElements.define('spotify-playlist-card', SpotifyPlaylistCard);