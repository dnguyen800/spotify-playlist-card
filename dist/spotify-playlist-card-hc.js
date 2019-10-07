// Examples:
// const entityId = this.config.entity;
// const playlist = hass.states[entityId].attributes;
//    ${playlist['Unorganized']['name']}<br>
// ${playlist['Unorganized']['image']}<br>
// ${playlist['Unorganized']['uri']}<br>


class SpotifyPlaylistCardHC extends HTMLElement {

    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    setConfig(config) {
      const root = this.shadowRoot;
      if (root.lastChild) root.removeChild(root.lastChild);
  
      const cardConfig = Object.assign({}, config);

      const card = document.createElement('div');
      const content = document.createElement('div');
      const style = document.createElement('style');

// Ideas: if 'column' and/or 'row' are not defined in options, then use this CSS to automatically organize playlists:
//   'grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));'

      style.textContent = `
      .spotifyPlaylistGrid {
        display: grid;
        grid-gap: 0.5rem; 
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));  

      body {
        font: 12px system-ui;
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
      <div class="spotifyPlaylistGrid">
        <div><button raised id ='playlist01'><img style="width: 100%;" src="https://i.scdn.co/image/2e3f8733a2ca7ffe418f2f9e7ecdc7d793d11747"></button></div>
        <div><button raised id ='playlist02'><img style="width: 100%;" src="https://pl.scdn.co/images/pl/default/bbbbd22aa438e9dc3491b1bf9d75af0d71b1b258"></button></div>
        <div><button raised id ='playlist03'><img style="width: 100%;" src="https://newjams-images.scdn.co/v1/rays/en"></button></div>
        <div><button raised id ='playlist04'><img style="width: 100%;" src="https://mosaic.scdn.co/640/94c124dd9812e03e8d21de9a05bbee08ad60ed91a8a3e6e81b7d6ec1b36a900879bf3b524d125f66ab67616d0000b273b83be7c56ab7b7a137169dfdb25ba89cbacbe9cffeacadf8395c0cc6aa94b59f"></button></div>
        <div><button raised id ='playlist05'><img style="width: 100%;" src="https://mosaic.scdn.co/640/ab67616d0000b273097b24db7c6349715f53d6dfab67616d0000b273a5aef98a1762d0f64bb6ed9aab67616d0000b273bbe24bee78a7c2bd5e4e5f4eab67616d0000b273bdfe26aa13413ebbd830c0bb"></button></div>
        <div><button raised id ='playlist06'><img style="width: 100%;" src="https://mosaic.scdn.co/640/4314712b152c540d2c73be9d0693067c7fb141da50761801525ccd3f2e83e5ed3e7ba88eca9428c194ef36a714c2860c52709c24d33f864d1eb56d0bab67616d0000b2733d5c1247292ab3c779aba188"></button></div>
      </div>
        `;
       




      root.lastChild.hass = hass;
      root.getElementById('content').innerHTML = card_content;

    }
    getCardSize() {
      return 1;
    }
}
  
customElements.define('spotify-playlist-card-hc', SpotifyPlaylistCardHC);