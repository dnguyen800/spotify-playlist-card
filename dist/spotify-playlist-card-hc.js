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
      .outercontainer {
        margin:auto;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 8px;

      .grid-item {
        position: relative;
        flex-basis: calc(33.333%);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        border-radius: 3px;

      }

      .grid-item::before {
        content: '';
        display: block;
        padding-top: 100%;
      }

      body {
        padding:0;
        margin:0;
      }

      .content {
        border-radius:0px 0px 3px 3px;
        position: absolute;
        bottom: 0;
        width:100%;
        padding: 20px 10px 10px 10px;
        border: 0;
        text-align:left;
        color: rgba(255,255,255,1);
        box-sizing:border-box;
        overflow: hidden;
        text-overflow: ellipsis;
        background: rgb(0,0,0);
        background: -moz-linear-gradient(top, rgba(0,0,0,0) 0%, rgba(0,0,0,0.86) 30%, rgba(0,0,0,0.86) 100%);
        background: -webkit-linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.86) 30%,rgba(0,0,0,0.86) 100%);
        background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.86) 30%,rgba(0,0,0,0.86) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00000000', endColorstr='#db000000',GradientType=0 );
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
      let card_content = `

      <div class="outercontainer">

      <div class="grid-item" style="background-image:url(https://i.scdn.co/image/2e3f8733a2ca7ffe418f2f9e7ecdc7d793d11747);"><div class="content">Spotify List 1</div></div>
      <div class="grid-item" style="background-image:url(https://pl.scdn.co/images/pl/default/bbbbd22aa438e9dc3491b1bf9d75af0d71b1b258);"><div class="content">Another List Here</div></div>
      <div class="grid-item" style="background-image:url(https://newjams-images.scdn.co/v1/rays/en);"><div class="content">Cool List</div></div>
      <div class="grid-item" style="background-image:url(https://mosaic.scdn.co/640/94c124dd9812e03e8d21de9a05bbee08ad60ed91a8a3e6e81b7d6ec1b36a900879bf3b524d125f66ab67616d0000b273b83be7c56ab7b7a137169dfdb25ba89cbacbe9cffeacadf8395c0cc6aa94b59f);"><div class="content">Spotify Hits</div></div>
      <div class="grid-item" style="background-image:url(https://mosaic.scdn.co/640/ab67616d0000b273097b24db7c6349715f53d6dfab67616d0000b273a5aef98a1762d0f64bb6ed9aab67616d0000b273bbe24bee78a7c2bd5e4e5f4eab67616d0000b273bdfe26aa13413ebbd830c0bb);"><div class="content">Another Hit List</div></div>
      <div class="grid-item" style="background-image:url(https://mosaic.scdn.co/640/4314712b152c540d2c73be9d0693067c7fb141da50761801525ccd3f2e83e5ed3e7ba88eca9428c194ef36a714c2860c52709c24d33f864d1eb56d0bab67616d0000b2733d5c1247292ab3c779aba188);"><div class="content">Best Songs Here</div></div>
      <div class="grid-item" style="background-image:url(https://i.scdn.co/image/2e3f8733a2ca7ffe418f2f9e7ecdc7d793d11747);"><div class="content">Just Another Long Playlist Name Here</div></div>
      <div class="grid-item" style="background-image:url(https://i.scdn.co/image/2e3f8733a2ca7ffe418f2f9e7ecdc7d793d11747);"><div class="content">Shot One</div></div>
      <div class="grid-item" style="background-image:url(https://i.scdn.co/image/2e3f8733a2ca7ffe418f2f9e7ecdc7d793d11747);"><div class="content">Playlist Name Nine</div></div>
      
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