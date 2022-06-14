/**
 * Файл компонента Footer. Отображает Плеер, иконку первого альбома или же иконку альбома, на который нажал пользователь.
 */

import React from 'react';
import { getApi } from './Content';


export default function Footer() {

    let {error, isLoaded, data } = getApi();

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (isLoaded) {
        return <div className="content">Загрузка...</div>;
    } else {
        let item = null;
        let nameTrack, imageTrack, nameArtist = '';
        if (window.location.pathname.includes('id')) {
            if (data) {
                item = data;
                nameTrack = item.name;
                imageTrack = item.images[2].url;
                nameArtist = item.artists[0].name;
            }
        } else {
            if (data) {
                item = data[0];
                nameTrack = item.name;
                imageTrack = item.images[2].url;
                nameArtist = item.artists[0].name;
            }
        }
        return (
            <footer className="footer">
                <section className="footer-container">
                    <img src={imageTrack} className="player_img" alt="Иконка SpotiApp-album" width="55" height="55"/>
                    <div className="track-container">
                        <span className="name-track name-footer">{nameTrack}</span>
                        <span className="name-artist artist-footer">{nameArtist}</span>
                    </div>
                </section>
                <audio className="audio" controls="controls">
                    <source src="" type="audio/wav"/>
                    <source src="./audio for example/Running_Up_That_Hill.mp3" type="audio/mpeg"/>
                </audio>
            </footer>
        )
    }
}
