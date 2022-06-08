import React, { useEffect, useState } from 'react';
import SpotifyApi from './Api';

function ContentCard(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [album, setAlbum] = useState([]);

    let api = new SpotifyApi();

    useEffect(async () => {
        let token = await api.getToken();
        let id = props.itemId;
        if (token) {
            // Получение альбомов по id.
            let tempData = await api.getAlbum(id, token);
            setIsLoaded(true);
            setAlbum(tempData);
        } else {
            setIsLoaded(true);
            setError(error);
        }
    }, [])

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="content">Загрузка...</div>;
    } else {
        let artistName = '';
        let trackImage = '';
        let currentItems = [];
        if (props.items) {
            for (let i = 0; i < 5; i++) {
                currentItems.push(props.items[i]);
            }
        }
        if (album.artists && album.images) {
            artistName = album.artists[0].name;
            trackImage = album.images[1].url;
        }
        return (
            <main className="content">
                <div className="content-container">
                    <img src={trackImage} className="imgTrack_card" alt="releases_image" width="200" height="200" />
                    {/* Создание карточки альбома. */}
                    <div className="name_track_container">
                        <span className="name-track-content">{album.name}</span>
                        <span className="name-artist-content">{artistName}</span>
                        <span className="release_date">{album.release_date}</span>
                    </div>
                </div>
                <div className="rec-container">
                    <h6 className="title_tracks">Может, вы захотите это послушать</h6>
                    <ul className="tracks_Api">
                        {/* Список новых релизов, 5шт. */}
                        {currentItems.map(
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

export default ContentCard;