import React from 'react';
import { useNavigate } from 'react-router-dom';


export function formatDateTime(dateTimeString) {
    // Parse the date-time string
    const date = new Date(dateTimeString);
  
    // Format the date
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options).replace(/,/g, '');
  
    // Get the hours, minutes, and AM/PM
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes}${ampm}`;
  
    // Combine the formatted date and time
    return { date: formattedDate, time: formattedTime };
    // return `${formattedDate}\n${formattedTime}`;
}
  
  // Example usage
//   const dateTimeString = "2024-07-22T16:19:42.093Z";
//   console.log(formatDateTime(dateTimeString));
  

const HistoryView = ({ data }) => {
    const navigate = useNavigate();
    const { name, denomination, quantity, date, time, id = '688bhbvEyy8' } = data || {};
    const amount = denomination && quantity ? parseInt(denomination) * parseInt(quantity) : 0;

    const handleReturn = () => {
        navigate(-1);
    }
    
    return (
        <React.Fragment>
            <div className="historyview">
                {/* Uncomment the SVG if needed for navigation
                <svg onClick={handleReturn} xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                    <path d="M0.292895 7.43547C-0.0976295 7.826 -0.0976295 8.45916 0.292895 8.84968L6.65686 15.2136C7.04738 15.6042 7.68055 15.6042 8.07107 15.2136C8.46159 14.8231 8.46159 14.19 8.07107 13.7994L2.41422 8.14258L8.07107 2.48572C8.46159 2.0952 8.46159 1.46203 8.07107 1.07151C7.68055 0.680986 7.04738 0.680986 6.65686 1.07151L0.292895 7.43547ZM15 7.14258L1 7.14258V9.14258L15 9.14258V7.14258Z" fill="#0097FF"/>
                </svg>
                */}
                <h1>Order Summary</h1>
                <div className="upper">
                    <div>
                        <img src="/mtn.png" alt="Logo" />
                        <h3>{name || 'Name'}</h3>
                    </div>

                    <h2>&#8358;&nbsp;{amount.toLocaleString()}</h2>

                    <div style={{ justifyContent: 'space-between' }}>
                        <h5>&#8358;&nbsp;{denomination ? denomination.toLocaleString() : 'null'}</h5>
                        <h5>{quantity || 'null'}</h5>
                    </div>

                    <div style={{ justifyContent: 'space-between' }}>
                        <p>{date || 'null'}</p>
                        <p>{ time || 'null' }</p>
                    </div>

                    <div style={{ justifyContent: 'space-between', fontSize: '12px', color: 'gray' }}>
                        <p>OrderId:</p>
                        <p>{id}</p>
                    </div>
                </div>

                {/* <div className="lower">
                    <button>
                        Print Pins
                    </button>
                </div> */}
            </div>
        </React.Fragment>
    );
}

export default HistoryView;
