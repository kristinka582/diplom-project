/**
 * Файл корневого компонента App. Объединяет верстку компонентов.
 */

import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Aside from './components/Aside'
import Footer from './components/Footer';
import Header from './components/Header';
import Content from './components/Content';
import ContentCard from './components/ContentCard';

function App() {

  return (
    <BrowserRouter>
      <div className="app">
        <Header/>
        <Aside />
        <Routes>
          <Route path="/" element={<Content/>} />
          <Route path=":id" element={<ContentCard/>} />
        </Routes>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
