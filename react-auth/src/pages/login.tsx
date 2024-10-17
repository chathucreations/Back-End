import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = ({ setLogin }: { setLogin: Function }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);


    const navigate = useNavigate(); // Initialize the navigate function

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await axios.post('login', {
            email: email,
            password: password
        }, {
            withCredentials: true // This ensures the cookies are included
        });


        console.log(response);

        setRedirect(true);
        setLogin();


    };

    useEffect(() => {
        if (redirect) {
            navigate('/');
        }
    }, [redirect, navigate]); // Trigger useEffect when 'redirects' changes

    return (
        <div>
            <form className="form-signin container" onSubmit={submit}>
                <h1 className='h3 mb-3 font-weight-normal'>Please sign in</h1>

                <input type="email" className='form-control' placeholder='Email' required
                    onChange={e => setEmail(e.target.value)} />

                <input type="password" className='form-control' placeholder='Password' required style={{ marginTop: '10px' }}
                    onChange={e => setPassword(e.target.value)} />

                <div className="mb-3" style={{ marginTop: '10px' }}>
                    <Link to="/forgot" className="nav-link">Forgot Password</Link>
                </div>

                <button className='btn btn-lg btn-primary btn-block' type='submit' style={{ marginTop: '10px' }}>Sign In</button>
            </form>

        </div>
    )
}

export default Login;