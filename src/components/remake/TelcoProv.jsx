import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReminder } from '../../backies/schedulers';


export function abbreviateNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

const TelcoProv = ({ telname = 'MTN', handleLoader }) => {
    const navigate = useNavigate();
    const [activeNode, setActiveNode] = useState(null);
    const [telcos, setTelcos] = useState([]);
    const [denominations, setDenominations] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const handleSelectDenomination = (value) => {
        setActiveNode(value);
    };

    const handleClick = () => {
      const order = {
        name: telname,
        denomination: activeNode,
        volume: quantity
      }
      handleLoader();
      localStorage.setItem('order', JSON.stringify(order));
      setTimeout(() => {
        handleLoader();
        navigate('/mobile/confirmorder');
      }, 3000);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setQuantity(Number(value));
        }
    };

    const handleIncrement = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    useEffect(() => {
        const fetchTelcos = async () => {
            try {
                const response = await getReminder(); // Adjust the endpoint if necessary
                const fetchedTelcos = response.data.data;
                setTelcos(fetchedTelcos);

                const selectedTelco = fetchedTelcos.find(t => t.telco.toLowerCase() === telname);
                setDenominations(selectedTelco ? selectedTelco.denominations : []);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTelcos();
    }, [telname]);

    return (
        <div className='overallselect'>
            <div className="denomselect">
                <h6>Select Denomination</h6>
                <div className="number-line">
                    {denominations.map((denomination, i) => (
                        <div
                            className={`node ${activeNode === denomination ? 'active' : ''}`}
                            onClick={() => handleSelectDenomination(denomination)}
                            key={i}
                        >
                            <div className='inner'>
                                <p>{abbreviateNumber(denomination)}</p>
                                <span className="line"/>
                            </div>
                        </div>
                    ))}
                </div>

                {activeNode && (
                    <div className="quantitydetl">
                        <p>Purchase Quantity (N1000)</p>
                        <div className="inputslide">
                            <button onClick={handleDecrement}>-</button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={handleInputChange}
                            />
                            <button onClick={handleIncrement}>+</button>
                        </div>
                    </div>
                )}
            </div>
            <button onClick={handleClick} disabled={!activeNode}>Pay</button>
        </div>
    );
};

export default TelcoProv;
