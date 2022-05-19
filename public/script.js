
// Константы.
const inputSearch = document.getElementById('input_search');
const buttonSearch = document.getElementById('search');
const header = document.querySelector('.header');
const buttonBack = document.querySelector('.button-nav');
const content = document.querySelector('.content');
const title = document.querySelector('.title_content');
const ulContentRel = document.querySelector('.content-releases');

//Ключи.
const clientId = 'd23b9a98b4234f2689e059766d9c5eb0';
const clientSecret = '4abcdf28e9d445f1bed83a3760e1b017';

// Переменная для сохранения данных новых релизов (чтобы не подгружать их несколько раз)
let tempData = null;

let tempSearch = '';

// Получение токена.
async function getToken() {
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

// Fetch запрос на получение Api Новых релизов.
async function getNewReleases() {
  const token = await getToken();
  if (token) {
    fetch('https://api.spotify.com/v1/browse/new-releases?limit=12', {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + token}
    })
    .then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        tempData = data.albums.items;
        setCards(data.albums.items);
      }
      else {
        title.textContent = "Ничего не найдено. Попробуйте позже...";
      }
    });
  };
};

// Обработка данных ответа.
function setCards(data) {
  if (data) {
  // Cоздание li.
    data.forEach((element) => {
      const ulTrack = document.querySelector('.content-releases');
      const liTrack = document.createElement("li");
      liTrack.className = 'releases-container';
      ulTrack.append(liTrack);

      const imgTrack = document.createElement("img");
      imgTrack.setAttribute('src', element.images[1].url)
      imgTrack.setAttribute('width', '150');
      imgTrack.setAttribute('height', '150');
      liTrack.append(imgTrack);

      const spanTrack = document.createElement("span");
      spanTrack.className ='name-track';
      spanTrack.textContent = element.name;
      spanTrack.setAttribute('type', element.album_type);
      liTrack.append(spanTrack);

      const spanArtist = document.createElement("span");
      spanArtist.className ='name-artist';
      spanArtist.textContent = element.artists[0].name;
      spanArtist.setAttribute('type', element.id);
      liTrack.append(spanArtist);
    });


    // Вызов функции изменения footer.
    createFooter(data[0]);

    // Переход на карточку трека.
    let li = document.querySelectorAll('.releases-container');
    li.forEach((el) => {
      if (el.querySelector('.name-track[type="single"]')) {
        el.addEventListener("click", () => {
          let id = el.querySelector('.name-artist').getAttribute('type');
          getAlbum(id);
        });
      }
    });
  } else {
    alert('Data error');
  }
};

// Запрос на получение альбома по id.
async function getAlbum(id) {
  const token = await getToken();
  fetch(`https://api.spotifs.com/v1/albums/${id}`, {
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token}
  })
  .then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      createCard(data);
    }
  })
  .catch((error) => {
    alert('Ошибка ' + e.name + ":" + e.message);
  });
};

// Обработка данных по альбомам, создание/изменение элементов Html.
async function createCard(data) {
  if (data) {
    const li = document.querySelectorAll('.releases-container');
    header.classList = 'header_card';
    inputSearch.classList = 'input_search_card';
    buttonBack.classList = 'button-nav-card';
    title.classList = 'title_content_card';
    li.forEach((el) => {
      el.classList = 'releases-container-card';
    });

    // Визуальное создание карточки.
    await createCardAlbum(data);

    // Вызов функции создания нового списка релизов.
    createRec(tempData);

    // Заполнение footer данными альбома.
    createFooter(data);
  } else {
    alert('Data error');
  }
};

// При нажатии на конпку назад, все должно вернуться как было.
buttonBack.addEventListener("click", () => {
  const li = document.querySelectorAll('.releases-container-card');
  header.classList = 'header';
  inputSearch.classList = 'input_search';
  buttonBack.classList = 'button-nav';
  title.classList = 'title_content';
  li.forEach((el) => {
    el.classList = 'releases-container';
  });
  content.classList = 'content';
  ulContentRel.classList = 'content-releases';

  if (document.querySelector('.imgTrack_card')) {
    document.querySelector('.imgTrack_card').remove();
  }
  document.querySelector('.name_track_container').remove();
  document.querySelector('.rec-container').remove();
});

