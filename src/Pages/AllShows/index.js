import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import Heading from '../../Layouts/Heading';
import Loader from '../../Layouts/Loader';
import placeholder from '../../assets/images/placeholder.jpeg';
import TimeConverter from '../../Services/timeConverter';
import GetSeriesYear from '../../Services/getSeriesYear';

const AllShows = () => {
    let imageUrl = '';
    let runTime = '';
    let badge = '';

    let firstsearcQueryVal = 0;
    let lastsearcQueryVal = 276;

    const [lists, setLists] = useState({
        series: []
    });

    let [currentPage, setCurrentPage] = useState(firstsearcQueryVal);
    const [url, setUrl] = useState(`https://api.tvmaze.com/shows?page=${firstsearcQueryVal}`);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        fetchSeries();
    }, [url]);

    const handlePageClick = async (data) => {
        currentPage = data.selected;
        setUrl(`https://api.tvmaze.com/shows?page=${currentPage}`);
        setCurrentPage(currentPage);
    };

    const showLoading = () => (loading ? <Loader /> : "");

    const pagination = () => (
        <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={'...'}
            pageCount={lastsearcQueryVal}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
            forcePage={currentPage}
        />
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
                        element.image === null ? imageUrl = placeholder : imageUrl = element?.image?.medium;
                        element.runtime === null ? runTime = element.averageRuntime : runTime = element.runtime;
                        element?.rating?.average === null ? badge = 'N/A' : badge = element?.rating?.average;

                        return (
                            <div className='col-md-3 col-sm-6 col-xs-12' key={index}>
                                <div className="thumbnail">
                                    <a href= {"shows/" + element.id} title="View more details"><img src={imageUrl} alt={element.name} /></a>

                                    <div className="thumbnail_overlay">
                                        <a className="fa  fa-clock-o" href="#" title="Runtime"> <span className="badge"><TimeConverter runtime={runTime} /></span></a>
                                        <a className="fa fa-heart" href="#" title="Rating"> <span className="badge">{badge}</span></a>
                                    </div>
                                </div>

                                <h5 className="fw-m"><a href= {"shows/" + element.id} title="View more details">{element.name}</a></h5>

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
