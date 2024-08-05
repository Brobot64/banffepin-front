import React, { useState, useEffect } from 'react';
import ResponseDisp from './ResponseDisp';
import { useNavigate } from 'react-router-dom';
import { loginUser, userInfo } from '../../backies/schedulers';
import Loader from './Loader';

const LoginComp = () => {
    const [inputs, setInputs] = useState({ phone: '', password: '' });
    const [error, setError] = useState('');
    const [resSta, setResStat] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
          ...inputs,
          [name]: value
        });
    };

    const isFormValid = inputs.phone.trim() !== ''; //&& inputs.password.trim() !== '';
    // console.log("valiform: ", isFormValid)

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = sessionStorage.getItem('user')
        if (token && user) {
          navigate('/mobile/');
        } else {
            navigate('/')
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await loginUser(inputs);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const users = await userInfo(response.data.token);
                sessionStorage.setItem('user', JSON.stringify(users.data));
                setResStat(false);
                setError('Logging Successful');
                setTimeout(() => {
                    setError('');
                    navigate('/mobile');
                }, 2000);
            } else {
                setError('Error Logging In!!');
                setResStat(true);
                setTimeout(() => {
                    setError('');
                }, 5000);
            }
        } catch (err) {
            setError('Error Logging In!!');
            setResStat(true);
            setTimeout(() => {
                setError('');
            }, 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <React.Fragment>
            {loading && <Loader />}
            <div className='remadelogin'>
                <img src="/bafblue.png" alt="banffpay logo" />
                <form onSubmit={handleSubmit}>
                    {error && <ResponseDisp isError={resSta} msg={error} />}
                    <div>
                        <label>Phone Number *</label>
                        <div className="inputplt">
                            <div>
                                <img src="/naij.png" alt="banffpay naija" />
                                <span>+234</span>
                            </div>
                            <input
                                type="text"
                                name='phone'
                                value={inputs.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label>Password *</label>
                        <input
                            type="password"
                            name='password'
                            value={inputs.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button disabled={!isFormValid} type='submit'>Login</button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default LoginComp;
