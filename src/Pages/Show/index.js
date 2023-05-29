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

    // For setting merged data of crews instead of displaying a crew member multiple time on the list
    const crewMember = [];

    // Multiple API Requests
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
        // Extract needed data from available poster images
        const extractedData = posters.map(({ id, resolutions }) => ({
            id,
            url: resolutions?.original?.url,
            width: resolutions?.original?.width,
        }));
        
        // Sort width of images from lowest to highest width and use it as a reference for the image to use
        const numAscending = [...extractedData].sort((a, b) => a.width - b.width);
        
        // Get highest width of image for poster use
        let lastElement = numAscending.pop();

        // Deconstruct to get the url of the image, add additional condition to avoid destructure property error
        const { url } = lastElement || {};

        // Return the image url
        return imageUrl = url;
    };

    // Show the poster image
    const showPoster = () => {
        return (
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
        )
    }

    // Show details
    const showDetails = () => {
        return (
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
                                        <td>{shows?.network?.country?.name} <a href={shows?.network?.officialSite} target="_blank">{shows?.network?.name}</a></td>
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
            </section>
        )
    }

    // Show the casts
    const showCasts = () => {
        return (
            <div className="container well5">
                <div className="container center767">
                    { casts.length != 0 ? <div className="row text-center center767"><Heading message="Cast" /></div>: null }

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
        )
    }

    // Show the crews
    const showCrews = () => {
        crews.filter(function(entry) {
            var previous;
        
            // Have we seen this crew before?
            if (crewMember.hasOwnProperty(entry.person.id)) {
                // Yes, grab it and add this data to it
                previous = crewMember[entry.person.id];
                previous.crews.push(entry.type);
        
                // Don't keep this entry, we've merged it into the previous one
                return false;
            }
        
            // entry.type probably isn't an array; make it one for consistency
            if (!Array.isArray(entry.type)) {
                entry.crews = [entry.type];
            }
        
            // Remember that we've seen it
            crewMember[entry.person.id] = entry;
        
            // Keep this one, we'll merge any others that match into it
            return true;
        });

        return (
            <div className="container text-center crew">
                 { crewMember.length != 0 ? <div className="row"><Heading message="Crew" /></div>: null }
                
                <div className="row">
                    <div className="row grid offs">
                        {
                            crewMember.map((element, index) => {
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
                                        <p>{element.crews}</p>
                                    </div>
                                );
                            })
                        } 
                    </div>  
                </div>
            </div>
        )
    }
 
    return (
        <section>
            {showLoading()}
            {showPoster()}
            {showDetails()}
            {showCasts()}
            {showCrews()}
        </section>
    )
}
