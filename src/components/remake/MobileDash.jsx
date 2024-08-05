import React, { useState } from 'react'
import { telcoUser } from '../../minst'
import HistItem from './HistItem'
import TelcoProv from './TelcoProv'
import Modal from '../Modal'
import OtherTelco from './OtherTelco'
import Loader from './Loader'
import ConfirmTale from './ConfirmTale'
import TelcoProvReImage from './TelcoProvReImage'
import { getIfPinAdded, getReminder, getUserBalances, getUserOrders } from '../../backies/schedulers'
import { formatDateTime } from './HistoryView';
import PinInput from './PinInput'

const MobileDash = () => {
    const [selector, setSelector] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [telco, setTelco] = React.useState();
    const [checkTransactionPin, setCheckTransactionPin] = React.useState(false);

    const [balance, setUserBalance] = React.useState(0);

    const [historyDat, setHistoryData] = React.useState([]);

    const [telcos, setTelcos] = useState([]);
    const [denominations, setDenominations] = useState([]);
    const [ristDenominations, setRistDenominations] = useState([]);

    const [loader, setLoader] = React.useState(false);
    const [confirm, setConfirm] = React.useState(false);

    const onConfirm = () => setConfirm(!confirm);

    const handleTelco = (name) => {
        setTelco(name.toLowerCase());
        setSelector(true);
    }

    const handleModalTelco = (name) => {
        setTelco(name.toLowerCase());
        setSelector(true);
        setOpenModal(false);
    }

    const handleLoader = (sets) => setLoader(sets);

    const handleSelector = (e) => {
        setSelector(true);
    };

    const handleModal = () => setOpenModal(!openModal);

    React.useEffect(() => {
        const fetchTelcos = async () => {
            try {
                const response = await getReminder(); // Adjust the endpoint if necessary
                const fetchedTelcos = response.data.data;
                setTelcos(fetchedTelcos);

                const selectedTelco = fetchedTelcos.find(t => t.telco.toLowerCase() === telco);
                setDenominations(selectedTelco ? selectedTelco.denominations : []);
                // setRistDenominations(mergeArraysWithoutDuplicates(denomArray, denominations));
            } catch (error) {
                console.error(error);
            }
        };

        fetchTelcos()
    }, [])


    React.useEffect(() => {
        const selectedTelco = telcos.find(t => t.telco.toLowerCase() === telco);
        setDenominations(selectedTelco ? selectedTelco.denominations : []);
        // setRistDenominations(mergeArraysWithoutDuplicates(denomArray, denominations));
    }, [telco])

    React.useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;
        const fetchOrders= async () => {
            try {
                const response = await getUserOrders(userId, {}, '', undefined, undefined, 1, 4);
                if (response.status === 200 || response.status === 201) setHistoryData(response.data)
            } catch (error) {
                console.log(error);
            }
        }

        const fetchBalance = async () => {
            try {
                const response = await getUserBalances(userId);
                if (response.status === 200 || response.status === 201) setUserBalance(response.data.balance)
            } catch (error) {
                console.log(error)
            }
        }

        const fetchTransactionPin = async () => {
            try {
                const response = await getIfPinAdded(userId);
                if (response.status === 200 || response.status === 201) {
                    setCheckTransactionPin(response.data);
                    const herbal = response.data;
                    if (!herbal) setOpenModal(!openModal);
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchTransactionPin();
        fetchBalance();
        fetchOrders();
    }, []);


    // React.useEffect(() => {
    //     const user = JSON.parse(sessionStorage.getItem('user'));
    //     const userId = user ? user.id : null;

    //     const fetchBalance = async () => {
    //         try {
    //             const response = await getUserBalances(userId);
    //             if (response.status === 200 || response.status === 201) setUserBalance(response.data.balance)
    //         } catch (error) {
    //             console.log(error)
    //         }
    //     }

    //     fetchBalance();
    // }, [])



  return (
    <React.Fragment>
        {loader && <Loader/>}
        <Modal isOpen={openModal} onClose={handleModal} children={checkTransactionPin ? <OtherTelco telco={telco} handleTelcoChange={handleModalTelco}/> : <PinInput/>}/>
        {/* <Modal isOpen={openModal} onClose={handleModal} children={<PinInput/>}/> */}
        <div className="mobiledash">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                <path d="M0.292895 7.43547C-0.0976295 7.826 -0.0976295 8.45916 0.292895 8.84968L6.65686 15.2136C7.04738 15.6042 7.68055 15.6042 8.07107 15.2136C8.46159 14.8231 8.46159 14.19 8.07107 13.7994L2.41422 8.14258L8.07107 2.48572C8.46159 2.0952 8.46159 1.46203 8.07107 1.07151C7.68055 0.680986 7.04738 0.680986 6.65686 1.07151L0.292895 7.43547ZM15 7.14258L1 7.14258V9.14258L15 9.14258V7.14258Z" fill="#0097FF"/>
            </svg>

            <h3>buy e-pins</h3>

            <div className="balancebadge">
                <p>available balance</p>
                <h2>&#8358;&nbsp;{balance}</h2>
                {/* <a href="">schedule transactions&nbsp;&gt;</a> */}
            </div>

            <div className="telcogather">
                <div className='alltelco'>
                    <div className={`telco ${telco && telco.toLowerCase() === 'airtel' && 'active'}`} onClick={() => handleTelco('airtel')}>
                        <img src="/airtel.png" alt="banffpay telco" />
                        <h6>airtel</h6>
                    </div>
                    <div className={`telco ${telco && telco.toLowerCase() === 'glo' && 'active'}`} onClick={() => handleTelco('glo')}>
                        <img src="/glo.png" alt="banffpay telco" />
                        <h6>glo</h6>
                    </div>
                    <div className={`telco ${telco && telco.toLowerCase() === 'mtn' && 'active'}`} onClick={() => handleTelco('MTN')}>
                        <img src="/mtn.png" alt="banffpay telco" />
                        <h6>MTN</h6>
                    </div>
                    <div className={`telco ${telco && telco.toLowerCase() === '9mobile' && 'active'}`} onClick={() => handleTelco('9mobile')}>
                        <img src="/9mobile.png" alt="banffpay telco" />
                        <h6>9 Mobile</h6>
                    </div>
                </div>

                <button onClick={handleModal}>
                    others 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="down-arrow"><path d="M16 22a2 2 0 0 1-1.41-.59l-10-10a2 2 0 0 1 2.82-2.82L16 17.17l8.59-8.58a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 16 22Z"></path></svg>
                </button>
            </div>  

            {selector && <TelcoProvReImage telname={telco} handleLoader={handleLoader} handlepop={onConfirm} denoms={telcos}/>}

            <div className="recenttransact">
                <div className="top-action">
                    <p>recent transactions</p>
                    <a href="/mobile/history">View all</a>
                </div>
                <div className="history">
                {
                    historyDat  && historyDat.length > 0 ? (
                        historyDat.map((item, index) => (
                            <HistItem key={index} data={{name: item.cart[0].telco, denomination: item.cart[0].denomination, quantity: item.cart[0].quantity, date: formatDateTime(item.createdAt.toString()).date, time: formatDateTime(item.createdAt.toString()).time}}/>
                        ))

                        // onClick={() => handleClick({name: item.cart[0].telco, denomination: item.cart[0].denomination, quantity: item.cart[0].quantity, date: formatDateTime(item.createdAt.toString()).date, time: formatDateTime(item.createdAt.toString()).time, id: item._id})}
                    ) 
                    : (
                        <div style={{ textAlign: "center", padding: '30px' }}>
                            No Data Found
                        </div>
                    )
                }
                </div>
            </div>
        </div>
        {confirm && <ConfirmTale isopen={confirm} onclose={onConfirm} orBal={balance}/>}
    </React.Fragment>
  )
}

export default MobileDash