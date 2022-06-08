import React, { useState } from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Aside from './components/Aside'
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import ContentCard from './components/ContentCard';

function App() {

  const [searchValue, setSearchValue] = useState('');
  const [itemId, setItemId] = useState('');
  const [items, setItems] = useState([]);
  const [headerVisibility, setheaderVisibility] = useState('');

  return (
    <BrowserRouter>
      <div className="app">
        <Header searchValue={searchValue} onSearchCallback={setSearchValue} headerVisibility={headerVisibility}/>
        <Aside />
        <Routes>
          <Route path="/" element={<Content searchValue={searchValue} headerVisibility={headerVisibility} onClickCall={setheaderVisibility} items={items} setItems={setItems} itemId={itemId} onClickCallback={setItemId}/>} />
          <Route path="/ContentCard" element={<ContentCard itemId={itemId} items={items}/>} />
        </Routes>
        <Footer searchValue={searchValue}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
