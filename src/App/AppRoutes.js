import React, { Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from 'components/NavBar'
import Footer from 'components/Footer/Footer'
import {
    HomeView,
    PostJobView,
    JobDetailsView
} from 'views'

const AppRoutes = () =>
    <Router>
        <Fragment>
            <div className="cover"></div>
            <div className="content">
                <NavBar />
                <Route exact path="/" component={HomeView} />
                <Route exact path="/post" component={PostJobView} />
                <Route exact path="/job/:id" component={JobDetailsView} />
            </div>
            <Footer />
        </Fragment>
    </Router>

export default AppRoutes