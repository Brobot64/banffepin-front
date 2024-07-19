import React from 'react'
import { updateTelco } from '../backies/schedulers';

const TecloProviders = ({ providers }) => {
    const [singleView, setSingleView] = React.useState(false);
    const [provider, setProvider] = React.useState(null);

    const handleClick = (component) => {
        setSingleView(true);
        setProvider(component);
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
                                <th>Name</th>
                                <th>FTP Path</th>
                                <th>Country</th>
                                <th>Scheduler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                providers.map((item, index) => (
                                    <tr key={index} onClick={() => handleClick(item)}>
                                        <td className='count'>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.ftpUrl}</td>
                                        <td>{item.country}</td>
                                        <td>{item.schedule ? item.schedule.plan : 'MTn'}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                ) : (
                    <ViewEditTelco oneTelco={provider} />
                )
            }
        </React.Fragment>
  )
}

export const ViewEditTelco = ({ oneTelco }) => {
    const [inputs, setInputs] = React.useState(oneTelco);
    const [error, serError] = React.useState();
    const [disBtn, setDisBtn] = React.useState(false);

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
        const response = await updateTelco(inputs._id, { name: inputs.name, ftpUrl: inputs.ftpUrl });
        if (response.status === 200 || response.status === 201){
            serError('Telco Updated');
        } else {
          serError('Unable to Update TelcoProvider!!');
        }
        setTimeout(() => {
          serError('');
        }, 5000);

    }

    return (
        <>
            <form action="" onSubmit={handleSubmit}>
            {error && (<div style={{ width: 'fill-available', padding: '10px', textTransform: 'capitalize', backgroundColor: 'darkorange', borderRadius: '6px' }}>{error}</div>)}
                <h1>View/Edit Telco</h1>
                <div className="form-group">
                    <label htmlFor="">Name:</label>
                    <input type="text" name="name" value={inputs.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="">Url: </label>
                    <input type="text" name="ftpUrl" value={inputs.ftpUrl} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="">Country: </label>
                    <input type="text" name="country" value={inputs.country} onChange={handleChange} />
                </div>

                <div className="form-group">
                    <label htmlFor="">Scheduler: </label>
                    <input type="text" name="schedule" value={inputs.schedule.plan} onChange={handleChange} />
                </div>

                <button disabled={disBtn} type="submit">Save Telco</button>
            </form>
        </>
    );
};


export default TecloProviders