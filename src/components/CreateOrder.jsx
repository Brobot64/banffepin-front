import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createUserOrders, getReminder } from '../backies/schedulers';

const CreateOrder = () => {
  const [userId, setUserId] = useState('');
  const [cart, setCart] = useState([{ denomination: '', quantity: '', telco: '' }]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [telcos, setTelcos] = useState([]);
  const [denominations, setDenominations] = useState([]);
  const [assignedPins, setAssignedPins] = useState(null);

  useEffect(() => {
    const fetchTelcos = async () => {
      try {
        const response = await getReminder();//axios.get('/api/epins/telcos'); // Adjust the endpoint if necessary
        setTelcos(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTelcos();
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleInputChange = (index, event) => {
    const newCart = [...cart];
    newCart[index][event.target.name] = event.target.value;
    setCart(newCart);

    if (event.target.name === 'telco') {
      const selectedTelco = telcos.find(t => t.telco === event.target.value);
      setDenominations(selectedTelco ? selectedTelco.denominations : []);
      newCart[index].denomination = ''; // Reset denomination when telco changes
    }
  };

  const handleAddItem = () => {
    setCart([...cart, { denomination: '', quantity: '', telco: '' }]);
  };

  const handleRemoveItem = (index) => {
    const newCart = cart.filter((item, i) => i !== index);
    setCart(newCart);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = JSON.parse(sessionStorage.getItem('user'));
    const userId = user ? user.id : null;
    setLoading(true);
    setMessage('');

    const response = await createUserOrders(userId, cart)
    if (response.status === 200 || response.status === 201) {
      setAssignedPins(response.data)
      setMessage('Order created successfully!');
      setLoading(false);
    } else {
      setMessage('Error creating order: ' + response.data.error);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Create Order</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <h3>Cart Items</h3>
          {cart.map((item, index) => (
            <div key={index} style={{ marginBottom: 10 }}>
              <div className='flex'>
                <div className="form-group">
                  <label>Telco:</label>
                  <select
                    name="telco"
                    value={item.telco}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  >
                    <option value="">Select Telco</option>
                    {telcos.map((telco, i) => (
                      <option key={i} value={telco.telco}>
                        {telco.telco}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Denomination:</label>
                  <select
                    name="denomination"
                    value={item.denomination}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                    disabled={!item.telco}
                  >
                    <option value="">Select Denomination</option>
                    {denominations.map((denomination, i) => (
                      <option key={i} value={denomination}>
                        {denomination}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Quantity:</label>
                  <input
                    type="number"
                    name="quantity"
                    value={item.quantity}
                    onChange={(e) => handleInputChange(index, e)}
                    required
                  />
                </div>
              </div>
              <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddItem}>Add Item</button>
        </div>
        <button type="submit" disabled={loading}>Create Order</button>
      </form>
      {message && <p>{message}</p>}
      {assignedPins && (
        <div>
          <h3>Assigned EPins</h3>
          <table>
            <thead>
              <tr>
                <th>Telco</th>
                <th>Denomination</th>
                <th>EPins</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(assignedPins).map(([telco, details]) => (
                <tr key={telco}>
                  <td>{telco}</td>
                  <td>{details.denomination}</td>
                  <td>
                    <ul>
                      {details.pins.map((pin, index) => (
                        <li key={index}>{pin}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handlePrint}>Print</button>
        </div>
      )}
    </div>
  );
};

export default CreateOrder;
