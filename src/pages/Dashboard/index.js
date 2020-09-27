// //https://reactstrap.github.io/components/buttons/
// //https://reactstrap.github.io/components/form/

// import React, { useEffect, useState, useMemo } from 'react'
// import moment from 'moment'                     //https://momentjs.com/
// import './dashboard.css'
// import socketio from 'socket.io-client'

// import api from '../../services/api'
// import { Button, ButtonGroup, Alert, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

// const Dashboard = ({history}) => {
//     const user_id = localStorage.getItem('user_id')
//     const user = localStorage.getItem('user')     // after JWT Settings

//     const [events, setEvents] = useState([])
//     const [error, setError] = useState(false)
//     const [errorMessage, setErrorMessage] = useState('')
//     const [success, setSuccess] = useState(false)
//     const [messageHandler, setMessageHandler] = useState('')
//     const [eventsRequests, setEventsRequests] = useState('')
//     const [dropDownOpen, setdropDownOpen] = useState(false)

//     const toggle = ()  => setdropDownOpen(!dropDownOpen)

    

//     useEffect(() => {
        
//         getEvents()
//     }, [])

//     // const socket = useMemo(() => socketio('http://localhost:8000', { query: { user: user_id}}), [user_id])
    
//     // useEffect(() => {
//     //     // socket.on('mojo', response => console.log(response))
//     //     socket.on('registration_request', response => setEventsRequests([...eventsRequests, response]))
//     // }, [eventsRequests, socket])


//     const socket = useMemo(() => socketio('http://localhost:8000', { query: { user: user_id}}), [user_id]) // user_id as Input at the end
//     useEffect(() => {
//         //const socket = socketio('http://localhost:8000', { query: { user: user_id}})    // Used in useMemo 
//         // socket.on('mojo', response => console.log(response))
//         // socket.on('registration_request', response => console.log(response))
//         socket.on('registration_request', response => setEventsRequests([...eventsRequests, response]))
//     }, [eventsRequests, socket])



//     // useEffect(() => {
//     //     // socket.on('mojo', response => console.log(response))
//     //     socket.on('registration_request', response => setEventsRequests([...eventsRequests, response]))
//     // }, [eventsRequests, socket])


//     //To search by category name in filter panel
//     const category = (query) => {
//         getEvents(query)
//     }

//     const myEventsHandler = async () => {
//         try {
//             const response = await api.get('/user/events', { headers: {user}})
//             // console.log(response.data.events)
//             setEvents(response.data.events)
//         } catch(error) {
//             history.push('login')
//         }
//     }

//     const logOutHandler =()=>{
//         localStorage.removeItem('user')
//         localStorage.removeItem('user_id')
//         history.push('/login')
//     }

//     const registrationRequestHandler = async(event) => {
//         try {
//             await api.post(`/registration/${event.id}`, {}, {headers: {user}} )
//             setSuccess(true)
//             console.log("Registered for the event")
//             setMessageHandler(`Successfully registered to event ${event.title}`)
//             setTimeout(() => {
//                setSuccess(false) 
//                category(null)    // This will bring back all events. which means reload the page
//                setMessageHandler('')
//             }, 2000);
            
//         } catch (error) {
//             setError(true)
//             setMessageHandler(`Could not register to event ${event.title}`)
//             setTimeout(() => {
//                 setError(false)
//                 setMessageHandler('')
//             }, 2000);
            
//         }
        
        
//     }

//     const deleteEventHandler = async(eventId) => {
//         try {
//             await api.delete(`/event/${eventId}`, {headers: {user}})
//             console.log("CONSOLE MSG: Event deleted")
//             setSuccess(true)
//             setMessageHandler('Event deleted successfully')
//             setTimeout(() => {
//                setSuccess(false) 
//                category(null)    // This will bring back all events. which means reload the page
//                setMessageHandler('')
//             }, 2000);
            
//         } catch (error) {
//             setError(true)
//             setMessageHandler('Error deleting event!')
//             setTimeout(() => {
//                 setError(false)
//                 setMessageHandler('')
//             }, 2000);
            
//         }
//     }


//     const getEvents = async(params) => {        
//         try {                                           // Here if user and user_id not matched, then kick out the user
//             const url = params ? `/dashboard/${params}` : `/dashboard`      // If userId param is entered, get events by userId ELSE just all
//             //const response = await api.get(url, {headers: {user_id}})       // just url or include user_id in the header
//             const response = await api.get(url, {headers: {user}})    // after JWT settings {headers: {user_id}}) changed to {headers: {user}})
//             console.log(response.data)
//             setEvents(response.data.events)
        
