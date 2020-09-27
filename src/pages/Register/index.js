import React, { useState, useContext } from 'react'
import { Alert, Button, Form, FormGroup, Input, Container } from 'reactstrap'


import api from '../../services/api'
import { UserContext } from '../../user-context'

// Copied form reactstrap site under form components


// "React router history api"(below as an argument) is used to which help to navigate certain path
// https://developer.mozilla.org/en-US/docs/Web/API/History_API
// So if the login is successful, go to '/page----' page
const Register = ({history}) => {   
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)                   // From user-context
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName ] = useState('')
    const [lastName, setLastName] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()
        console.log('result of the submit', email, password)

        try {
            if ( email !== '' &&
                password !== '' &&
                firstName !== '' &&
                lastName !=='')
                {
                    const response = await api.post('/user/register', {email,password, firstName, lastName}) 
                    //const userId = response.data._id || false           
                    const user = response.data.user || false           // JWT changes
                    const user_id = response.data.user_id || false           // JWT changes

                    if (user && user_id) { 
                        //console.log(`User by name: ${firstName} created.`)                            
                        localStorage.setItem('user',user)   // JWT changes
                        localStorage.setItem('user_id',user_id)  // JWT changes
                        setIsLoggedIn(true)                    // From user-context
                        history.push('/')    
                    }else {
                        const  { message }= response.data               
                        console.log(message)
                        setError(true)
                        setErrorMessage(message)

                        setTimeout(() => {
                            setError(false)
                            setErrorMessage('')
                        }, 2000);
                    }
            } else {
                setError(true)
                setErrorMessage('Inputs Missing')
    
                setTimeout(() => {
                    setError(false)
                    setErrorMessage('')
                }, 2000);

            }
        } catch (error) {
            Promise.reject(error)
        }

    }
    
    return(
        <Container>
            <h2> Register: </h2>
            <p>Please <strong>register</strong> for a new account.</p>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input type="text" name="firstName" id="lastName" placeholder="Your First Name" onChange={event => setFirstName(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={event => setLastName(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" onChange={event => setEmail(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" id="examplePassword" placeholder="Your password" onChange={event => setPassword (event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    <Button className="submit-btn">Register</Button>
                </FormGroup>
                <FormGroup>
                    <Button className="secondary-btn" onClick={() => history.push('/login')}>Already registered?</Button>
                </FormGroup> 
            </Form>
            {error ? (                                              // check from here:   https://reactstrap.github.io/components/alerts/
                <Alert color="danger" className="event-validation">
                    {errorMessage}
                </Alert>
            ): ''}
        </Container>
    )
}

export default Register



// {-----Old block 
// // api.post has same path as in backend>routes> Register user route "routes.post('/user/register', UserController.createUser)"
// const response = await api.post('/user/register', {email,password, firstName, lastName}) 
            
// // '._id' is the ID in response you get from MongoDB after Check Login page. Check in insomnia
// const userId = response.data._id || false    // if _id not there, then just set response as false

// if (userId) {    // if userId exist, means successful user email password check confirmed
//     console.log(`User by name: ${firstName} created.`)                            
//     localStorage.setItem('user',userId)
//     history.push('/dashboard')    // Navigate the user to dashboard page
// }else {
//     const  { message }= response.data               // If not successful, LoginController error message response will be returned as response.data
//     console.log(message)
// }
// ------------Old Block -----}