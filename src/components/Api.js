export default class SpotifyApi {

    // eslint-disable-next-line
    constructor() {
        //todo
    }

    async getToken() {
      const clientId = 'd23b9a98b4234f2689e059766d9c5eb0';
      const clientSecret = '4abcdf28e9d445f1bed83a3760e1b017';
      let token = null;
      try {
        await fetch(`https://accounts.spotify.com/api/token`, {
          method: 'POST',
          headers: {
            "Authorization": "Basic " + btoa(clientId + ":" + clientSecret),
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
          }),
        })
        .then(async (response) => {
          const data = await response.json();
          token = data.access_token;
        });
      } catch(error) {
        alert('Ошибка получения токена');
      }
      return token;
    };


    async getNewReleases(token) {
      let tempData = null;
      try {
        await fetch('https://api.spotify.com/v1/browse/new-releases?limit=12', {
          method: 'GET',
          headers: { 'Authorization': 'Bearer ' + token}
        })
        .then(
          async (response) => {
              const data = await response.json();
              tempData = data.albums.items;
          },
        )
      } catch(error) {
          alert('Ошибка получения токена');
      }
      return tempData;
    };


    async getSearch(value, token) {
      let tempData = null;
      await fetch(`https://api.spotify.com/v1/search?q=${value}&type=album&limit=12`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token}
      })
      .then(async (response) => {
        const data = await response.json();
        tempData = data.albums.items;
      })
      .catch((error) => {
        alert('Ошибка ' + error.name + ":" + error.message);
      });
      return tempData;
    };

    async getAlbum(id, token) {
      let tempData = null;
      await fetch(`https://api.spotify.com/v1/albums/${id}`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token}
      })
      .then(async (response) => {
          const data = await response.json();
          tempData = data;
      })
      .catch((error) => {
        alert('Ошибка ' + error.name + ":" + error.message);
      });
      return tempData;
    };
}
