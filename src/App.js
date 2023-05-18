import React, { Component } from 'react';

import Header from './Layouts/Header';
import Footer from './Layouts/Footer';
import Search from './Pages/Search';
import AllShows from './Pages/AllShows';
import { Show } from './Pages/Show';
import Countdown from './Pages/Countdown';
import { About } from './Pages/About'; // we use { About } if About.js don't use export default About; but instead uses export const About = () =>
import { Api } from './Pages/Api';
import { NoRoute } from './Pages/NoRoute';
import { Routes, Route } from 'react-router-dom';
import './mailform.css';  
import './series.css';  
import './styles.css';  

class App extends Component {
    render() {
        return (
            <div className="page">
                <Header />

                <main>
                    <Routes>
                        <Route path='/' element={<AllShows />} />
                        <Route path='tv-series/' element={<AllShows />} />
                        <Route path='search' element={<Search />} />
                        <Route path='countdown' element={<Countdown />} />
                        <Route path='api' element={<Api />} />
                        <Route path='about' element={<About />} />
                        <Route path='shows/:showId' element={<Show />} />
                        <Route path='tv-series/shows/:showId' element={<Show />} />
                        <Route path='*' element={<NoRoute />} />
                    </Routes>
                </main>
                
                <Footer copyright="&copy; 2023 by Von Garcia" />

                <a href="#" id="toTop" className="toTop fa fa-chevron-up"></a>
            </div>
        );
    }
}

export default App; 
