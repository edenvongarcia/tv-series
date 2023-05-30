import React, { useEffect, useState } from 'react';  

import Heading from '../../Layouts/Heading';
import Loader from '../../Layouts/Loader';
import placeholder from '../../assets/images/placeholder.jpeg';
import TimeConverter from '../../Services/timeConverter';
import GetSeriesYear from '../../Services/getSeriesYear';
import ToFixedNumber from '../../Services/toFixedNumber';

const Search = () => {
    let imageUrl = '';
    let runTime = '';
    let badge = '';

    const [lists, setLists] = useState({
        series: []
    });
    const [searcQuery, setsearcQuery] = useState('Comedy');
    const [url, setUrl] = useState(`https://api.tvmaze.com/search/shows?q=comedy`);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSeries();
    }, [url]);

    const handleChange = (e) => {
        setsearcQuery(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setUrl(`https://api.tvmaze.com/search/shows?q=${searcQuery}`);
    };

    const showLoading = () => (loading ? <Loader /> : "");

    const searchForm = () => (
        <div className="container">
            <form onSubmit={handleSubmit} className="mailform rd-mailform">
                <fieldset>
                    <div className="mfControls center767">  
                        <label className="mfInput">
                            <input type="text" value={searcQuery} onChange={handleChange} className="form-control" />
                        </label>
                    </div>  

                    <div className="mfControls center767">                      
                        <button className="btn btn-default mfProgress" type="submit">Search</button>
                    </div>                
                </fieldset>
            </form>
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
        if (lists.series.length === 0) {
            return  <div className="parallax_cnt no-result">
                        <p>Sorry, but no shows or people matching your query were found.</p>
                    </div>;
        } else {
            return (
                // <MoviesList list={lists.series} /> 

                <div className="offs">
                    <div className="row offs grid">
                        {
                            lists.series.map((element, index) => {
                                element.show.image === null ? imageUrl = placeholder : imageUrl = element.show.image.medium;
                                element.show.runtime === null ? runTime = element.show.averageRuntime : runTime = element.show.runtime;
                                element.show.rating.average === null ? badge = 'N/A' : badge = element.show.rating.average;
                                
                                return (
                                    <div className="col-md-3 col-sm-6 col-xs-12" key={index}>
                                        <div className="thumbnail">
                                            <a href= {"shows/" + element.show.id} title="View more details"><img src={imageUrl} alt={element.show.name} /></a>
        
                                            <div className="thumbnail_overlay">
                                                <a className="fa fa-star" href="#" title="Score"> <span className="badge"><ToFixedNumber score={element.score} /></span></a>
                                                <a className="fa  fa-clock-o" href="#" title="Runtime"> <span className="badge"><TimeConverter runtime={runTime} /></span></a>
                                                <a className="fa fa-heart" href="#" title="Rating"> <span className="badge">{badge}</span></a>
                                            </div>
                                        </div>
                                        
                                        <h5 className="fw-m"><a href= {"shows/" + element.show.id} title="View more details">{element.show.name}</a></h5>
        
                                        <time><GetSeriesYear premiered={element.show.premiered} /></time>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            )
        }
    };

    return (
        <section className="well3 text-center">
            <div className="container">
                <Heading message="Search" />

                {showLoading()}
                {searchForm()}
                {showLists()}
            </div>
        </section>
    )
}

export default Search;
