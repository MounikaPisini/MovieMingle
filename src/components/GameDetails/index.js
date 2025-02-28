import React, {Component} from 'react'
import axios from 'axios'
import { TailSpin } from 'react-loader-spinner'
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {FaRegSave} from 'react-icons/fa'
import SideNavbar from '../SideNavbar'
import TopNavbar from '../TopNavbar'
import './index.css'

class GameDetails extends Component {
  state = {
    videos: [],
    isLoading: true,
    error: null,
    liked: false,
    disliked: false,
    saved: false,
  }

  componentDidMount() {
    this.fetchMovie()
  }

  fetchMovie = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    try {
      const response = await axios.get(
        `https://games-data-api.vercel.app/games/${id}`,
      )
      this.setState({videos: response.data, isLoading: false})
    } catch (error) {
      this.setState({error: error.message, isLoading: false})
    }
  }

  likeBtnPressed = () => {
    this.setState(prevState => ({
      liked: !prevState.liked,
      disliked: false, // Ensure only one is selected at a time
    }))
  }

  unlikeBtnPressed = () => {
    this.setState(prevState => ({
      disliked: !prevState.disliked,
      liked: false, // Ensure only one is selected at a time
    }))
  }

  saveBtnPressed = () => {
    this.setState(prevState => ({
      saved: !prevState.saved,
    }))
  }

  renderContent() {
    const {isLoading, error, videos, liked, disliked, saved} = this.state

    if (isLoading) {
      return (
        <div className="loader-container">
          <TailSpin
  height={50}
  width={50}
  color="#00BFFF"
  ariaLabel="tail-spin-loading"
/>
        </div>
      )
    }

    if (error) {
      return <div>Error: {error}</div>
    }

    return (
      <div className="movie-details">
        <div className="trailer-container">
          <iframe
            title={videos.title}
            width="1000px"
            height="400"
            src={videos.gameVideo}
            frameBorder="0"
            allowFullScreen
            className="iframe"
          />
        </div>
        <div className="allDeatails">
          <div>
            <img
              src={videos.channel.profile_image_url}
              alt={videos.title}
              className="channelName"
            />
          </div>

          <div className="movie-deatils-down">
            <div className="details">
              <p className="videoTitle">{videos.title}</p>
              <p className="videoChanle">{videos.channel.name}</p>
              <div className="view-count">
                <p className="viewCount">{videos.view_count} Views</p>
                <p className="date">{videos.channel.no_of_subscribers}</p>
              </div>
            </div>
            <div className="like-dislike-save">
              <button
                onClick={this.likeBtnPressed}
                className={liked ? 'active' : ''}
                aria-label="Like"
              >
                <AiOutlineLike className="icon-l" />
              </button>
              <button
                onClick={this.unlikeBtnPressed}
                className={disliked ? 'active' : ''}
                aria-label="Dislike"
              >
                <AiOutlineDislike className="icon-d" />
              </button>
              <button
                onClick={this.saveBtnPressed}
                className={saved ? 'active' : ''}
                aria-label="Save"
              >
                <FaRegSave className="icon-s" />
              </button>
            </div>
          </div>
        </div>
        <div className="comments">
          <a href={videos.gameURL} className="play-button">
            Play Here
          </a>

          <h3>Comments</h3>
          {videos.comments.map(comment => (
            <div key={comment.name_of_viewer} className="comment-details">
              <div className="comment-user-prfile">
                <p>{comment.profile_image_url}</p>
              </div>
              <div className="comment-all-deatils">
                <p className="commentOne">{comment.name_of_viewer}</p>
                <p className="commentOne">{comment.how_much_days_ago}</p>
                <p className="commentOne">{comment.comment_description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="home-page">
        <TopNavbar />
        <SideNavbar />
        <div className="home-page1">{this.renderContent()}</div>
      </div>
    )
  }
}

export default GameDetails
