import React from 'react';
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const Login = () => {
    const [creatUser, setCreateUser] = useState({ email: "", password: "" })
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:3001/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: creatUser.email, password: creatUser.password }),
                mode: 'cors'
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok. Status: ${response.status}`);
            }

            const json = await response.json();
          //  console.log(json);



            if (!json.success) {
                alert('Enter valid Creatials')
            }
            if (json.success) {
                localStorage.setItem("userEmail", creatUser.email)
                localStorage.setItem("authToken", json.authToken)
                navigate('/')
            }
        } catch (error) {
            alert('Enter valid Email and Password')
        }
    };




    const onChange = (e) => {
        setCreateUser({ ...creatUser, [e.target.name]: e.target.value })
    }

    return (
        <div style={{backgroundImage: 'url("https://wallpaperaccess.com/full/5305554.jpg")', height: '100vh', backgroundSize: 'cover' }}>
            <div className='container'>
                <form  className='w-50 m-auto border bg-dark border-success rounded' onSubmit={handleSubmit}>


                    <div className="m-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={creatUser.email} onChange={onChange} aria-describedby="emailHelp" />
                    </div>


                    <div className="m-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" value={creatUser.password} onChange={onChange} name='password' />
                    </div>
                    <button type="submit" className="m-3 btn btn-primary">Submit</button>
                    <Link to="/signup" className="m-3 btn btn-danger">I'am a new user</Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
