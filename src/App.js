import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import HomeDetails from './components/HomeDetails'

import Movies from './components/Movies'
import MovieDetails from './components/MovieDetails'

import Games from './components/Games'
import GameDetails from './components/GameDetails'

import Courses from './components/Courses'
import CoursesDetails from './components/CoursesDetails'

import SavedVideos from './components/SavedVideos'

import Trending from './components/Trending'
import TrendingDetails from './components/TrendingDetails'
import Sports from './components/Sports'
import NotFound from './components/NotFound'

import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute exact path="/videos/:id" component={HomeDetails} />
        <ProtectedRoute exact path="/movies" component={Movies} />
        <ProtectedRoute exact path="/movies/:id" component={MovieDetails} />
        <ProtectedRoute exact path="/games" component={Games} />
        <ProtectedRoute exact path="/games/:id" component={GameDetails} />
        <ProtectedRoute exact path="/courses" component={Courses} />
        <ProtectedRoute exact path="/courses/:id" component={CoursesDetails} />
        <ProtectedRoute exact path="/trending" component={Trending} />
        <ProtectedRoute
          exact
          path="/trendVideos/:id"
          component={TrendingDetails}
        />
        <ProtectedRoute exact path="/Sports" component={Sports} />
        <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
        <Route component={NotFound} />
      </Routes>
    </div>
  </BrowserRouter>
)

export default App
