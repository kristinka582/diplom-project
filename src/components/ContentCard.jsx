/**
 * Файл компонента ContentCard. Отображает карточку одного альбома + рекомендации.
 */

import React from 'react';
import { useParams } from "react-router-dom"
import {useQuery} from 'react-query';
import SpotifyApi from './Api';


/**
 * Компонент ContentCard.
 * @returns возвращает верстку компонента.
 */
export default function ContentCard() {

    const params = useParams();
    let albumId = params.id.slice(3);
    let api = new SpotifyApi();

    let {error, isLoaded, data } = useQuery(['new-releases', 'album', albumId], async () => {
        let token = await api.getToken();
        return [await api.getAlbum(albumId, token), await api.getNewReleases5(token)];
    });


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (isLoaded) {
        return <div className="content">Загрузка...</div>;
    } else {
        let items = [];
        let album = null;
        let nameTrack, nameArtist, releaseDate, imageTrack = '';
        if (data) {
            album = data[0];
            items = data[1];
            imageTrack = album.images[1].url;
            nameTrack = album.name;
            nameArtist = album.artists[0].name;
            releaseDate = album.release_date;
        }
        return (
            <main className="content">
                <div className="content-container">
                    <img src={imageTrack} className="imgTrack_card" alt="releases_image" width="200" height="200" />
                    {/* Создание карточки альбома. */}
                    <div className="name_track_container">
                        <span className="name-track-content">{nameTrack}</span>
                        <span className="name-artist-content">{nameArtist}</span>
                        <span className="release_date">{releaseDate}</span>
                    </div>
                </div>
                <div className="rec-container">
                    <h6 className="title_tracks">Может, вы захотите это послушать</h6>
                    <ul className="tracks_Api">
                        {/* Список новых релизов, 5шт. */}
                        {items.map(
                            (item) => (
                                <li className="songs" key={item.id}>
                                    <img src={item.images[1].url} alt="releases_image" width="50" height="50" />
                                    <div className="track-container-ul">
                                        <span className="name-track-ul">{item.name}</span>
                                        <span className="name-artist-ul">{item.artists[0].name}</span>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            </main>
        );
    }
}