import React, { useEffect, useState } from 'react';
import Loader from './Loader';
import Modal from '../Modal';
import { SecTemp } from './ReactPdf';
import { createUserOrders, deductUserBalances, refundUserBalances } from '../../backies/schedulers';
import ResponseDisp from './ResponseDisp';
import PinInput from './PinInput';

export function randomBool() {
    return Math.random() >= 0.8; // 0.5 represents a 50% chance of true or false
}

const ConfirmTale = ({ isopen, onclose, orBal = 20000, tax = 1000 }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [resSta, setResStat] = useState(true);
    const [message, setMessage] = useState('');
    const [authPin, setAuthPin] = useState('');
    const [assignedPins, setAssignedPins] = useState(null);

    const handleModal = () => {
        setOpenModal(!openModal);
        handleCancel();
        window.location.reload();
    }

    const handleSetPin = (pin) => {
        setAuthPin(pin);
        setOpenModal(!openModal);
    }

    useEffect(() => {
        const orderData = JSON.parse(localStorage.getItem('orders'));
        setOrders(orderData || []);
        console.log(orders);
    }, []);

    const debitAmount = () => {
        return orders.reduce((total, order) => total + (parseInt(order.denomination) * parseInt(order.quantity)), 0);
    };

    const handlePay = async (e) => {
        e.preventDefault();

        if (!authPin || authPin === '') {
            setOpenModal(!openModal);
            return;
        }

        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;
        const cart = orders.map(order => ({
            denomination: order.denomination,
            quantity: order.quantity,
            telco: order.telco
        }));
        const chance = randomBool();
        console.log('chance: ', chance);
        setLoading(true);
        setMessage('');
    
        try {
            const debitAmountValue = Number(debitAmount()) + Number(tax);
            const deductAmount = await deductUserBalances(userId, debitAmountValue);
    
            if (deductAmount.status !== 200 && deductAmount.status !== 201) {
                setResStat(true);
                setMessage('Insufficient Amount');
                setLoading(false);
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
                return;
            }
    
            const response = await createUserOrders(userId, orders, authPin);
            if (response.status === 200 || response.status === 201) {
                setAssignedPins(response.data);
                setResStat(false);
                setMessage('Order Created Successfully!');
                setLoading(false);
                setOpenModal(!openModal);
            } else {
                setResStat(true);
                setMessage('Error creating order: ' + response.data.error);
                setLoading(false);
                setTimeout(async () => {
                    await refundUserBalances(userId, debitAmountValue);
                    handleCancel();
                }, 3000);
            }
        } catch (error) {
            console.error('Error during the transaction:', error);
            const debitAmountValue = Number(debitAmount()) + Number(tax);
            setResStat(true);
            setMessage('Transaction Error');
            setLoading(false);
            setTimeout(async () => {
                await refundUserBalances(userId, debitAmountValue);
                handleCancel();
            }, 3000);
        }
    };

    const handleCancel = () => {
        localStorage.removeItem('orders');
        onclose();
    };

    const closeUp = () => {
        handleCancel();
        setTimeout(() => {
            window.location.reload();
        }, 3000);
    }

    if (!isopen) return null;

    const formattedOrBal = Number(orBal).toLocaleString();
    const formattedDebitAmount = Number(debitAmount()).toLocaleString();
    const formattedTax = Number(tax).toLocaleString();
    const formattedTotalCost = Number(debitAmount() + tax).toLocaleString();

    const mainAmt = (Number(orBal) - Number(debitAmount()) - Number(tax));

    return (
        <React.Fragment>
            {loading && <Loader />}
            <div className='firms'>
                {message && (
                    <div style={{ boxSizing: 'border-box', padding: '20px' }}>
                        <ResponseDisp isError={resSta} msg={message} />
                    </div>
                )}
                <div className="glass-confirm">
                    <p style={{ margin: 'auto', fontWeight: 'bold' }}>purchase details</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Telco</th>
                                <th>Cost Per Unit</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr key={index}>
                                    <td>{order.telco}</td>
                                    <td>N {Number(order.denomination).toLocaleString()}</td>
                                    <td>{order.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="totals">
                        <div className="desp">
                            <p>sub total</p>
                            <p>tax</p>
                        </div>
                        <div className="pricings">
                            <p>N {formattedDebitAmount}</p>
                            <p>N {formattedTax}</p>
                        </div>
                    </div>
                    <div>
                        <p>balance before purchase</p>
                        <h5>N {formattedOrBal}</h5>
                    </div>
                    <div>
                        <p>balance after debit</p>
                        <h5>{mainAmt >= 0 ? (`N ${mainAmt.toLocaleString()}`) : ('Insufficient Amount')}</h5>
                    </div>
                    <div>
                        <p>total cost</p>
                        <h5 style={{ color: '#00A41A' }}>N {formattedTotalCost}</h5>
                    </div>
                    <button disabled={mainAmt <= -1} onClick={handlePay}>confirm</button>
                    <button onClick={closeUp} style={{ marginBottom: '20px' }} className='cancel'>cancel</button>
                </div>
            </div>

            <Modal isOpen={openModal} onClose={handleModal}>
                {
                    authPin === '' ? <PinInput isPin={true} handleSubmit={handleSetPin} /> :
                    <SecTemp assignments={assignedPins} />
                }
            </Modal>
        </React.Fragment>
    );
};

export default ConfirmTale;
