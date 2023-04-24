import Header from "./components/Header/Header";
import React from "react";
import { Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from "./components/Auth/Auth";
import Admin from "./components/Admin/Admin";
import ViewPodcast from "./components/ViewPodcast/ViewPodcast";
import Home from "./components/Home/Home";
import Favorites from "./components/Favorites/Favorites";
import Podify from "./components/Podify/Podify";

function App() {
  return <React.Fragment>
    <header>
      <Header />
    </header>
    <main>
      <Routes>
      <Route path="/" element={<Podify />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/fav" element={<Favorites/>} />
        <Route path="/:pod" element={<ViewPodcast />} />
      </Routes>
    </main>
  </React.Fragment>
}

export default App;
