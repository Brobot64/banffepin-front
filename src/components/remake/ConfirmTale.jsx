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
    const [orders, setOrders] = useState({});
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
        const orderData = JSON.parse(localStorage.getItem('order'));
        setOrders(orderData || {});
    }, []);

    const debitAmount = () => {
        if (orders && orders.volume && orders.denomination) {
            return parseInt(orders.volume) * parseInt(orders.denomination);
        }
        return 0;
    };

    const handlePay = async (e) => {
        e.preventDefault();

        if (!authPin || authPin === '') {
            setOpenModal(!openModal);
            return;
        }

        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;
        const dabar = {
            denomination: orders.denomination,
            quantity: orders.volume,
            telco: orders.name
        };
        const cart = [dabar];
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
    
            const response = await createUserOrders(userId, cart, authPin);
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
        localStorage.removeItem('order');
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
                    {/* <h3>confirmation</h3>
                    <svg onClick={onclose} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M4.95012 4.94929C5.34064 4.55877 5.97381 4.55877 6.36433 4.94929L14.8496 13.4346C15.2401 13.8251 15.2401 14.4583 14.8496 14.8488C14.4591 15.2393 13.8259 15.2393 13.4354 14.8488L4.95012 6.36351C4.5596 5.97298 4.5596 5.33982 4.95012 4.94929Z" fill="#0F0F0F" />
                        <path d="M4.94929 14.8497C4.55877 14.4592 4.55877 13.826 4.94929 13.4355L13.4346 4.95019C13.8251 4.55967 14.4583 4.55967 14.8488 4.95019C15.2393 5.34071 15.2393 5.97388 14.8488 6.3644L6.36351 14.8497C5.97298 15.2402 5.33982 15.2402 4.94929 14.8497Z" fill="#0F0F0F" />
                    </svg> */}
                    <p style={{ margin: 'auto', fontWeight: 'bold' }}>purchase details</p>
                    <table>
                        <thead>
                            <tr>
                                <th>cost per unit</th>
                                <th>quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>n {orders ? Number(orders.denomination).toLocaleString() : '0'}</td>
                                <td>{orders ? orders.volume : 'null'}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="totals">
                        <div className="desp">
                            <p>sub total</p>
                            <p>tax</p>
                        </div>
                        <div className="pricings">
                            <p>n {formattedDebitAmount}</p>
                            <p>n {formattedTax}</p>
                        </div>
                    </div>
                    <div>
                        <p>balance before purchase</p>
                        <h5>n {formattedOrBal}</h5>
                    </div>
                    <div>
                        <p>balance after debit</p>
                        <h5>{mainAmt >= 0 ? (`n ${mainAmt.toLocaleString()}`) : ('Insufficient Amount')}</h5>
                    </div>
                    <div>
                        <p>telco</p>
                        <h5>{orders ? orders.name : 'null'}</h5>
                    </div>
                    
                    <div>
                        <p>total cost</p>
                        <h5 style={{ color: '#00A41A' }}>n {formattedTotalCost}</h5>
                    </div>
                    {/* <button disabled={mainAmt < 0} onClick={handlePay}>confirm</button> */}
                    <button disabled={mainAmt <= -1} onClick={handlePay}>confirm</button>

                    <button onClick={closeUp} style={{ marginBottom: '20px' }} className='cancel'>cancel</button>
                </div>
            </div>

            <Modal isOpen={openModal} onClose={handleModal}>
                {
                    authPin === '' ? <PinInput isPin={true} handleSubmit={handleSetPin}/> :
                    <SecTemp assignments={assignedPins} />
                }
                
            </Modal>
        </React.Fragment>
    );
};

export default ConfirmTale;





