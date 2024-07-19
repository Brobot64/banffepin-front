import React from 'react';

const ViewOrder = ({ orders }) => {
  const [singleView, setSingleView] = React.useState(false);
  const [order, setOrder] = React.useState(null);

  const handleClick = (component) => {
    setSingleView(true);
    setOrder(component);
  };

  const calculateTotalQuantity = (cart) => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const calculateTotalPrice = (cart) => {
    return cart.reduce((total, item) => total + (item.denomination * item.quantity), 0);
  };

  return (
    <React.Fragment>
      <div style={{ cursor: 'pointer' }} onClick={() => setSingleView(false)}> &lt;= </div>
      {
        !singleView ? (
          orders.length > 0 ? (
            <table border={2}>
              <thead>
                <tr>
                  <th className='count'>#</th>
                  <th>Total Quantity</th>
                  <th>Total Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map((item, index) => (
                    <tr key={index} onClick={() => handleClick(item)}>
                      <td className='count'>{index + 1}</td>
                      <td>{calculateTotalQuantity(item.cart)}</td>
                      <td>{calculateTotalPrice(item.cart)}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          ) : (
            <div>No orders available.</div>
          )
        ) : (
          <ViewOneOrder oneTelco={order} />
        )
      }
    </React.Fragment>
  );
};

export const ViewOneOrder = ({ oneTelco }) => {
  const [inputs, setInputs] = React.useState(oneTelco);
  const [error, setError] = React.useState();
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
    // const response = await updateTelco(inputs._id, { name: inputs.name, ftpUrl: inputs.ftpUrl });
    // if (response.status === 200 || response.status === 201){
    //     setError('Telco Updated');
    // } else {
    //   setError('Unable to Update TelcoProvider!!');
    // }
    // setTimeout(() => {
    //   setError('');
    // }, 5000);
  };

  return (
    <>
      <form action="" onSubmit={handleSubmit}>
        {error && (
          <div style={{ width: 'fill-available', padding: '10px', textTransform: 'capitalize', backgroundColor: 'darkorange', borderRadius: '6px' }}>
            {error}
          </div>
        )}
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

export default ViewOrder;
