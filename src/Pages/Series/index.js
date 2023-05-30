import React, { Component } from 'react';

import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import Search from '../../Pages/Search';
import AllShows from '../../Pages/AllShows';
import { Show } from '../../Pages/Show';
import Countdown from '../../Pages/Countdown';
import { About } from '../../Pages/About'; // we use { About } if About.js don't use export default About; but instead uses export const About = () =>
import { Api } from '../../Pages/Api';
import { NoRoute } from '../../Pages/NoRoute';
import { Routes, Route } from 'react-router-dom';
// import { Switch, Route } from 'react-router-dom';
import '../../mailform.css';  
import '../../series.css';  
import '../../styles.css';  

class Series extends Component {
    render() {
        return (
            <div className="page">
                <Header />

                <main>
                    <Routes>
                        <Route exact path="/" element={<AllShows />} />
                        <Route exact path="/example" element={<AllShows />} />
                        <Route exact path='/search' element={<Search />} />
                        <Route exact path='/countdown' element={<Countdown />} />
                        <Route exact path='/api' element={<Api />} />
                        <Route exact path='/about' element={<About />} />
                        <Route
                        exact
                        path="/shows/:showId"
                        element={<Show />}
                        />
                        <Route
                        exact
                        path="/tv-series/shows/:showId"
                        element={<Show />}
                        />
                        <Route element={<NoRoute />} />
                    </Routes>
                </main>
                
                <Footer copyright="&copy; 2023 by Von Garcia" />

                <a href="#" id="toTop" className="toTop fa fa-chevron-up"></a>
            </div>
        );
    }
}

export default Series; 