//         }catch (error) {
//             history.push('login')   
//         }               

//     }


//     return (
//         <>
//             <ul className="notifications">
//                 {eventsRequests.map(request => {
//                     console.log(request)
//                     return (
//                         <li key={request.id}>
//                             <div>
//                                 <strong>{request.user.email}</strong> is requesting to register to your event: <strong>{request.event.title}</strong>
//                             </div>
//                             <ButtonGroup>
//                                 <Button color="secondary" onClick={() => {}}>Accept</Button>
//                                 <Button color="danger" onClick={() => {}}>Reject</Button>
//                             </ButtonGroup>
//                         </li>
//                     )
//                 })}  
//             </ul>
//             <div className="filter-panel">
            
//                 <Dropdown isOpen={dropDownOpen} toggle={toggle}>
//                     <DropdownToggle caret>
//                         Filter
//                         </DropdownToggle>
//                     <DropdownMenu>
//                         <DropdownItem color="primary" onClick={() => category(null)} active={category === null}>All</DropdownItem>
//                         <DropdownItem color="primary" onClick={() => category('running')} active={category === 'running'}>Running</DropdownItem>
//                         <DropdownItem color="primary" onClick={() => category('climbing')} active={category === 'climibing'}>Climbing</DropdownItem>
//                         <DropdownItem color="primary" onClick={() => category('exercise')} active={category === 'exercise'}>Exercise</DropdownItem>
//                         <DropdownItem color="primary" onClick={() => category('test')} active={category === 'test'}>Other</DropdownItem>
//                         <DropdownItem className="secondary-btn" onClick={myEventsHandler}>My Events</DropdownItem>
//                     </DropdownMenu>
//                 </Dropdown>
//                 {/* <ButtonGroup>
//                     <Button color="primary" onClick={() => category(null)} active={category === null}>All</Button>
//                     <Button color="primary" onClick={() => category('running')} active={category === 'running'}>Running</Button>
//                     <Button color="primary" onClick={() => category('climbing')} active={category === 'climibing'}>Climbing</Button>
//                     <Button color="primary" onClick={() => category('exercise')} active={category === 'exercise'}>Exercise</Button>
//                     <Button color="primary" onClick={() => category('test')} active={category === 'test'}>Other</Button>
//                     <Button className="secondary-btn" onClick={myEventsHandler}>My Events</Button>
//                 </ButtonGroup> */}
                
//                 {/* <ButtonGroup>
//                     <Button className="secondary-btn" onClick={() => history.push('/events')}>Create Event</Button>        
//                 </ButtonGroup>
//                 <ButtonGroup>
//                     <Button className="secondary-btn" onClick={logOutHandler}>Log Out</Button>        
//                 </ButtonGroup> */}
//             </div>
//             <ul className="events-list">
//                 {events.map (event => 
//                     <li key={event._id}>
//                         <header style={{ backgroundImage: `url(${event.thumbnail_url})`}}/>
//                         {/* <p>{event.user}</p>
//                         // Get events by the user who has logged in--means id in local storage */}
//                         {event.user === user_id ? <div><Button color="danger" onClick={() => deleteEventHandler(event._id)} title="Click to delete">X</Button></div> : ''} 

//                         <strong>{event.title}</strong>
//                         <span>Date: {moment(event.date).format('LL') }</span>
//                         <span>Price: {parseFloat(event.price).toFixed(2)}</span>
//                         <span>Description: {event.description}</span>
//                         <span>Category: {event.category}</span>
//                         <Button className="submit-btn" onClick={() => {registrationRequestHandler(event)}}>Register</Button>
//                     </li>
//                 )}
//             </ul>
//             {error ? (                                              // check from here:   https://reactstrap.github.io/components/alerts/
//                 <Alert color="danger" className="event-validation">
//                     {messageHandler}
//                 </Alert>
//             ): ''}
            
//             {success ? (                                              // check from here:   https://reactstrap.github.io/components/alerts/
//                 <Alert color="success" className="event-validation">
//                     {messageHandler}
//                 </Alert>
//             ): ''}
//         </>
        
//     )
// }

// export default Dashboard


// import React, {useEffect, useState} from 'react'
// //import moment from 'moment'

// import api from '../../services/api'
// //import './dashboard.css'
// import { Button } from 'reactstrap'

