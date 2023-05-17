import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../Layouts/Heading';
import './camera.css'; 

// import Heading from '../../Layouts/Heading';
// import placeholder from '../../assets/images/placeholder.jpeg';
// import TimeConverter from '../../Services/timeConverter';
// import GetSeriesYear from '../../Services/getSeriesYear';

export const Show = () => {
    const { showId } = useParams();
    const [loading, setLoading] = useState(false);

    let imageUrl = '';
    
    // Data for Shows
    const [shows, setShows] = useState([]);

    // Data for Series Posters
    const [posters, setPosters] = useState([]);

    // Or combine them into one state variable
    const [combinedData, setCombinedData] = useState([]);

    useEffect(() => {
        Promise.all([
            fetch(`https://api.tvmaze.com/shows/${showId}`),
            fetch(`https://api.tvmaze.com/shows/${showId}/images`),
        ])
        .then(([resShows, resPosters]) => 
            Promise.all([resShows.json(), resPosters.json()])
        )
        .then(([dataShows, dataPosters]) => {
            setShows(dataShows);
            setPosters(dataPosters);

            if(Array.isArray(dataShows)) { // Add condition and make sure it's a valid array to avoid  
                setCombinedData(dataShows.concat(dataPosters));
            }
        });
    }, []);

    const showLoading = () => (loading ? <div id="preloader"></div> : "");

    const setPoster = () => {
        posters.map((element, index) => {
            if (index == 5) {
                imageUrl = element.resolutions.original.url;
            }

            return imageUrl;
        }
    )};


    return (
        <section>
            
            {setPoster()}
            {showLoading()}

    
            
            

            <div className="camera_container text-center">
                <div className="camera_fakehover">
                    <div className="camera_src camerastarted">
                        <img src={imageUrl} alt={shows.name} />
                    </div>

                    <div className="camera_target_content">
                        <div className="cameraContents">
                            <div className="camera_caption fadeIn">
                                <div>
                                    <Heading message={shows.name} />
                                    <div dangerouslySetInnerHTML={{ __html: shows.summary }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="parallax well2">
                <div className="container text-center center767">
                    <Heading message="Show Info" />

                    <ul className="marked-list row">
                        {/* <li><strong>Network:</strong> {shows.network.name}</li>
                        <li><strong>Schedule:</strong> {shows.schedule.days} at {shows.schedule.time} ({shows.runtime})</li>
                        <li><strong>Status:</strong> {shows.status}</li>
                        <li><strong>Type:</strong> {shows.type}</li>
                        <li><strong>Language:</strong> {shows.language}</li>
                        <li><strong>Genre:</strong> {shows.genres}</li> */}
                    </ul>
                </div>
            </section>
            
        </section>
        
    )
    // let imageUrl = '';
    // let runTime = '';
    // let badge = '';
    // const btnPrevious = document.querySelectorAll('.btn-previous');
    // const btnNext = document.querySelectorAll('.btn-next');

    // let firstsearcQueryVal = 0;
    // let lastsearcQueryVal = 270;

    // const [lists, setLists] = useState({
    //     series: []
    // });

    // let [searcQuery, setsearcQuery] = useState(`https://api.tvmaze.com/schedule/full`);
    // const [url, setUrl] = useState(`https://api.tvmaze.com/schedule/full`);
    // const [loading, setLoading] = useState(false);
    
    // useEffect(() => {
    //     fetchSeries();
    // }, [url]);

    // const handleChange = () => {
    //     setsearcQuery(searcQuery);
    //     setUrl(`https://api.tvmaze.com/schedule/full`);
    // };

    // const checkPageResult = () => {
    //     searcQuery === firstsearcQueryVal ? btnPrevious[0].setAttribute('disabled', '') : btnPrevious[0].removeAttribute('disabled');
    //     searcQuery === lastsearcQueryVal ? btnNext[0].setAttribute('disabled', '') : btnNext[0].removeAttribute('disabled');
    // }

    // const onNext = () => {
    //     if (searcQuery < lastsearcQueryVal) {
    //         searcQuery += 1;
    //         handleChange();
    //         checkPageResult();
    //     } else {
    //         searcQuery = lastsearcQueryVal;
    //     }
    // }

    // const onPrev = () => {
    //     if (searcQuery > 0) {
    //         searcQuery -= 1;
    //         handleChange();
    //         checkPageResult();
    //     } else {
    //         searcQuery = 0;
    //     }
    // }

    // const showLoading = () => (loading ? <div id="preloader"></div> : "");

    // const pagination = () => (
    //     <div className="row offs">
    //         <div className='content section-title'>
    //             <button className='btn-previous button-pagination fa fa-angle-left' onClick={onPrev}><span>Previous</span></button>
    //             <button className='btn-next button-pagination fa fa-angle-right' onClick={onNext}><span>Next</span></button>
    //             <p className='counter'>Page: {searcQuery + 1} / {lastsearcQueryVal}</p>
    //         </div>
    //     </div>
    // );

    // const fetchSeries = () => {
    //     setLoading(true);
    //     fetch(url)
    //         .then(result => result.json())
    //         .then(data => setLists({ series: data }, setLoading(false)))
    //         .catch(error => console.log(error));
    // };

    // const showLists = () => {
    //     return (
    //         <div className='row offs grid'>
    //             {
    //                 lists.series.map((element, index) => {
    //                     element.image === null ? imageUrl = placeholder : imageUrl = element.image.medium;
    //                     element.runtime === null ? runTime = element.averageRuntime : runTime = element.runtime;
    //                     element.rating.average === null ? badge = 'N/A' : badge = element.rating.average;

    //                     return (
    //                         <div className='col-md-3 col-sm-6 col-xs-12' key={index}>
                                
    //                         </div>
    //                     );
    //                 })
    //             }
    //         </div>
    //     ) 
    // };

    // return (
    //     <section className="well3 text-center">
    //         <div className="container">
    //             <Heading message="TV Countdown" />

    //             {showLoading()}
    //             {pagination()}
    //             {showLists()}
    //             {pagination()}
    //         </div>
    //     </section>
    // )
}

// export default Shows;
