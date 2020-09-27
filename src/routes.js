import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Login from './pages/Login/index'
import Dashboard from './pages/Dashboard/index'
import Register from './pages/Register'
import EventsPage from './pages/EventsPage'
import TopNav from './components/TopNav'
import MyRegistrations from './pages/MyRegistrations'

export default Routes => {
    return (
        <BrowserRouter>
            <TopNav />
            <Switch>
                <Route path='/' exact component={Dashboard} />
                <Route path='/myregistrations' exact component={MyRegistrations} />
                <Route path='/register' exact component={Register}/>
                <Route path='/login' exact component={Login} />
                <Route path='/events' component={EventsPage}/>
                
            </Switch>
        </BrowserRouter>
    )
}