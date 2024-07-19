import React from 'react'
import { createUser } from '../backies/schedulers';

const RegisterUser = () => {
    const [inputs, setInputs] = React.useState({});
    const [error, serError] = React.useState();
    const [disBtn, setDisBtn] = React.useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(inputs);
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = JSON.parse(sessionStorage.getItem('user'));
        const usertype = user ? user.usertype : null;
        setDisBtn(true);
        const response = await createUser(usertype, inputs);
        if (response.status === 200 || response.status === 201) {
          serError('User Created');
        } else if (response.status === 404) serError(response.data)
        else {
          serError('Unable to Create User!!');
        }
    
        setTimeout(() => {
          serError('');
        }, 5000);
      }

    const userTypes = ['admin', 'personal', 'agent', 'viewer'];
    const gender = ['male', 'female'];

  return (
    <React.Fragment>
        <form action="" onSubmit={handleSubmit}>
        {error && (<div style={{ width: 'fill-available', padding: '10px', textTransform: 'capitalize', backgroundColor: 'darkorange', borderRadius: '6px' }}>{error}</div>)}
            <h1>Create User</h1>
            <div className="form-group">
                <label htmlFor="">Name:</label>
                <input type="text" name='name' onChange={handleChange} />
            </div>
            
            <div className='flex'>
                <div className="form-group">
                    <label htmlFor="">Phone:</label>
                    <input type="text" name='phone' onChange={handleChange} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="">Gender:</label>
                    <select style={{ textTransform: 'capitalize' }} value={inputs.gender ? inputs.gender : ''} name='gender' onChange={handleChange}>
                        <option value='' disabled> == Select an option == </option>
                        {gender.map((item, index) => (
                        <option style={{ textTransform: 'capitalize' }} key={index} value={item}>
                            {item}
                        </option>
                        ))}
                    </select>
                </div>
            </div>
            
            <div className='flex'>
                <div className="form-group">
                    <label htmlFor="">Date of Birth:</label>
                    <input type="text" name='dob' onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="">Maiden Name:</label>
                    <input type="text" name='maiden_name' onChange={handleChange} />
                </div>
            </div>
            
            <div className="form-group">
                <label htmlFor="">Email:</label>
                <input type="text" name='email' onChange={handleChange} />
            </div>
            
            <div className="form-group">
                <label htmlFor="">Occupation:</label>
                <input type="text" name='occupation' onChange={handleChange} />
            </div>
            
            <div className="form-group">
                <label htmlFor="">Status:</label>
                <select style={{ textTransform: 'capitalize' }} value={inputs.usertype ? inputs.usertype : ''} name='usertype' onChange={handleChange}>
                    <option value='' disabled> == Select an option == </option>
                    {userTypes.map((item, index) => (
                    <option style={{ textTransform: 'capitalize' }} key={index} value={item}>
                        {item}
                    </option>
                    ))}
                </select>
            </div>
            
            <div className='flex'>
                <div className="form-group">
                    <label htmlFor="">Password:</label>
                    <input type="password" name='password' onChange={handleChange} />
                </div>
                
                <div className="form-group">
                    <label htmlFor="">Confirm Password:</label>
                    <input type="password" name='confirmPassword' onChange={handleChange} />
                </div>
            </div>

            <button disabled={disBtn}  type="submit">Create User</button>
        </form>
    </React.Fragment>
  )
}

export default RegisterUser