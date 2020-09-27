import React, { useState, useContext } from 'react'
import { Alert, Button, Form, FormGroup, Input, Container } from 'reactstrap'
// import { UserContext } from '../'
import api from '../../services/api'
import { UserContext } from '../../user-context'
import '../../App.css'

// Copied form reactstrap site under form components


// "React router history api"(below as an argument) is used to which help to navigate certain path
// https://developer.mozilla.org/en-US/docs/Web/API/History_API
// So if the login is successful, go to '/page----' page
const Login = ({history}) => {   
    // const {isLoggedIn, setIsLoggedIn} = useContext(UserContext)
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)                          // From user-context
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async event => {
        event.preventDefault()
        console.log('result of the submit', email, password)

        // api.post has same path as in backend>routes> LogIn route "routes.post('/login', LoginController.checkLogIn)"
        const response = await api.post('/login', {email,password}) // email and password is sent
        
        // '._id' is the ID in response you get from MongoDB after Check Login page. Check in insomnia
        //const userId = response.data._id || false    // if _id not there, then just set response as false
        const user = response.data.user || false           //JWT Changings
        const user_id = response.data.user_id || false           //JWT Changings


        try {
            //if (userId) {    // if userId exist, means successful user email password check confirmed
            if (user && user_id) {           //JWT Changings
                console.log('Nice. user exists')           //JWT Changings                            
                //localStorage.setItem('user',userId)       //JWT Changings
                localStorage.setItem('user',user)
                localStorage.setItem('user_id',user_id)
                setIsLoggedIn(true)                                             // From user-context
                history.push('/')    // Navigate the user to dashboard page
            }else {
                const  { message }= response.data               // If not successful, LoginController error message response will be returned as response.data
                setError(true)
                setErrorMessage(message)
                console.log(message)

                setTimeout(() => {
                    setError(false)
                    setErrorMessage('')
                }, 2000)
            }
            
        } catch (error) {                       //If server sends an error message
            setError(true)
            setErrorMessage(`Error, the server returned an error`)
            
        }

        // if (userId) {    // if userId exist, means successful user email password check confirmed
        //     console.log('Nice. user exists')                            
        //     localStorage.setItem('user',userId)
        //     history.push('/dashboard')    // Navigate the user to dashboard page
        // }else {
        //     const  { message }= response.data               // If not successful, LoginController error message response will be returned as response.data
        //     console.log(message)
        // }

    }

    return(
        <Container>
            <h2> Login: </h2>
            <p>Login to your account to see the events</p>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" onChange={event => setEmail(event.target.value)}/>
                </FormGroup>
                <FormGroup>
                    
                    <Input type="password" name="password" id="examplePassword" placeholder="Your password" onChange={event => setPassword (event.target.value)}/>
                </FormGroup>
                <div className="btnsgroup">
                    <FormGroup>
                        <Button className="submit-btn">LogIn</Button>
                    </FormGroup>
                    <FormGroup>
                        <Button className="secondary-btn" onClick={() => history.push('/register')}>Register</Button>
                    </FormGroup>            
                </div>
                
            </Form>
            {error ? (     // check from here:   https://reactstrap.github.io/components/alerts/
                <Alert color="danger" className="event-validation">
                    {errorMessage}
                </Alert>
            ): ''}
        </Container>
        
    )
}

export default Login






// import React, { useState } from 'react'
// import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

// import api from '../../services/api'

// const Register = ({history}) => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const [firstName, setFirstName] = useState('')
//     const [lastName, setLastName] = useState('')

//     const handleSubmit = async event => {
//         event.preventDefault()
// const response = await api.post('/user/register', {email, password, firstName, lastName})
//         const userId = response.data._id || false

//         if (userId) {
//             localStorage.setItem('user', userId)
//             history.push('/dashboard')
//         } else {
//             const { message } = response.data
//             console.log(message)
//         }
//     }

//     return (
//         <Form onSubmit={handleSubmit}>
//             <FormGroup>
// <Input type="text" name="firstName" id="firstName" placeholder="Your First Name" onChange={event => setFirstName(event.target.value)} />
//             </FormGroup>
//             <FormGroup>
//                 <Input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={event => setLastName(event.target.value)} />
//             </FormGroup>
//             <FormGroup>
// <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" onChange={event => setEmail(event.target.value)} />
//             </FormGroup>
//             <FormGroup>
//             <Input type="password" name="password" id="examplePassword" placeholder="Your Password" onChange={event => setPassword(event.target.value)} />
//             </FormGroup>
//             <Button>Submit</Button>
//         </Form>
//     )
// }

// export default Register