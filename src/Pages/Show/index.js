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

    // Data for Series Casts
    const [casts, setCasts] = useState([]);

    // Data for Series akas
    const [akas, setAkas] = useState([]);

    // Data for Series Crews
    const [crews, setCrews] = useState([]);

    useEffect(() => {
        setLoading(true);
        Promise.all([
            fetch(`https://api.tvmaze.com/shows/${showId}`),
            fetch(`https://api.tvmaze.com/shows/${showId}/images`),
            fetch(`https://api.tvmaze.com/shows/${showId}/cast`),
            fetch(`https://api.tvmaze.com/shows/${showId}/akas`),
            fetch(`https://api.tvmaze.com/shows/${showId}/crew`),
            
        ])
        .then(([resShows, resPosters, resCasts, resAkas, resCrews]) => 
            Promise.all(
                [resShows.json(), 
                resPosters.json(), 
                resAkas.json(), 
                resCasts.json(), 
                resCrews.json()], 
                setLoading(false))
        )
        .then(([dataShows, dataPosters, dataAkas, dataCasts, dataCrews]) => {
            setShows(dataShows);
            setPosters(dataPosters);
            setCasts(dataCasts);
            setAkas(dataAkas);
            setCrews(dataCrews);
        });
    }, []);

    const showLoading = () => (loading ? <div id="preloader"></div> : "");

    const setPoster = () => {
        const extractedData = posters.map(({ id, resolutions }) => ({
            id,
            url: resolutions?.original?.url,
            width: resolutions?.original?.width,
        }));
        
        // Sort width of images from lowest to highest width
        const numAscending = [...extractedData].sort((a, b) => a.width - b.width);
        
        // Get highest width of image for poster use
        let lastElement = numAscending.pop();

        // Deconstruct to get the url of the image, add additional condition to avoid destructure property error
        const { url } = lastElement || {};

        // Return the image url
        return imageUrl = url;
    };
 
    return (
        <section>
            
            {showLoading()}

            <div className="camera_container text-center">
                <div className="camera_fakehover">
                    <div className="camera_src camerastarted">
                    
                        <img src={setPoster()} alt={shows.name} />
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
                    <div className="row">
                        <div className="col-md-6 col-sm-6 col-xs-12 table-responsive">
                            <div className="row text-center center767">
                                <Heading message="Show Info" />
                            </div>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <th>Network</th>
                                        <td>{shows?.network?.country?.name} <a href="https://www.cbs.com/" target="_blank">{shows?.network?.name}</a></td>
                                    </tr>
                                    <tr>
                                        <th>Schedule</th>
                                        <td>{shows?.schedule?.days} at {shows?.schedule?.time} ({shows.runtime} min)</td>
                                    </tr>
                                    <tr>
                                        <th>Status</th>
                                        <td>{shows.status}</td>
                                    </tr>
                                    <tr>
                                        <th>Premiered</th>
                                        <td>{shows.premiered}</td>
                                    </tr>
                                    <tr>
                                        <th>Ended</th>
                                        <td>{shows.ended}</td>
                                    </tr>
                                    <tr>
                                        <th>Type</th>
                                        <td>{shows.type}</td>
                                    </tr>
                                    <tr>
                                        <th>Language</th>
                                        <td>{shows.language}</td>
                                    </tr>
                                    <tr>
                                        <th>Genre</th>
                                        <td>{shows?.genres?.join(", ")}</td>
                                    </tr>
                                    <tr>
                                        <th>Official Site</th>
                                        <td><a href={shows?.network?.officialSite} title={shows?.network?.name}>{shows?.network?.officialSite}</a></td>
                                    </tr>
                                    <tr>
                                        <th>Rating</th>
                                        <td>{shows?.rating?.average}</td>
                                    </tr>
                                </tbody>

                            </table>                
                        </div>

                        <div className="col-md-6 col-sm-6 col-xs-12 table-responsive">
                            <div className="row text-center center767">
                                <Heading message="Extra Details" />
                            </div>

                            <table className="table table-bordered">
                                <tbody>
                                    <tr>
                                        <td colSpan={2}>
                                            <strong>Also known as:</strong>
                                        </td>
                                    </tr>
                                    {
                                        akas.map((element, index) => {
                                            return (
                                                <tr key={index}>
                                                    <th>{element.name}</th>
                                                    <td>{element?.country?.name}</td>   
                                                </tr>
                                            );
                                        })
                                    }
                                </tbody>
                            </table>                
                        </div>
                    </div> 
                </div>

                <div className="container well5">
                    <div className="container center767">
                        <div className="row text-center center767">
                            <Heading message="Cast" />
                        </div>

                        <div className="row grid">
                            {
                                casts.map((element, index) => {
                                    return (
                                        <article className='col-md-4 col-sm-4 col-xs-12' key={index}>
                                            <div className="row">
                                                <div className="col-md-6 col-sm-6 col-xs-6">
                                                    <div className="thumbnail">
                                                        <img src={element?.person?.image?.medium} alt={element.person.name} />
                                                    </div>
                                                </div>

                                                <div className="col-md-6 col-sm-6 col-xs-6">
                                                    <p><strong>{element.person.name}</strong></p>
                                                    <p>as <strong>{element.character.name}</strong></p>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })
                            }
                        </div>
                    </div> 
                </div>

                <div className="container text-center crew">
                    <div className="row">
                        <Heading message="Crew" />
                    </div>
                    
                    <div className="row">
                        <div className="row offs">
                            {
                                crews.map((element, index) => {
                                    if(element?.person?.image?.medium != null) {
                                        imageUrl = <img src={element?.person?.image?.medium} alt={element.person.name} />
                                    } else {
                                        imageUrl = <span>Image not available</span>;
                                    }

                                    return (                                       
                                        <div className="col-md-2 col-sm-2 col-xs-12" key={index}>
                                            <div className="thumbnail">
                                                {imageUrl}
                                            </div>

                                            <p><strong>{element.person.name}</strong></p>
                                            <p>{element.type}</p>
                                        </div>
                                    );
                                })
                            } 
                        </div>  
                    </div>
                </div>
            </section>
        </section>
    )
}
