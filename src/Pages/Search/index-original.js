import React, { Component} from 'react';
import MoviesList from '../../components/MoviesList';

class Movies extends Component {  
    state = {
        series: []
    }

    // componentDidMount() {
    //   const series = ["Vikings", "Game of Thrones"]
    //   // setState tells React that this component and it's children
    //   // need to be re-rendered with updated state
        
    //   setTimeout(() => {
    //     this.setState({ series: series});
    //   }, 200);
    // }

    componentDidMount() {
        fetch('http://api.tvmaze.com/search/shows?q=alien')
        
        //.then(response => {console.log(response)}) // to show the response Object
        // Parse the result and get the .json from the Object
        .then(response => response.json()) // return json from response object
        
        //.then(json => console.log({ json }));
        .then(json => this.setState({ series: json })); // add series to the series property of our state
    }

    render() { 
        return (
            <div className='container'>
                <div className='row mb-2'>
                    {/* The length of series array = {this.state.series.length} */}
                    <MoviesList list={this.state.series} />
                </div>
            </div>
        )
    }
}

export default Movies;
