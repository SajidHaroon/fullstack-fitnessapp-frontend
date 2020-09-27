import React, {useState, useEffect} from 'react'
import moment from 'moment'
import { ButtonGroup, Button } from 'reactstrap'

import api from '../../services/api'
import './style.css'

export default function MyRegistrations() {
    const [myEvents, setMyEvents] = useState([])
    const [success, setSuccess] = useState(false)
    const [messageHandler, setMessageHandler] = useState('')
    const [error, setError] = useState(false)
    const user = localStorage.getItem('user')
    // const myRequests = localStorage.getItem('requests')

    useEffect(() => {

        
        getMyEvents()
        
        
    }, [success])

    

    const getMyEvents = async() => {
        try {
            const response = await api.get('/registration', {headers: {user}})
            console.log(response.data)
            setMyEvents(response.data)
        } catch(error) {
            console.log(error)
        }
    }

    const isApproved = (approved) => approved === true ? "Approved" : "Rejected"

    const acceptEventHandler = async(eventId) => {
        try {
            await api.post(`/registration/${eventId}/approvals`, {}, {headers: {user}})
            getMyEvents()
        } catch(error) {
            console.log(error)
        }
    }

    const rejectEventHandler = async(eventId) => {
        try {
            await api.post(`/registration/${eventId}/rejections`, {}, {headers: {user}})
            getMyEvents()
        } catch(error) {
            console.log(error)
        }
    }

    // const deleteRequestHandler = async (eventId) => {

    //     console.log("Delete button clicked", eventId)
        
    //     if (myRequests){
    //         const newArray = myEvents.filter((item) => item._id !== eventId)
    //         console.log("Array after deleting that event entry",newArray)
    //             setTimeout(() => {
    //                 setMyEvents(newArray)
    //                 localStorage.setItem('requests',newArray)
    //         }, 1000);
    //         console.log(myEvents)
    //         console.log('Modified localstorage request array is:', newArray)
    //     }
        
        
    //     // try {
    //     //     await api.delete(`/event/${eventId}`, {headers: {user}})
    //     //     setSuccess(true)
    //     //     setMessageHandler('Event deleted successfully')
    //     //     setTimeout(() => {
    //     //         setSuccess(false)
    //     //         category(null)
    //     //         setMessageHandler('')
    //     //     }, 2000);
    //     // } catch(error) {
    //     //     setError(true)
    //     //     setMessageHandler('Error deleting event!')
    //     //     setTimeout(() => {
    //     //         setError(false)
    //     //         setMessageHandler('')
    //     //     }, 2000);
    //     // }
    // }

    const deleteRequestHandler = async (eventId) => {
        try {
            setSuccess(true)
            await api.delete(`/registration/delevent/${eventId}`, {headers: {user}})
            setSuccess(true)
            setMessageHandler('Event deleted successfully')
            setTimeout(() => {
                setSuccess(false)
                setMessageHandler('')
            }, 1000);
        } catch(error) {
            
        }
    }



    return (
        <ul className="events">
            {myEvents.map(event => (
                <li key={event._id}>
                    <div><Button color="danger" size="sm" onClick={() => deleteRequestHandler(event._id)}>X</Button></div>
                    
                    <div><strong>{event.eventTitle}</strong></div>
                    <div className="events-details">
                        <span> Event Date: {moment(event.eventDate).format('LL')} </span>
                        <span> Event Price: €{parseFloat(event.eventPrice).toFixed(2)}</span>
                        <span> User Email: {event.userEmail}</span>
                        <span> Status: 
                            <span className={event.approved !== undefined ? isApproved(event.approved): "Pending"}>
                                {event.approved !== undefined ? isApproved(event.approved):  "Pending"}
                            </span>
                        </span>
                    </div>
                    <ButtonGroup>
                        <Button disabled={event.approved === true || event.approved === false ? true : false} color="primary" onClick={() => acceptEventHandler(event._id)}>Accept</Button>
                        <Button disabled={event.approved === true || event.approved === false ? true : false} color="danger" onClick={() => rejectEventHandler(event._id)}>Reject</Button>
                    </ButtonGroup>
                </li>
            ))}
        </ul>
    )
}