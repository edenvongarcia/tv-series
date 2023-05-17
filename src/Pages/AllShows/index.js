import React, { useEffect, useState } from 'react';

import Heading from '../../Layouts/Heading';
import placeholder from '../../assets/images/placeholder.jpeg';
import TimeConverter from '../../Services/timeConverter';
import GetSeriesYear from '../../Services/getSeriesYear';

const AllShows = () => {
    let imageUrl = '';
    let runTime = '';
    let badge = '';
    const btnPrevious = document.querySelectorAll('.btn-previous');
    const btnNext = document.querySelectorAll('.btn-next');

    let firstsearcQueryVal = 0;
    let lastsearcQueryVal = 270;

    const [lists, setLists] = useState({
        series: []
    });

    let [searcQuery, setsearcQuery] = useState(firstsearcQueryVal);
    const [url, setUrl] = useState(`https://api.tvmaze.com/shows?page=0`);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchSeries();
    }, [url]);

    const handleChange = () => {
        setsearcQuery(searcQuery);
        setUrl(`https://api.tvmaze.com/shows?page=${searcQuery}`);
    };

    const checkPageResult = () => {
        searcQuery === firstsearcQueryVal ? btnPrevious[0].setAttribute('disabled', '') : btnPrevious[0].removeAttribute('disabled');
        searcQuery === lastsearcQueryVal ? btnNext[0].setAttribute('disabled', '') : btnNext[0].removeAttribute('disabled');
    }

    const onNext = () => {
        if (searcQuery < lastsearcQueryVal) {
            searcQuery += 1;
            handleChange();
            checkPageResult();
        } else {
            searcQuery = lastsearcQueryVal;
        }
    }

    const onPrev = () => {
        if (searcQuery > 0) {
            searcQuery -= 1;
            handleChange();
            checkPageResult();
        } else {
            searcQuery = 0;
        }
    }

    const showLoading = () => (loading ? <div id="preloader">{checkPageResult()}</div> : "");

    const pagination = () => (
        <div className="row offs">
            <div className='content section-title'>
                <button className='btn-previous button-pagination fa fa-angle-left' onClick={onPrev}><span>Previous</span></button>
                <button className='btn-next button-pagination fa fa-angle-right' onClick={onNext}><span>Next</span></button>
                <p className='counter'>Page: {searcQuery + 1} / {lastsearcQueryVal}</p>
            </div>
        </div>
    );

    const fetchSeries = () => {
        setLoading(true);
        fetch(url)
            .then(result => result.json())
            .then(data => setLists({ series: data }, setLoading(false)))
            .catch(error => console.log(error));
    };

    const showLists = () => {
        return (
            <div className='row offs grid'>
                {
                    lists.series.map((element, index) => {
                        element.image === null ? imageUrl = placeholder : imageUrl = element.image.medium;
                        element.runtime === null ? runTime = element.averageRuntime : runTime = element.runtime;
                        element.rating.average === null ? badge = 'N/A' : badge = element.rating.average;

                        return (
                            <div className='col-md-3 col-sm-6 col-xs-12' key={index}>
                                <div className="thumbnail">
                                    <a href= {"shows/" + element.id} title="View more details"><img src={imageUrl} alt={element.name} /></a>

                                    <div className="thumbnail_overlay">
                                        {/* <a className="fa fa-star" href="#" title="Score"> <span className="badge"><ToFixedNumber score={element.score} /></span></a> */}
                                        <a className="fa  fa-clock-o" href="#" title="Runtime"> <span className="badge"><TimeConverter runtime={runTime} /></span></a>
                                        <a className="fa fa-heart" href="#" title="Rating"> <span className="badge">{badge}</span></a>
                                    </div>
                                </div>

                                <h5 className="fw-m">{element.name}</h5>

                                <time><GetSeriesYear premiered={element.premiered} /></time>
                            </div>
                        );
                    })
                }
            </div>
        ) 
    };

    return (
        <section className="well3 text-center">
            <div className="container">
                <Heading message="Welcome to My Mini Netflix" />

                {showLoading()}
                {pagination()}
                {showLists()}
                {pagination()}
            </div>
        </section>
    )
}

export default AllShows;
