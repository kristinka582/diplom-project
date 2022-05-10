
// Константы.
const inputSearch = document.getElementById('input_search');
const buttonSearch = document.getElementById('search');
const header = document.querySelector('.header');
const buttonBack = document.querySelector('.button-nav');
const content = document.querySelector('.content');

//Ключи.
const clientId = 'd23b9a98b4234f2689e059766d9c5eb0';
const clientSecret = '4abcdf28e9d445f1bed83a3760e1b017';

// Функция сокращения названий релизов.
function textEllipsis(str, maxLength, { side = "end", ellipsis = "..." } = {}) {
  if (str.length > maxLength) {
    switch (side) {
      case "start":
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case "end":
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
};

// Получение токена.
async function getToken() {
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

// Fetch запрос на получение Api Новых релизов.
async function getNewReleases() {
  const token = await getToken();
  fetch('https://api.spotify.com/v1/browse/new-releases?limit=12', {
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token}
  })
  .then(async (response) => {
    const data = await response.json();
    setCards(data.albums.items);
  });
};

// Вызов функции на получение Новых релизов.
getNewReleases();

// Обработка данных ответа.
function setCards(data) {
  // Cоздание li.
  data.forEach((element) => {
    const ulTrack = document.querySelector('.content-releases');
    const liTrack = document.createElement("li");
    liTrack.className = 'releases-container';
    ulTrack.append(liTrack);

    const imgTrack = document.createElement("img");
    imgTrack.setAttribute('src', element.images[1].url)
    imgTrack.style.height = '150px';
    imgTrack.style.width = '150px';
    liTrack.append(imgTrack);

    const spanTrack = document.createElement("span");
    spanTrack.className ='name-track';
    spanTrack.innerHTML = textEllipsis(element.name, 40);
    spanTrack.setAttribute('type', element.album_type);
    liTrack.append(spanTrack);

    const spanArtist = document.createElement("span");
    spanArtist.className ='name-artist';
    spanArtist.innerHTML = element.artists[0].name;
    spanArtist.setAttribute('type', element.id);
    liTrack.append(spanArtist);
  });

  // Вызов функции изменения footer.
  createFooter(data[0]);

  // Переход на карточку трека.
  let li = document.querySelectorAll('.releases-container');
  li.forEach((el) => {
    if (el.querySelector('.name-track').getAttribute('type') == 'single') {
      el.addEventListener("click", () => {
        let id = el.querySelector('.name-artist').getAttribute('type');;
        getAlbum(id);
      });
    }
  });
};

// Запрос на получение альбома по id.
async function getAlbum(id) {
  const token = await getToken();
  fetch(`	https://api.spotify.com/v1/albums/${id}`, {
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token}
  })
  .then(async (response) => {
    const data = await response.json();
    createCards(data);
  });
};

// Обработка данных по альбомам, создание/изменение элементов Html.
function createCards(data) {
  console.log(data);
  createFooter(data);
  const title = document.querySelector('.title_content');
  const li = document.querySelectorAll('.releases-container');
  header.style.backgroundColor = '#737272';
  inputSearch.style.display = 'none';
  buttonBack.style.removeProperty('display');
  title.style.display = 'none';
  li.forEach((el) => {
    el.style.display = 'none';
  });

  // Визуальное создание карточки
  content.setAttribute('class', 'content-card');
  const contentContainer = document.createElement('div');
  contentContainer.classList = 'content-container';
  const imgTrack = document.createElement('img');
  imgTrack.setAttribute('src', data.images[0].url);
  imgTrack.setAttribute('width', '200');
  imgTrack.setAttribute('height', '200');
  const nameTrackContainer = document.createElement('div');
  nameTrackContainer.classList = 'name_track_container';
  const nameTrackContent = document.createElement('span');
  nameTrackContent.classList = 'name-track-content';
  nameTrackContent.innerHTML = textEllipsis(data.name, 30);
  const nameArtistContent = document.createElement('span');
  nameArtistContent.classList = 'name-artist-content';
  nameArtistContent.innerHTML = data.artists[0].name;
  const releaseDate = document.createElement('span');
  releaseDate.classList = 'release_date';
  releaseDate.innerHTML = data.release_date;
  content.prepend(contentContainer);
  contentContainer.append(imgTrack);
  contentContainer.append(nameTrackContainer);
  nameTrackContainer.append(nameTrackContent);
  nameTrackContainer.append(nameArtistContent);
  nameTrackContainer.append(releaseDate);

  const reContainer = document.createElement('div');
  reContainer.classList = 'rec-container';
  const titleTracks = document.createElement('h6');
  titleTracks.classList = 'title_tracks';
  titleTracks.innerHTML = 'Может, вы захотите это послушать';
  const tracksApi = document.createElement('ul');
  tracksApi.classList = 'tracks_Api';
  content.append(reContainer);
  reContainer.append(titleTracks);
  reContainer.append(tracksApi);

  const ulContentRel = document.querySelector('.content-releases')
  ulContentRel.style.display = 'none';

  // Получение списка новых релизов.
  async function getNewReleases() {
    const token = await getToken();
    fetch('https://api.spotify.com/v1/browse/new-releases?limit=5', {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + token}
    })
    .then(async (response) => {
      const data = await response.json();
      createRec(data.albums.items);
    });
  };
  getNewReleases();

  // Создание нового списка релизов.
  function createRec(data) {
    console.log(data);
    data.forEach((el) =>{
      const liSongs = document.createElement('li');
      liSongs.classList = 'songs';
      const imgSongs = document.createElement('img');
      imgSongs.setAttribute('src', el.images[2].url);
      imgSongs.setAttribute('width', '50');
      imgSongs.setAttribute('height', '50');
      const trackContainerLi = document.createElement('div');
      trackContainerLi.classList = 'track-container-ul';
      const nameTrackUl = document.createElement('span');
      nameTrackUl.classList = 'name-track-ul';
      nameTrackUl.innerHTML = el.name;
      const nameArtistUl = document.createElement('span');
      nameArtistUl.classList = 'name-artist-ul';
      nameArtistUl.innerHTML = el.artists[0];

      tracksApi.append(liSongs);
      liSongs.append(imgSongs);
      liSongs.append(trackContainerLi);
      trackContainerLi.append(nameTrackUl);
      trackContainerLi.append(nameArtistUl);
    });
  };

  
  // При нажатии на конпку назад, все должно вернуться как было.
  buttonBack.addEventListener("click", (event) => {
    header.style.backgroundColor = 'RGB(32, 32, 32)';
    inputSearch.style.removeProperty('display');
    buttonBack.style.display = 'none';
    title.style.removeProperty('display');
    li.forEach((el) => {
      el.style.removeProperty('display');
    });

    // Удаление карточки
    content.setAttribute('class', 'content');
    imgTrack.style.display = 'none';
    nameTrackContainer.style.display = 'none';
    nameTrackContent.style.display = 'none';
    nameArtistContent.style.display = 'none';
    releaseDate.style.display = 'grid';
    reContainer.style.display = 'none';
    titleTracks.style.display = 'none';
    tracksApi.style.display = 'none';
    ulContentRel.style.display = 'grid';
    li.forEach((el) => {
      el.style.display = 'grid';
    });
  })
};


