import React from 'react';
import { Link } from "react-router-dom"
// import { getToPathname } from 'react-router/lib/router';

export default function Header(props) {

    console.log(props);
    
    if (props.headerVisibility !== "header_card") {
        return (
            <header className="header">
                <div className="search">
                    {/* Поиск будет осуществляться с помощью Api Spotify */}
                    <form action="URL" className="form_search">
                        <input className="input_search"  value={props.searchValue} onChange={(e) => props.onSearchCallback(e.target.value)} type="text" placeholder="Искать здесь..." id="input_search"/>
                    </form>
                </div>
            </header>
        )
    } else {
        return (
            <header className="header_card">
                <nav className="button_container">
                    <button className="button-nav-card">
                        <Link to='/' className="link_li" >
                            <img src="./images/button-back.png" alt="Кнопка Назад" title="Назад" width="30" height="30"/>
                        </Link>
                    </button>
                </nav>
            </header>
        )
    }
}