import React, { Component } from 'react';

import Header from '../../Layouts/Header';
import Footer from '../../Layouts/Footer';
import Search from '../Search';
import AllShows from '../AllShows';
import Countdown from '../Countdown';
import { About } from '../About'; // we use { About } if About.js don't use export default About; but instead uses export const About = () =>
import { Api } from '../Api';
import { Routes, Route } from 'react-router-dom';
import './App.css';

class Series extends Component {
    render() {
        return (
            <div className="page">
                <Header />

                <main>
                    <Routes>
                        <Route path='/' element={<AllShows />} />
                        <Route path='search' element={<Search />} />
                        <Route path='countdown' element={<Countdown />} />
                        <Route path='api' element={<Api />} />
                        <Route path='about' element={<About />} />
                    </Routes>
                </main>
                
                <Footer copyright="&copy; 2023 by Von Garcia" />

                <a href="#" id="toTop" className="toTop fa fa-chevron-up"></a>
            </div>
        );
    }
}

export default Series; 
