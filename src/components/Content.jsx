/**
 * Компонент Content. Отображает реестр карточек треков.
 */

import React from 'react';
import SpotifyApi from './Api';
import { Link, useSearchParams } from "react-router-dom";
import {useQuery} from 'react-query';

/**
 * Реализует хук useQuery, используется для работы с api.
 * @returns возвращает нужное api.
 */
export function getApi() {
    const [searchParams] = useSearchParams();
    const searchResult = searchParams.get('search');
    let albumId = '';
    if (window.location.pathname.includes('id')) {
        albumId = window.location.pathname.slice(4);
    }
    let api = new SpotifyApi();

    let {error, isLoaded, data } = useQuery(['new-releases', 'search', 'album', searchResult, albumId], async () => {
        let token = await api.getToken();
        if (searchResult) {
            return await api.getSearch(searchResult, token);
        } else if (albumId) {
            return await api.getAlbum(albumId, token);
        } else {
            return await api.getNewReleases12(token);
        }
    });
    return {error, isLoaded, data };
}

/**
 * Компонент Content.
 * @returns возвращает верстку компонента.
 */
export default function Content() {

    let {error, isLoaded, data } = getApi();

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (isLoaded) {
        return <div className="content">Загрузка...</div>;
    } else {
            let items = [];
            if (data) {
                items = data;
            }
            return (
                    <main className="content">
                        <h2 className="title_content">Новые Релизы</h2>
                        <ul className="content-releases">
                            {/* Формирование карточек новых релизов. */}
                            {items.map(
                                (item) => (
                                    <Link to={`id=${item.id}`} key={item.id} className="link_li">
                                        <li className="releases-container" >
                                            <img src={item.images[1].url} alt="releases_image" width="150" height="150" />
                                            <span className="name-track">{item.name}</span>
                                            <span className="name-artist">{item.artists[0].name}</span>
                                        </li>
                                    </Link>
                                )
                            )}
                        </ul>
                    </main>
            );
    }
}