import React, {Component} from 'react'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import NotFound from '../NotFound'
import './index.css'

class Trending extends Component {
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
        'https://trending-api.vercel.app/trendVideos',
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

  render() {
    const {isLoading, error, searchQuery} = this.state
    const filteredVideos = this.getFilteredVideos()

    let content

    if (isLoading) {
      content = (
        <div className="loader-container">
          <TailSpin color="#00BFFF" height={80} width={80} />
        </div>
      )
    } else if (error) {
      content = <div>Error: {error}</div>
    } else if (filteredVideos.length === 0) {
      content = <NotFound />
    } else {
      content = (
        <ul className="allViewcard">
          {filteredVideos.map(video => (
            <Link
              to={`/trendVideos/${video.id}`}
              className="item-link"
              key={video.id}
            >
              <li>
                <div className="viewcard">
                  <img
                    src={video.thumbnail_url}
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

    return (
      <div className="home-page">
        <TopNavbar
          onChangeSearch={this.onChangeSearch}
          searchQuery={searchQuery}
        />
        <SideNavbar />
        <div className="home-page1">{content}</div>
      </div>
    )
  }
}

export default Trending
