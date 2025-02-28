import React, {Component} from 'react'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import NotFound from '../NotFound'
import './index.css'

class Home extends Component {
  state = {
    videos: [],
    isLoading: true,
    error: null,
    searchQuery: '',
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    try {
      const response = await axios.get(
        'https://movies-data-api.vercel.app/movies/',
      )
      this.setState({videos: response.data, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  onChangeSearch = event => {
    this.setState({searchQuery: event.target.value})
  }

  getFilteredVideos = () => {
    const {videos, searchQuery} = this.state
    return videos.filter(video =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }

  renderContent = () => {
    const {error} = this.state
    const filteredVideos = this.getFilteredVideos()

    if (error) {
      return <div>Error: {error}</div>
    }

    if (filteredVideos.length === 0) {
      return <NotFound />
    }

    return (
      <ul className="allViewcard">
        {filteredVideos.map(video => (
          <Link to={`/movies/${video.id}`} className="item-link" key={video.id}>
            <li>
              <div className="viewcard">
                <img
                  src={video.movie_img}
                  alt={video.channel.name}
                  className="movie_img"
                />

                <div className="allDeatails">
                  <div>
                    <img
                      src={video.channel.profile_image_url}
                      alt={video.channel.name}
                      className="channelName"
                    />
                  </div>
                  <div className="details">
                    <p className="videoTitle">{video.title}</p>
                    <p className="videoChanle">{video.channel.name}</p>
                    <div className="view-count">
                      <p className="viewCount">{video.view_count} Views</p>
                      <p className="date">{video.published_at}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading, searchQuery} = this.state

    return (
      <div className="home-page">
        <TopNavbar
          onChangeSearch={this.onChangeSearch}
          searchQuery={searchQuery}
        />
        <SideNavbar />
        <div className="home-page1">
          {isLoading ? (
            <div className="loader-container">
              <TailSpin color="#00BFFF" height={80} width={80} />
            </div>
          ) : (
            this.renderContent()
          )}
        </div>
      </div>
    )
  }
}

export default Home
