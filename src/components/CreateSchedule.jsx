import React from 'react'
import { createScheduler } from '../backies/schedulers';

const CreateSchedule = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = user ? user.id : null;
  const [inputs, setInputs] = React.useState({ user: userId });
  const [error, serError] = React.useState();
  const [disBtn, setDisBtn] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisBtn(true);
    const response = await createScheduler(inputs);
    if (response.status === 200 || response.status === 201) {
      serError('Scheduler Created');
      setInputs();
    } else {
      serError('Unable to create scheduler!!');
    }

    setTimeout(() => {
      serError('');
    }, 5000);
  }

  return (
    <React.Fragment>
        <form onSubmit={handleSubmit}>
          {error && (<div style={{ width: 'fill-available', padding: '10px', textTransform: 'capitalize', backgroundColor: 'darkorange', borderRadius: '6px' }}>{error}</div>)}
            <h1>Create Scheduler</h1>
            <div className="form-group">
                <label htmlFor="">Plan:</label>
                <input type="text" name='plan' onChange={handleChange} />
            </div>
            <div className="form-group">
                <label htmlFor="">Time: </label>
                <input type="text" title='Enter Time in seconds, milliseconds' name='timeString' onChange={handleChange} />
            </div>

            <button disabled={disBtn}  type="submit">Create Schedule</button>
        </form>
    </React.Fragment>
  )
}

export default CreateSchedule