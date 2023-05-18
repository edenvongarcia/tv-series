import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Heading from '../../Layouts/Heading';
import './camera.css'; 

export const Show = () => {
    const { showId } = useParams();
    const [loading, setLoading] = useState(false);

    let imageUrl = '';
    
    // Data for Shows
    const [shows, setShows] = useState([]);

    // Data for Series Posters
    const [posters, setPosters] = useState([]);

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
                <div className="container ">
                    <div className="row text-center center767">
                        <Heading message="Show Info" />
                    </div>

                    <div className="row">
                        <div className="col-md-4 col-sm-6 col-xs-12">
                            <ul>
                                <li><strong>Network:</strong> {shows?.network?.country?.name} {shows?.network?.name}</li>
                                <li><strong>Schedule:</strong> {shows?.schedule?.days} at {shows?.schedule?.time} ({shows.runtime} min)</li>
                                <li><strong>Status:</strong> {shows.status}</li>
                                <li><strong>Type:</strong> {shows.type}</li>
                                <li><strong>Language:</strong> {shows.language}</li>
                                <li><strong>Genre:</strong> {shows.genres}</li>
                                <li><strong>Official site: </strong> {shows?.network?.officialSite}</li>
                            </ul>                 
                        </div>
                    </div> 
                </div>
            </section>
        </section>
    )
}
