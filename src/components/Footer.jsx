import React, { useState, useEffect } from 'react';
import SpotifyApi from './Api';



export default function Footer(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItem] = useState([]);
    let api = new SpotifyApi();
    

    useEffect(async () => {
        let token = await api.getToken();
        let tempData = null;
        if (token) {
            if (props.searchValue) {
                tempData = await api.getSearch(props.searchValue, token);
            } else {
                tempData = await api.getNewReleases(token)
            }
            setIsLoaded(true);
            setItem(tempData[0]);
        } else {
            setIsLoaded(true);
            setError(error);
        }
    }, [props.searchValue])


    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="content">Загрузка...</div>;
    } else {
        let artistName = '';
        let trackImage = '';
        if (item.artists && item.images) {
            artistName = item.artists[0].name;
            trackImage = item.images[2].url;
        }
        return (
            <footer className="footer">
                <section className="footer-container">
                    <img src={trackImage} className="player_img" alt="Иконка SpotiApp-album" width="55" height="55"/>
                    <div className="track-container">
                        <span className="name-track name-footer">{item.name}</span>
                        <span className="name-artist artist-footer">{artistName}</span>
                    </div>
                </section>
                {/* Плеер будет переделан, пока не знаю, как его сделать. Очень хочу подключить Api,
                но если не успею в рамках курса, то либо доделаю после, либо вставлю иконки */}
                <audio className="audio" controls="controls">
                    <source src="" type="audio/wav"/>
                    <source src="./audio for example/Running_Up_That_Hill.mp3" type="audio/mpeg"/>
                </audio>
            </footer>
        )
    }
}