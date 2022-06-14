/**
 * Класс SpotifyApi. В нем распологаются все api, которые буду ипользоваться.
 */

export default class SpotifyApi {

    // eslint-disable-next-line
    constructor() {
        //todo
    }

    /**
     * Получение токена.
     * @returns возвращает токен.
     */
    async getToken() {
      const clientId = 'd23b9a98b4234f2689e059766d9c5eb0';
      const clientSecret = '4abcdf28e9d445f1bed83a3760e1b017';
      let token = null;
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
      return token;
    };

    /**
     * Получение новых релизов.
     * @param {string} token 
     * @returns возвращает массив, состоящий из 12 альбомов.
     */
    async getNewReleases12(token) {
      let tempData = null;
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
      return tempData;
    };

    /**
     * Получение новых релизов.
     * @param {string} token 
     * @returns возвращает массив, состоящий из 5 альбомов.
     */
    async getNewReleases5(token) {
      let tempData = null;
      await fetch('https://api.spotify.com/v1/browse/new-releases?limit=5', {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token}
      })
      .then(
        async (response) => {
            const data = await response.json();
            tempData = data.albums.items;
        },
      )
      return tempData;
    };


    /**
     * Работа с поиском.
     * @param {string} value 
     * @param {string} token 
     * @returns возвращает список, состоящий из 12 альбомов, которые подходят по параметру value.
     */
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
      return tempData;
    };


    /**
     * Получение альбома по id.
     * @param {string} id 
     * @param {string} token 
     * @returns возвращает объект альбома.
     */
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
      return tempData;
    };
}
