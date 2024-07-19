import React from 'react'
import { useNavigate } from 'react-router-dom';

const HistItem = ({data, onClick}) => {
  const navigate = useNavigate();

    const { name, denomination, quantity, date, time } = data;

    

    // const handleClick = () => {
    //   navigate('/mobile/history/view/1');
    // }

    const amount = parseInt(denomination) * parseInt(quantity);

    function findValueByKey(obj, keyString) {
        // Check if object is valid
        if (typeof obj !== 'object' || obj === null) {
          return undefined;
        }
      
        // Check if key exists
        if (Object.hasOwnProperty.call(obj, keyString)) {
          return obj[keyString];
        } else {
          return undefined;
        }
    }

    function removespace(text) {
        return text.replace(/\s/g, "");
    }
      

  return (
    <div className='hist-item' onClick={onClick}>
        <div className={`item-name ${name}`}>
            <img src={`/${removespace(name.toLowerCase())}.png`} alt={`banffpay ${name}`} onerror="this.src = '/9mobile.png';" />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h5>{name} e-pin</h5>
                <p>&#8358;{denomination.toLocaleString()} x <span>{quantity}</span></p>
            </div>
        </div>

        <div className={`${name}`}>
            <h4>&#8358;{amount.toLocaleString()}.00</h4>
            <p>{date} - {time}</p>
        </div>
    </div>
  )
}

export default HistItem