// Создание карточки Альбома, заполнение данными альбома.
async function createCardAlbum(data) {
  if (data) {
    content.classList = 'content-card';

    const contentContainer = document.createElement('div');
    contentContainer.classList = 'content-container';

    const imgTrack = document.createElement('img');
    imgTrack.classList = 'imgTrack_card';
    imgTrack.setAttribute('src', await data.images[0].url);
    imgTrack.setAttribute('width', '200');
    imgTrack.setAttribute('height', '200');

    const nameTrackContainer = document.createElement('div');
    nameTrackContainer.classList = 'name_track_container';

    const nameTrackContent = document.createElement('span');
    nameTrackContent.classList = 'name-track-content';
    nameTrackContent.textContent = await data.name;

    const nameArtistContent = document.createElement('span');
    nameArtistContent.classList = 'name-artist-content';
    nameArtistContent.textContent = await data.artists[0].name;

    const releaseDate = document.createElement('span');
    releaseDate.classList = 'release_date';
    releaseDate.textContent = await data.release_date;

    const reContainer = document.createElement('div');
    reContainer.classList = 'rec-container';

    const titleTracks = document.createElement('h6');
    titleTracks.classList = 'title_tracks';
    titleTracks.textContent = 'Может, вы захотите это послушать';

    const tracksApi = document.createElement('ul');
    tracksApi.classList = 'tracks_Api';

    content.prepend(contentContainer);
    contentContainer.append(imgTrack);
    contentContainer.append(nameTrackContainer);
    nameTrackContainer.append(nameTrackContent);
    nameTrackContainer.append(nameArtistContent);
    nameTrackContainer.append(releaseDate);
    content.append(reContainer);
    reContainer.append(titleTracks);
    reContainer.append(tracksApi);

    ulContentRel.classList = 'content-releases-card';
  } else {
    alert('Data error');
  }
}

// Создание нового списка релизов.
async function createRec(data) {
  let counter = 0;
  if (data) {
    await data.forEach((el) =>{
      if (counter != 5) {
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
        nameTrackUl.textContent = el.name;

        const nameArtistUl = document.createElement('span');
        nameArtistUl.classList = 'name-artist-ul';
        nameArtistUl.textContent = el.artists[0].name;

        const tracksApi = document.querySelector('.tracks_Api');
        tracksApi.append(liSongs);
        liSongs.append(imgSongs);
        liSongs.append(trackContainerLi);
        trackContainerLi.append(nameTrackUl);
        trackContainerLi.append(nameArtistUl);

        counter++;
      }
    });
  } else {
    alert('Data error');
  }
};

// Запрос на получение альбомов по поиску.
async function getSearch(value) {
  const token = await getToken();
  fetch(`https://api.spotify.com/v1/search?q=${value}&type=album&limit=12`, {
  method: 'GET',
  headers: { 'Authorization': 'Bearer ' + token}
  })
  .then(async (response) => {
    if (response.ok) {
      const data = await response.json();
      if (value === tempSearch) {
        setCards(data.albums.items);
      }
    }
  })
  .catch((error) => {
    alert('Ошибка ' + e.name + ":" + e.message);
  });
};

// Работа с поиском. При вводе с клавиатуры в поле поиска, поле с Релизами надо удалить, чтобы на этом месте появлялись треки по
// поиску. Когда поле поиска пусто, тогда возвращаем релизы.
inputSearch.addEventListener('input', async (event) => {
  tempSearch = event.target.value;
  const li = document.querySelectorAll('.releases-container');
  if (event.target.value == '') {
    if (li != null) {
      li.forEach((el) => {
        el.remove();
      });
    }
    await getNewReleases();
    title.textContent = 'Новые релизы';
  } else {
    title.textContent = 'Похоже, вы ищите именно это';
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
  if (data) {
    const imgFooter = document.querySelector('.player_img');
    imgFooter.setAttribute('src', data.images[2].url);
    const nameTrack = document.querySelector('.name-footer');
    nameTrack.textContent = data.name;
    const nameArtist = document.querySelector('.artist-footer');
    nameArtist.textContent = data.artists[0].name;
  }
}

// Вызов функции на получение Новых релизов.
getNewReleases();

// При нажатии на кнопку поиска в aside, открывается (focus) поиск в footer.
buttonSearch.addEventListener('click', () => {
  inputSearch.focus();
});