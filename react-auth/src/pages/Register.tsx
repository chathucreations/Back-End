import { useState, useEffect, SyntheticEvent } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';


const Register = () => {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [redirect, setRedirect] = useState(false);

    const navigate = useNavigate(); // Initialize the navigate function

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        const response = await axios.post('register', {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            password_confirm: passwordConfirm
        });

        console.log(response);

        setRedirect(true);


    };

    useEffect(() => {
        if (redirect) {
            navigate('/login');
        }
    }, [redirect, navigate]); // Trigger useEffect when 'redirects' changes

    return (
        <div>
            <form className="form-signin container" onSubmit={submit}>
                <h1 className='h3 mb-3 font-weight-normal'>Rigister</h1>

                <input type="text" className='form-control' placeholder='First Name' required
                    onChange={e => setFirstName(e.target.value)} />

                <input type="text" className='form-control' placeholder='Last Name' required style={{ marginTop: '10px' }}
                    onChange={e => setLastName(e.target.value)} />

                <input type="email" className='form-control' placeholder='Email' required style={{ marginTop: '10px' }}
                    onChange={e => setEmail(e.target.value)} />

                <input type="password" className='form-control' placeholder='Password' required style={{ marginTop: '10px' }}
                    onChange={e => setPassword(e.target.value)} />

                <input type="password" className='form-control' placeholder='Password Confirm' required style={{ marginTop: '10px' }}
                    onChange={e => setPasswordConfirm(e.target.value)} />

                <button className='btn btn-lg btn-primary btn-block' type='submit' style={{ marginTop: '10px' }}>Register</button>
            </form>

        </div>
    )
}

export default Register;