// Запрос на получение альбомов по поиску.
async function getSearch(value) {
  const token = await getToken();
  fetch(`https://api.spotify.com/v1/search?q=${value}&type=album&limit=12`, {
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token}
  })
  .then(async (response) => {
    const data = await response.json();
    setCards(data.albums.items);
  });
};

// Работа с поиском. При вводе с клавиатуры в поле поиска, поле с Релизами надо удалить, чтобы на этом месте появлялись треки по
// поиску. Когда поле поиска пусто, тогда возвращаем релизы.
inputSearch.addEventListener('input', async (event) => {
  const title = document.querySelector('.title_content');
  const li = document.querySelectorAll('.releases-container');
  if (event.target.value == '') {
    if (li != null) {
      li.forEach((el) => {
        el.remove();
      });
    }
    await getNewReleases();
    title.innerHTML = 'Новые релизы';
  } else {
    title.innerHTML = 'Похоже, вы ищите именно это';
    if (li != null) {
      li.forEach((el) => {
        el.remove();
      });
    }
    await getSearch(event.target.value);
  }
});

// Заполнение footer данными альбома.
function createFooter(data) {
  const player = data;
  const imgFooter = document.querySelector('.player_img');
  imgFooter.setAttribute('src', player.images[2].url);
  const nameTrack = document.querySelector('.name-footer');
  nameTrack.innerHTML = textEllipsis(player.name, 40);
  const nameArtist = document.querySelector('.artist-footer');
  nameArtist.innerHTML = player.artists[0].name;
}

// Временное скрытие кнопки "назад".
buttonBack.style.display = 'none';

// При нажатии на кнопку поиска в aside, открывается (focus) поиск в footer.
buttonSearch.addEventListener('click', () => {
  inputSearch.focus();
});



