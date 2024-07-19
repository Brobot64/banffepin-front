import React from 'react'
import { updateSchedule } from '../backies/schedulers';

const Schedules = ({ schedules }) => {
    const [singleView, setSingleView] = React.useState(false);
    const [schedule, setSchedule] = React.useState(null);

    const handleClick = (component) => {
        setSingleView(true);
        setSchedule(component);
    };

    return (
        <React.Fragment>
            <div style={{ cursor: 'pointer',  }} onClick={() => setSingleView(false)}> &lt;= </div>
            {
                !singleView ? (
                    <table border={2}>
                        <thead>
                            <tr>
                                <th className='count'>#</th>
                                <th>Plans</th>
                                <th>Time</th>
                                <th>CreatedBy</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                schedules.map((item, index) => (
                                    <tr key={index} onClick={() => handleClick(item)}>
                                        <td className='count'>{index + 1}</td>
                                        <td>{item.plan}</td>
                                        <td>{item.timeString}</td>
                                        <td>{item.user ? item.user.name : 'MTn'}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <ViewEditSchedule oneSchedule={schedule} />
                )
            }
        </React.Fragment>
    );
};

export const ViewEditSchedule = ({ oneSchedule }) => {
    const [inputs, setInputs] = React.useState(oneSchedule);
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
        const response = await updateSchedule(inputs._id, { plan: inputs.plan, timeString: inputs.timeString });
        if (response.status === 200 || response.status === 201){
            serError('Scheduler Updated');
        } else {
          serError('Unable to Update Scheduler!!');
        }
        setTimeout(() => {
          serError('');
        }, 5000);

    }

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
            {error && (<div style={{ width: 'fill-available', padding: '10px', textTransform: 'capitalize', backgroundColor: 'darkorange', borderRadius: '6px' }}>{error}</div>)}
                <h1>View/Edit Scheduler</h1>
                <div className="form-group">
                    <label htmlFor="">Plan:</label>
                    <input type="text" name="plan" value={inputs.plan} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Time: </label>
                    <input type="text" name="timeString" value={inputs.timeString} onChange={handleChange} />
                </div>

                <button disabled={disBtn} type="submit">Save Scheduler</button>
            </form>
        </>
    );
};


export default Schedules