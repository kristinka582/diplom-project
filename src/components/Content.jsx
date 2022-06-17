/**
 * Компонент Content. Отображает реестр карточек треков.
 */

import React from 'react';
import useGetApi from './useGetApi.js';
import { Link } from "react-router-dom";


/**
 * Компонент Content.
 * @returns возвращает верстку компонента.
 */
export default function Content() {

    let {error, isLoaded, data } = useGetApi();

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