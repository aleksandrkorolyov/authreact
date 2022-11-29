import React, { useEffect, useState } from "react";
import "./Register.css"

const Register = () => {    

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
        const user = await registerUser({
            first_name: firstName,
            last_name: lastName,
            email: username,
            password
        });
        localStorage.setItem('token', user.token)
        console.log('Registred successfully');
        setTimeout('', 10000);
        window.location.href = '/dashboard'
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
                <label>
                    <p>First name</p>
                    <input type="text" onChange={e => setFirstName(e.target.value)} />
                </label>
                <label>
                    <p>Last name</p>
                    <input type="text" onChange={e => setLastName(e.target.value)} />
                </label>
                
                <label>
                    <p>Username (Email)</p>
                    <input type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
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