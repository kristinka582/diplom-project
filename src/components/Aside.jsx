import React from 'react';

export default function Aside() {
    return (
        <aside className="aside">
            <article className="container-title">
                <img src="./images/spoti-icon-head-98.svg" alt="Иконка SpotiApp" width="50" height="50"/>
                <h1 className="title_aside">SpotiApp</h1>
            </article>
            <ul className="tags">
                <li className="tag-container">
                    <img src="./images/aside-home.png" alt="Иконка SpotiApp-home" width="25" height="25"/>
                    <a href="/" className="link">Главная</a>
                </li>
                <li className="tag-container">
                    <img src="./images/aside-search.png" alt="Иконка SpotiApp-search" width="25" height="25"/>
                    <a href="/" id="search" className="link">Поиск</a>
                </li>
                <li className="tag-container">
                    <img src="./images/aside-media.png" alt="Иконка SpotiApp-media" width="25" height="25"/>
                    <a href="./index.jsx" className="link">Моя медиатека</a>
                </li>
            </ul>
            <ul className="cookie">
                <li tabIndex={0}>
                    <a href="https://www.spotify.com/ru-ru/legal/cookies-policy/" className="link-cookie" target="_blank" rel="noopener noreferrer">Файлы cookie</a>
                </li>
                <li tabIndex={0}>
                    <a href="https://www.spotify.com/ru-ru/legal/privacy-policy/" className="link-cookie" target="_blank" rel="noopener noreferrer">Конфиденциальность</a>
                </li>
                <li tabIndex={0}>
                    <a href="https://support.spotify.com/ru-ru/contact-spotify-legal-form/" className="link-cookie" target="_blank" rel="noopener noreferrer">Форма для ваших обращений</a>
                </li>
            </ul>
        </aside>
    );
}