import axios from "axios";
import React, { SyntheticEvent, useState } from "react";

const Forgot = () => {

    const [email, setEmail] = useState('');
    const [notify, setNotify] = useState({
        show: false,
        error: false,
        message: ''
    });



    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await axios.post('forgot', {
                email: email
            });
            
            
            setNotify({
                show: true,
                error: false,
                message: 'Email was sent !'
            })

        } catch (e) {
            setNotify({
                show: true,
                error: true,
                message: 'Email Does not was sent !' + e
            })
        }





    };


    let info;
    if (notify.show) {

        info = (
            <div className={notify.error ? 'alert alert-danger' : 'alert alert-success'} role="alert">{notify.message}</div>
        )
    }



    return (
        <div>
            <form className="form-signin container" onSubmit={submit}>

                {info}
                <h1 className='h3 mb-3 font-weight-normal'>Please enter email</h1>

                <input type="email" className='form-control' placeholder='Email' required
                    onChange={e => setEmail(e.target.value)} />

                <button className='btn btn-lg btn-primary btn-block' type='submit' style={{ marginTop: '10px' }}>Send Email</button>
            </form>

        </div>
    )
}

export default Forgot;