import React, { useEffect, useState } from "react";
import "./Register.css"

const Register = ({setToken}) => {    

    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(null);

    useEffect(() => {
        if(username && username.length > 3) {
            validateMail(username)
        }
    }, [username])

    const validateMail = (username) => {
        if(!isValidEmail(username)) {
            setError('Please enter correct email')
        } else {
            setError(null)
        }
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(firstName && lastName && username && password) {
        const user = await registerUser({
            first_name: firstName,
            last_name: lastName,
            email: username,
            password
        });
        setToken(user.token)

        window.location.href = '/dashboard'
    }
    }

    async function registerUser(creds) {

        return fetch('http://localhost:4001/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(creds)
        })
        .then(data => data.json())
    }

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

    return (
        <div className="register-wrapper">
            <h1>Create new account</h1>
            <form onSubmit={handleSubmit}>
                <label >
                    <p>First name</p>
                    </label>
                    <input type="text" onChange={e => setFirstName(e.target.value)} />
                    {!firstName && <span className="warn-notice">First name is required</span>}
               
                <label>
                    <p>Last name</p>
                    <input type="text" onChange={e => setLastName(e.target.value)} />
                    {!lastName && <span className="warn-notice">Last name is required</span>}
                </label>
                
                <label>
                    <p>Username (Email)</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                    {!username && <span className="warn-notice">Email is required</span>}
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                    {!password && <span className="warn-notice">Password is required</span>}
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
                {error &&  <p style={{color: 'red'}}>{error}</p>}
            </form>
        </div>
    )
}

export default Register