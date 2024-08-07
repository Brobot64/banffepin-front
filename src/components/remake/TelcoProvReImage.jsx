import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReminder } from '../../backies/schedulers';
import { denomArray } from '../../minst';

export function mergeArraysWithoutDuplicates(...arrays) {
    return [...new Set(arrays.flat())];
}

function concatAndSortArrays(arr1, arr2) {
    let resultSet = new Set(arr2);
    for (let item of arr1) {
        if (resultSet.size >= 8) break;
        resultSet.add(item);
    }
    return Array.from(resultSet).sort((a, b) => parseInt(a) - parseInt(b));
}

export function isValueInArray(array, value) {
    return array.includes(value);
}

export function abbreviateNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'm';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k';
  }
  return num.toString();
}

const TelcoProvReImage = ({ telname = 'MTN', handleLoader, handlepop, denoms }) => {
    const navigate = useNavigate();
    const [activeNode, setActiveNode] = useState(null);
    const [telcos, setTelcos] = useState([]);
    const [denominations, setDenominations] = useState([]);
    const [ristDenominations, setRistDenominations] = useState([]);
    const [quantity, setQuantity] = useState(1);

    const handleSelectDenomination = (value) => {
        setQuantity(1);
        setActiveNode(value);
    };

    const handleClick = () => {
        handleLoader(true);
        const order = {
            name: telname,
            denomination: activeNode,
            volume: quantity
        };
        localStorage.setItem('order', JSON.stringify(order));
        setTimeout(() => {
            handleLoader(false);
            handlepop();
        }, 5000);
    };

    const handleInputChange = (event) => {
        const value = event.target.value;
        if (!isNaN(value) && value >= 0) {
            setQuantity(Number(value));
        }
    };

    const handleIncrement = () => {
        if (quantity >= 9999) return;
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleDecrement = () => {
        setQuantity((prevQuantity) => (prevQuantity > 0 ? prevQuantity - 1 : 0));
    };

    useEffect(() => {
        const fetchTelcos = async () => {
            try {
                const selectedTelco = denoms.find(t => t.telco.toLowerCase() === telname.toLowerCase());
                const telcoDenominations = selectedTelco ? selectedTelco.denominations.map(d => d.denomination) : [];
                setDenominations(telcoDenominations);
                setRistDenominations(concatAndSortArrays(denomArray, telcoDenominations));
            } catch (error) {
                console.error(error);
            }
        };
        setActiveNode(null);
        setQuantity(1);
        fetchTelcos();
    }, [telname, denoms]);

    return (
        <div className='overallselect'>
            <div className="denomselect">
                <h6>Select Denomination ({telname.toUpperCase()})</h6>

                <div className="revampdenom">
                    {ristDenominations.map((denomination, i) => (
                        <button
                            key={i}
                            disabled={!isValueInArray(denominations, denomination)}
                            className={`timy node ${activeNode === denomination ? 'active' : ''}`}
                            onClick={() => handleSelectDenomination(denomination)}
                        >
                            {denomination}
                        </button>
                    ))}
                </div>

                {activeNode && (
                    <div className="quantitydetl">
                        <p>Purchase Quantity ({telname})&nbsp;Pricing: {activeNode * quantity}</p>
                        <div className="inputslide">
                            <button onClick={handleDecrement}>-</button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={handleInputChange}
                                max={9999}
                                maxLength={4}
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

export default TelcoProvReImage;
