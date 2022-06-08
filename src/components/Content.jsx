import React, { useEffect, useState } from 'react';
import SpotifyApi from './Api';
import { Link } from "react-router-dom"


export default function Content(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    let api = new SpotifyApi();

    useEffect(async () => {
        // Получение токена.
        let token = await api.getToken();
        let tempData = null;
        if (token) {
            if (props.searchValue) {
                // Если есть searchValue, то передаем данные в апи поиска.
                tempData = await api.getSearch(props.searchValue, token);
            } else {
                // Иначе используем апи получения новых релизов.
                tempData = await api.getNewReleases(token)
            }
            setIsLoaded(true);
            props.setItems(tempData);
        } else {
            setIsLoaded(true);
            setError(error);
        }
    }, [props.searchValue])

    // Обработка события onClick.
    function onClickItem(id) {
        // Передача props.
        props.onClickCallback(id);
        props.onClickCall("header_card");
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="content">Загрузка...</div>;
    } else {
            return (
                    <main className="content">
                        <h2 className="title_content">Новые Релизы</h2>
                        <ul className="content-releases">
                            {/* Формирование карточек новых релизов. */}
                            {props.items.map(
                                (item) => (
                                    <Link to="/ContentCard" key={item.id} onClick={() => onClickItem(item.id)} className="link_li">
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