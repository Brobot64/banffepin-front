import React from 'react'
import HistItem from './HistItem'
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import HistoryView, { formatDateTime } from './HistoryView';
import { getUserOrders } from '../../backies/schedulers';
import CustomDatePop from './CustomDatePop';

const FullHistory = () => {
    const navigate = useNavigate();
    const [component, setComponent] = React.useState();
    const [isOpen, setIsOpen] = React.useState(false);
    const [historyData, setHistoryData] = React.useState([]);
    const [openCustom, setOpenCustom] = React.useState(false);
    const [customDate, setCustomDate] = React.useState({})

    const hanldeModalChange = () => setIsOpen(!isOpen);

    const handleReturn = () => {
        navigate(-1);
    }

    const handleCustomChange = (e) => {
        const { name, value } = e.target;
        setCustomDate({...customDate, [name]: value});
    }

    const handleDateSubmit = () => {
        handleCustomSelector();
        setIsOpen(false);
        setOpenCustom(false);
    }

// ipnx spectrnet starcom ntel
// Render the new figma and finalize others

    const handleCustomSelector = async() => {
        console.log('first started', customDate.start, customDate.end)
        const start = customDate.start;
        const end = customDate.end;
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;
    //    console.log(userId, {}, customDate.start ? customDate.start : undefined, customDate.end ? customDate.end : undefined, 1, 100);
        try {
            const response = await getUserOrders(userId, {}, 'custom', `${start}`, `${end}`, 1, 100);
            if (response.status === 200 || response.status === 201) setHistoryData(response.data)
            else {
                console.error('Failed to fetch orders:', response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (comp) => {
        setIsOpen(true);
        setComponent(comp);
    }

    const handleSelector = async(value) => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;
        try {
            const response = await getUserOrders(userId, {}, value, undefined, undefined, 1, 100);
            if (response.status === 200 || response.status === 201) setHistoryData(response.data)
            else {
                console.error('Failed to fetch orders:', response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSelection = (e) => {
        if (e.target.value === "custom") {
            setOpenCustom(true)
            setIsOpen(true);
            return;
        };
        handleSelector(e.target.value);
    }

    React.useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;
        const fetchOrders= async () => {
            try {
                const response = await getUserOrders(userId);
                if (response.status === 200 || response.status === 201) setHistoryData(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrders();
    }, [])

  return (
    <React.Fragment>
        <Modal isOpen={isOpen} onClose={hanldeModalChange} children={!openCustom ? (<HistoryView data={component}/>) : (<CustomDatePop onChange={handleCustomChange} handleSubmit={handleDateSubmit}/>)}/>
        <div className="fullhistory">
            <svg onClick={handleReturn} xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                    <path d="M0.292895 7.43547C-0.0976295 7.826 -0.0976295 8.45916 0.292895 8.84968L6.65686 15.2136C7.04738 15.6042 7.68055 15.6042 8.07107 15.2136C8.46159 14.8231 8.46159 14.19 8.07107 13.7994L2.41422 8.14258L8.07107 2.48572C8.46159 2.0952 8.46159 1.46203 8.07107 1.07151C7.68055 0.680986 7.04738 0.680986 6.65686 1.07151L0.292895 7.43547ZM15 7.14258L1 7.14258V9.14258L15 9.14258V7.14258Z" fill="#0097FF"/>
            </svg>

            <h2>transaction history</h2>
            <div className='hist-selector'>
                <select name="" id="" onChange={handleSelection}>
                    <option value="">all</option>
                    <option value="today">today</option>
                    <option value="week">week</option>
                    <option value="month">month</option>
                    <option value="custom">custom</option>
                </select>
                <select name="" id="">

                </select>
            </div>

            <div className="history">
                {
                    historyData  && historyData.length > 0 ? (
                        historyData.map((item, index) => (
                            <HistItem data={{name: item.cart[0].telco, denomination: item.cart[0].denomination, quantity: item.cart[0].quantity, date: formatDateTime(item.createdAt.toString()).date, time: formatDateTime(item.createdAt.toString()).time}} onClick={() => handleClick({name: item.cart[0].telco, denomination: item.cart[0].denomination, quantity: item.cart[0].quantity, date: formatDateTime(item.createdAt.toString()).date, time: formatDateTime(item.createdAt.toString()).time, id: item._id})}/>
                        ))
                    ) 
                    : (
                        <div style={{ textAlign: "center", padding: '30px' }}>
                            No Data Found
                        </div>
                    )
                }
            </div>
        </div>
    </React.Fragment>
  )
}

export default FullHistory