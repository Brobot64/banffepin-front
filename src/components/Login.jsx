import React from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, userInfo } from '../backies/schedulers';

const LoginScreen = () => {
  const [inputs, setInputs] = React.useState({ phone: '', password: '' });
  const [error, serError] = React.useState();
  const navigate = useNavigate();

  React.useEffect(() => {
    const tkn = localStorage.getItem('token');
    if (tkn) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await loginUser(inputs);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      const users = await userInfo(response.data.token);
      sessionStorage.setItem('user', JSON.stringify(users.data));
      serError('Logging Successful');
      setTimeout(() => {
        serError('');
        navigate('/dashboard');
      }, 5000);
    } else {
      serError('Error Logging In!!');
      setTimeout(() => {
        serError('');
        window.location.reload();
      }, 5000);
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
      {error && (<div style={{ width: 'fill-available', padding: '10px', textTransform: 'capitalize', backgroundColor: 'darkorange', borderRadius: '6px' }}>{error}</div>)}
        <h1>Login</h1>
        <div className="form-group">
          <label htmlFor="phone">Phone: </label>
          <input
            type="text"
            name="phone"
            value={inputs.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            type="password"
            name="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </form>
    </React.Fragment>
  );
};

export default LoginScreen;
