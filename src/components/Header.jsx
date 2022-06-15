/**
 * Файл компонента Header. Отображает строку поиска или кнопку "Назад".
 */

import React from 'react';
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"

export default function Header() {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    /**
     * Функция, обрабатывающая изменения поля поиска.
     * @param {object} event 
     */
    function onSearch(event) {
        event.preventDefault();
        let keyword;
        if (event.target.value) {
            keyword = {search: event.target.value}
        } else {
            keyword = undefined;
        }
        setSearchParams(keyword, { replace: true });
    }

    let location = useLocation();

    if (location.pathname.includes('id')) {
        return (
            <header className="header_card">
                <nav className="button_container">
                    <button onClick={() => navigate(-1)} className="button-nav-card">
                        <img src="./images/button-back.png" alt="Кнопка Назад" title="Назад" width="30" height="30"/>
                    </button>
                </nav>
            </header>
        )
    } else {
        return (
            <header className="header">
                <div className="search">
                    <form action="URL" className="form_search">
                        <input className="input_search" onChange={(e) => onSearch(e)} type="text" placeholder="Искать здесь..." id="input_search"/>
                    </form>
                </div>
            </header>
        )
    }
}