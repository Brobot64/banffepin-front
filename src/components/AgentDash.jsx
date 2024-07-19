import React, { useEffect } from 'react'
import { getUserOrders } from '../backies/schedulers';
import Modal from './Modal';
import CreateOrder from './CreateOrder';
import ViewOrder from './ViewOrder';

const AgentDash = () => {
    const [orders, setOrders] = React.useState();
    const [open, SetOpen] = React.useState(false);
    const [newOrder, setNewOder] = React.useState();
    const [component, setComponent] = React.useState();

    const onOpen = () => SetOpen(!open);

    const openModel = (component) => {
        SetOpen(true);
        setComponent(component);
    }

    const calculateTotalQuantity = (cart) => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const calculateTotalPrice = (cart) => {
        return cart.reduce((total, item) => total + (item.denomination * item.quantity), 0);
    };

    const totalAmount = (orders) => {
        let price = 0;
        for (let i = 0; i < orders.length; i++) {
            price = price + calculateTotalPrice(orders[i].cart);
        }
        return price;
    };

    const totalPinsBought = (orders) => {
        let price = 0;
        for (let i = 0; i < orders.length; i++) {
            price = price + calculateTotalQuantity(orders[i].cart);
        }
        return price;
    };

    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem('user'));
        const userId = user ? user.id : null;
        const fetchOrders= async () => {
            try {
                const response = await getUserOrders(userId);
                if (response.status === 200 || response.status === 201) setOrders(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrders();
    }, []);
    
    return (
        <React.Fragment>
            <React.Fragment>
                <Modal isOpen={open} onClose={onOpen} children={component}/>
                <div className="top-major">
                    <div className="liment">
                        <div className="legion">
                            <h3>Total Orders</h3>
                            <h2>{orders ? orders.length : 0}</h2>
                        </div>
    
                        <div className="fawn">
                            <button onClick={() => openModel(<ViewOrder orders={orders}/>)}>
                                view
                            </button>
    
                            <button onClick={() => openModel(<CreateOrder/>)}>
                                New
                            </button>
                        </div>
                    </div>
    
                    <div className="liment">
                        <div className="legion">
                            <h3>Total Amount</h3>
                            <h2>{orders ? totalAmount(orders) : 0}</h2>
                        </div>
    
                        <div className="fawn">
                            <button>
                                view
                            </button>
                        </div>
    
                    </div>
    
                    <div className="liment">
                        <div className="legion">
                            <h3>Total Pins</h3>
                            <h2>{orders ? totalPinsBought(orders) : 23}</h2>
                        </div>
                        <button>
                            BreakDown
                        </button>
                    </div>
                </div>
    
                <div className="next-major">
                    <button>
                        Create User
                    </button>
                </div>
            </React.Fragment>
        </React.Fragment>
      )
}

export default AgentDash