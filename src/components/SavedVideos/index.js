import React, {Component} from 'react'
import TopNavbar from '../TopNavbar'
import SideNavbar from '../SideNavbar'
import './SavedVideos.css'

class SavedVideos extends Component {
  render() {
    return (
      <div className="home-page">
        <TopNavbar />
        <SideNavbar />
        <div className="home-page1">
          <img
            src="https://img.freepik.com/free-vector/no-data-concept-illustration_114360-616.jpg?w=740&t=st=1716616048~exp=1716616648~hmac=58ef78023efb056e34fe1ab56a5f9ec07ec517e2b6c54daeccda55d403e1e3c1"
            className="no-data"
          />
        </div>
      </div>
    )
  }
}

export default SavedVideos
