import React from 'react'
import { createTelcoProvider } from '../backies/schedulers';

const CreateTelco = ({ schedulers }) => {
    const [inputs, setInputs] = React.useState({});
    const [error, serError] = React.useState();
    const [disBtn, setDisBtn] = React.useState(false);
    const countries = ['NG', 'LB', 'CN'];
  
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'plan') {
            setInputs({
                ...inputs,
                schedule: {
                    ...inputs.schedule,
                    plan: value
                }
            });
        } else {
            setInputs({
                ...inputs,
                [name]: value
            });
        }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setDisBtn(true);
      const response = await createTelcoProvider(inputs);
      if (response.status === 200 || response.status === 201) {
        serError('Telco Created');
      } else {
        serError('Unable to Create TelcoProvider!!');
      }
  
      setTimeout(() => {
        serError('');
      }, 5000);
    }
  
    return (
      <React.Fragment>
          <form onSubmit={handleSubmit}>
            {error && (<div style={{ width: 'fill-available', padding: '10px', textTransform: 'capitalize', backgroundColor: 'darkorange', borderRadius: '6px' }}>{error}</div>)}
              <h1>Create Telco</h1>
              <div className="form-group">
                  <label htmlFor="">Name:</label>
                  <input type="text" name='name' onChange={handleChange} />
              </div>

              <div className="form-group">
                  <label htmlFor="">FTPUrl:</label>
                  <input type="text" name='ftpUrl' onChange={handleChange} />
              </div>

              <div className="form-group">
                  <label htmlFor="">LocalPath: </label>
                  <input type="text" name='localPath' onChange={handleChange} />
              </div>

              <div className="form-group">
                  <label htmlFor="">Schedules: </label>
                  <select value={inputs.schedule ? inputs.schedule : ''} name='schedule' onChange={handleChange}>
                        <option value='' disabled> == Select an option == </option>
                        {schedulers.map((item) => (
                            <option key={item.id} value={item._id}>
                            {`${item.plan}/${item.timeString}s`}
                            </option>
                        ))}
                    </select>
              </div>

              <div className="form-group">
                  <label htmlFor="">Country: </label>
                  <select value={inputs.country ? inputs.country : ''} name='country' onChange={handleChange}>
                        <option value='' disabled> == Select an option == </option>
                        {countries.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                        ))}
                    </select>
              </div>
  
              <button disabled={disBtn}  type="submit">Create Telco</button>
          </form>
      </React.Fragment>
    )
}

export default CreateTelco