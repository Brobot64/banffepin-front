import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { createUserOrders } from '../../backies/schedulers';
import ResponseDisp from './ResponseDisp';

const OrderConfirmation = () => {
    const [orders, setOrders] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');    
    const [resSta, setResStat] = useState(false);
    const [assignedPins, setAssignedPins] = useState(null);
    const navigate = useNavigate();

    const handleReturn = () => {
        localStorage.removeItem('order');
        navigate(-1);
    }

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem('order'));
        setOrders(orderData);
    }, []);

    const debitAmount = () => {
        return orders ? parseInt(orders.volume) * parseInt(orders.denomination) : 0;
    }

    const onPay = async (e) => {
        e.preventDefault();
        const dabar = {
            denomination: orders.denomination, 
            quantity: orders.volume, 
            telco: orders.name 
        }
        const cart = [dabar];
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;
        setLoading(true);
        setMessage('');
        try {
            const response = await createUserOrders(userId, cart);
            if (response.status === 200 || response.status === 201) {
                setAssignedPins(response.data);
                setMessage('Order created successfully!');
            } else {
                setMessage('Error creating order: ' + response.data.error);
                setResStat(true);
            }
        } catch (error) {
            setMessage('Error creating order: ' + error.message);
            setResStat(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <React.Fragment>
            {loading && <Loader />}
            <div className="orderconfirmation">
                <svg onClick={handleReturn} xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                    <path d="M0.292895 7.43547C-0.0976295 7.826 -0.0976295 8.45916 0.292895 8.84968L6.65686 15.2136C7.04738 15.6042 7.68055 15.6042 8.07107 15.2136C8.46159 14.8231 8.46159 14.19 8.07107 13.7994L2.41422 8.14258L8.07107 2.48572C8.46159 2.0952 8.46159 1.46203 8.07107 1.07151C7.68055 0.680986 7.04738 0.680986 6.65686 1.07151L0.292895 7.43547ZM15 7.14258L1 7.14258V9.14258L15 9.14258V7.14258Z" fill="#0097FF" />
                </svg>

                {message && <ResponseDisp msg={message} isError={resSta} />}

                <h3>Confirmation</h3>

                <div className="avater"></div>

                <div className="balancebadge">
                    <p>Available Balance</p>
                    <h2>&#8358;&nbsp;15,000</h2>
                    <a href="">Schedule transactions&nbsp;&gt;</a>
                </div>

                <div className="purchasesummary">
                    <div>
                        <p>Balance before purchase</p>
                        <p>&#8358;15,000</p>
                    </div>

                    <div>
                        <p>Amount to be debited</p>
                        <p>&#8358;{debitAmount()}</p>
                    </div>

                    <div>
                        <p>Denomination used</p>
                        <p>&#8358;{orders ? orders.denomination : '0'}</p>
                    </div>
                </div>

                <div className="purchasecom">
                    <label htmlFor="">
                        Details of purchase
                    </label> <br />
                    <textarea name="" id=""></textarea>
                </div>

                <div className="totalsum">
                    <p>Total balance after purchase</p>
                    <p>&nbsp;&nbsp;&nbsp;&nbsp;(taxes included)</p>
                    <input type="text" readOnly value={`N ${debitAmount().toLocaleString()}`} />
                </div>

                <div className="purfinale">
                    <button onClick={onPay}>Pay</button>
                    <button className='cancel' onClick={handleReturn}>Cancel</button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default OrderConfirmation;
