import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'AIzaSyAYpeRLp6ZeBZ0smAS7Ye7cu2dvTJ8adoY';

//create a component that produces some html
class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videos: [],
            selectedVideo: null
           };

        this.videoSearch('surfboards');
        
    }


    //callback function for searching the videos
    //name the callback as videoSearch and pass the search term
    videoSearch(term)
    {
     //functionality to search the youtube video
     YTSearch({ key: API_KEY, term: term }, (videos ) => {
        this.setState({ 
            videos: videos,
        selectedVideo: videos[0]
        });
        //this.setState({ videos: videos }); 
        //advanced syntax: syntatic sugar applies only when the key & value are same

    });
    }
 


    render() {
        const videoSearch = _.debounce( (term) => { this.videoSearch(term) }, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} /> 
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo}) }
                videos={this.state.videos}  />
            </div>
        );
    }
}
//Take this component's genereated html and put it on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));;