// export default Dashboard => {
//     const user_id = localStorage.getItem('user')

//     const [events, setEvents] = useState([])

//     useEffect (() => {
//         getEvents()
//         console.log('dashboard loded')
//     }, [])

//     const getEvents = async(params) => {
//         const url = params ? `/events/${params}` : '/events'
//         const response = await api.get(url, {headers: {user_id}})
//         console.log(response.data)
//         setEvents(response.data)
//     }
//     return (
//         <ul className="events-list">
//             {events.map(event => 
//             <li key={event._id}>
//             <header style= {{ backgroundImage: `url(${event.thumbnail_url})`}} />
//             <strong>{event.title}</strong>
//             {/* <span>Date: {moment(event.date).format('LL')}</span> */}
//             <span>Price: {event.price}</span>
//             <span>Description: {event.description}</span>
//             <Button className="submit-btn">Subscribe</Button>
//             </li>
//             )}
//         </ul>
//     )
// }






import React, {useEffect, useState, useMemo} from 'react'
import moment from 'moment'
import socketio from 'socket.io-client'

import api from '../../services/api'
import './dashboard.css'
import { Alert, Button, ButtonGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap'

const Dashboard = ({history}) => {
    const user_id = localStorage.getItem('user_id')
    const user = localStorage.getItem('user')

    const [events, setEvents] = useState([])
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [eventsRequests, setEventsRequests] = useState([])
    const [dropdownOpen, setdropDownOpen] = useState(false)
    const [eventRequestMessage, setEventRequestMessage] = useState('')
    const [eventRequestSuccess, setEventRequestSuccess] = useState(false)
    const [myUserEvents, setMyUserEvents] = useState([])
    // const [eventRejecttMessage, setEventRejectMessage] = useState('')
    // const [eventRequestSuccess, setEventRequestSuccess] = useState(false)

    const toggle = () => setdropDownOpen(!dropdownOpen)

    useEffect (() => {
        getEvents()
    }, [])
    
    const socket = useMemo(() => socketio('https://fullstack-fitnessapp-backend.herokuapp.com', { query: { user: user_id}}), [user_id])
    
    useEffect(() => {
        // socket.on('mojo', response => console.log(response))
        socket.on('registration_request', response => setEventsRequests([...eventsRequests, response]))
    }, [eventsRequests, socket])

    const category = (query) => {
        getEvents(query)
    }

    const myEventsHandler = async () => {
        try {
            const response = await api.get('/user/events', { headers: {user}})
            
            const allEvents = response.data.events
            const myEvents = allEvents.filter(event => event.user === user_id)
            setEvents(myEvents)
        } catch(error) {
            history.push('login')
        }
    }

    const deleteEventHandler = async (eventId) => {
        try {
            await api.delete(`/event/${eventId}`, {headers: {user}})
            setSuccess(true)
            setMessageHandler('Event deleted successfully')
            setTimeout(() => {
                setSuccess(false)
                category(null)
                setMessageHandler('')
            }, 2000);
        } catch(error) {
            setError(true)
            setMessageHandler('Error deleting event!')
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000);
        }
    }

    const getEvents = async(params) => {
        try {
            const url = params ? `/dashboard/${params}` : '/dashboard'
            const response = await api.get(url, {headers: {user}})
    
            console.log(response.data)
            setEvents(response.data.events)
        } catch {
            history.push('login')
        }
    }

    const registrationRequestHandler = async(event) => {
        console.log('Clicked')
        try {
            await api.post(`/registration/${event.id}`, {}, {headers: {user}})
            setSuccess(true)
            setMessageHandler(`Successfully registered to event ${event.title}`)
            console.log('Registeration request sent')
            setTimeout(() => {
                setSuccess(false)
                category(null)
                setMessageHandler('')
            }, 2000);
        } catch(error) {
            setError(true)
            setMessageHandler(`Could not register to event ${event.title}`)
            console.log('Failed')
            setTimeout(() => {
                setError(false)
                setMessageHandler('')
            }, 2000);
        }
    }

    const removeNotificationFromDashboard = (eventId) => {
        const newEvents = eventsRequests.filter((event) => event._id !== eventId) 
        setEventsRequests(newEvents)
    }


    const acceptEventHandler = async(eventId) => {
        try {
            await api.post(`/registration/${eventId}/approvals`, {}, {headers: {user}})
            setEventRequestSuccess(true)
            setEventRequestMessage(`Request approved successfully`)
            console.log('Registered:Request approved')
            removeNotificationFromDashboard(eventId)
            setTimeout(() => {
                setEventRequestSuccess(false)
                setEventRequestMessage('')
            }, 2000);
        } catch(error) {
            console.log(error)
        }
    }


    const rejectEventHandler = async(eventId) => {
        try {
            await api.post(`/registration/${eventId}/rejections`, {}, {headers: {user}})
            setEventRequestSuccess(true)
            setEventRequestMessage(`Request rejected successfully`)
            console.log('Request rejected')
            removeNotificationFromDashboard(eventId)
            setTimeout(() => {
                setEventRequestSuccess(false)
                setEventRequestMessage('')
            }, 2000);
        } catch(error) {
            console.log(error)
 
        }
    }



    // TODO: Add logout button next to Create Event
    // TODO: Onclick it should trigger logoutHandler function
    // TODO: logoutHandler function will kick users out of the session
    // TODO: Push to login page

    return (
        <>
        {eventRequestSuccess ? (
            <Alert color="success" className="event-validation"> {eventRequestMessage} </Alert>
        ) : ''}
        <ul className="notifications">
            {eventsRequests.map(request => {
                console.log(request)
                return (
                    <li key={request._id}>
                        <div>
                            <strong>{request.user.email}</strong> is requesting to register to your event: <strong>{request.event.title}</strong>
                        </div>
                        <div className="regrequestbtns">
                            <ButtonGroup className="reqsbtns">
                                <Button color="secondary" onClick={() => { acceptEventHandler(request._id) }}>Accept</Button>
                                <Button color="danger" onClick={() => { rejectEventHandler(request._id) }}>Reject</Button>
                            </ButtonGroup>
                        </div>
                    </li>
                )
            })}  
        </ul>
            <div className="filter-panel">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        Filter
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem color="primary" onClick={() => category(null)} active={category === null}>All</DropdownItem>
                        <DropdownItem onClick={myEventsHandler}>My Events</DropdownItem>
                        <DropdownItem color="primary" onClick={() => category('running')} active={category === 'running'}>Running</DropdownItem>
                        <DropdownItem color="primary" onClick={() => category('climbing')} active={category === 'climbing'}>Climbing</DropdownItem>
                        <DropdownItem color="primary" onClick={() => category('exercise')} active={category === 'exercise'}>Exercise</DropdownItem>
                        <DropdownItem color="primary" onClick={() => category('other')} active={category === 'other'}>Other</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
            <ul className="events-list">
                {events.map(event => 
                <li key={event._id}>
                <header style= {{ backgroundImage: `url(${event.thumbnail_url})`}}>
                    {event.user === user_id ? 
                    <div><Button color="danger" size="sm" onClick={() => deleteEventHandler(event._id)}>x</Button></div> 
                    : ''}  
                </header>
                <strong>{event.title}</strong>
                <span>Date: {moment(event.date).format('LL')}</span>
                <span>Price: {parseFloat(event.price).toFixed(2)}</span>
                <span>Description: {event.description}</span>
                <Button className="submit-btn" onClick={()=> {registrationRequestHandler(event)}}>Register</Button>
                </li>
                )}
            </ul>
            {error ? (
                <Alert color="danger" className="event-validation">{messageHandler}</Alert>
            ) : ''}
            {success ? (
                <Alert color="success" className="event-validation"> {messageHandler} </Alert>
            ) : ''}
        </>
    )
}

export default Dashboard




// Logins
// {    john@example.com
//     "user": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNTcxNGFkYWM1NmY2MWY3MDkyMmI4OCIsImVtYWlsIjoiam9obkBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSJ9LCJpYXQiOjE2MDAwOTQwMjB9.D39jMwZ6SX8O2WQdCcCcRhZq6mDN6FvrY-vfUSdfZE8",
//     "user_id": "5f5714adac56f61f70922b88"
// }

// {    name@example.com
//     "user": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNTA3NGE0MjI3OTc1MmVjNDYxYWMzMiIsImVtYWlsIjoibmFtZUBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6IkpvaG4iLCJsYXN0TmFtZSI6IkRvZSJ9LCJpYXQiOjE2MDAxMDIxNzN9.LwGiTvMKlPJvNd1jqNH_MPfSxDb52oQWDWEw-exDWB8",
//     "user_id": "5f5074a42279752ec461ac32"
//   }




