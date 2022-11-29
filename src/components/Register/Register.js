import React, { useState } from "react";
import "./Register.css"

const Register = () => {

    // {username && <p>{username}</p>} 
    

    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    return (
        <div className="register-wrapper">
            <h1>Create new account</h1>
            <form>
                <label>
                    <p>Username (Email)</p>
                    <input type="text" onChange={e => e.target.value.length > 3 && setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Register