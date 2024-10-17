import axios from "axios";
import React, { SyntheticEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';


const Reset = () => {

    const [password, setPassword] = useState('');
    const [password_confirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { token } = useParams<{ token: string }>(); 


    const navigate = useNavigate(); // Initialize the navigate function


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        
        try {
            await axios.post('reset', {
                token,
                password,
                password_confirm: password_confirm

            });

            setRedirect(true);


        } catch (e) {

        }





    };


    useEffect(() => {
        if (redirect) {
            navigate('/login');
        }
    }, [redirect, navigate]); // Trigger useEffect when 'redirects' changes



    return (
        <div>
            <form className="form-signin container" onSubmit={submit}>


                <h1 className='h3 mb-3 font-weight-normal'> Reset Password </h1>

                <input type="password" className='form-control' placeholder='Password' required
                    onChange={e => setPassword(e.target.value)} />

                <input type="password_confirm" className='form-control' placeholder='Password Confirm' required style={{ marginTop: '10px' }}
                    onChange={e => setPasswordConfirm(e.target.value)} />

                <button className='btn btn-lg btn-primary btn-block' type='submit' style={{ marginTop: '10px' }}>Reset</button>
            </form>

        </div>
    )
}

export default Reset;