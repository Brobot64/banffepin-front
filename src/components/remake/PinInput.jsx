import React from 'react'
import ResponseDisp from './ResponseDisp';
import { addTransactionPin } from '../../backies/schedulers';

const PinInput = ({isPin = false, handleSubmit}) => {
    const [otp, setOtp] = React.useState('');
    const inputs = React.useRef([]);

    const handleChange = (event, index) => {
        const value = event.target.value;
        if (/\d/.test(value) || value === '') { // Only allow digits or empty string
          setOtp(otp.slice(0, index) + value + otp.slice(index + 1));
          if (index < inputs.current.length - 1 && value.length) {
            inputs.current[index + 1].focus(); // Move focus to next box on input
          }
        }
    };
    
    const handleKeyUp = (event, index) => {
        // @ts-ignore
        if (event.key === 'Backspace' && index > 0 && !event.target.value) {
          inputs.current[index - 1].focus(); 
        }
    };


    return (
        <React.Fragment>
            {isPin ? (
                <div className="otp-container">
                {/* {isLoading &&
                  <div className="top-notch-spinner">
                    <Spinner size={'30px'} color={'white'}/>
                  </div>
                } */}
                {/* {responseMsg && <ResponseMessage message={responseMsg}/>} */}
                <h1>Enter Pin</h1>
                <div className="otp-boxes">
                  {Array(4).fill(0).map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      className="otp-box"
                      // @ts-ignore
                      maxLength="1"
                      // @ts-ignore
                      ref={(el) => (inputs.current[index] = el)}
                      value={otp[index] || ''} // Set value based on otp state
                      onChange={(e) => handleChange(e, index)}
                      onKeyUp={(e) => handleKeyUp(e, index)}
                    />
                  ))}
                </div>  
               
                <div className="btnsi">
                  <button onClick={() => handleSubmit(otp)}>Pay</button>
                  {/* <button>Resend OTP</button> */}
                </div>
              </div>
            ) : (
                <SetPin/>
            )}
        </React.Fragment>
      );
}

export default PinInput



export const SetPin = () => {
    const [otp, setOtp] = React.useState('');
    const [confirmOtp, setConfirmOtp] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const [error, setError] = React.useState('');

    const inputs = React.useRef([]);
    const secinputs = React.useRef([]);

    const handleChange = (event, index) => {
        const value = event.target.value;
        if (/\d/.test(value) || value === '') { // Only allow digits or empty string
          setOtp(otp.slice(0, index) + value + otp.slice(index + 1));
          if (index < inputs.current.length - 1 && value.length) {
            inputs.current[index + 1].focus(); // Move focus to next box on input
          }
        }
    };

    const handleSecChange = (event, index) => {
        const value = event.target.value;
        if (/\d/.test(value) || value === '') { // Only allow digits or empty string
          setConfirmOtp(confirmOtp.slice(0, index) + value + confirmOtp.slice(index + 1));
          if (index < secinputs.current.length - 1 && value.length) {
            secinputs.current[index + 1].focus(); // Move focus to next box on input
          }
        }
    };
    
    const handleKeyUp = (event, index) => {
        // @ts-ignore
        if (event.key === 'Backspace' && index > 0 && !event.target.value) {
          inputs.current[index - 1].focus(); 
        }
    };

    const handleSecKeyUp = (event, index) => {
        // @ts-ignore
        if (event.key === 'Backspace' && index > 0 && !event.target.value) {
          secinputs.current[index - 1].focus(); 
        }
    };

    const handleConfirm = async () => {
        const userTkn = localStorage.getItem('token');

        if (otp !== confirmOtp) {
            setIsError(true);
            setError('Pin not Matched');

            setTimeout(() => {
                setError();
            }, 3000);
            return;
        }

        const setPin = await addTransactionPin(userTkn, { pin: otp, confirmPin: confirmOtp });

        if (setPin.status === 200 && setPin.status === 201) {
            setIsError(false)
            setError('Transaction Pin is set');
            setTimeout(() => {
                window.location.reload();
            }, 5000);
            return;
        } else {
            setIsError(true);
            setError("Unable to Set Pin");
            setTimeout(() => {
                window.location.reload();
            }, 5000);
            return;
        }
    }

  return (
    <React.Fragment>
        <div className="otp-container">
            {
                error && <ResponseDisp msg={error} isError={isError}/>
            }
            <h1>Set Your Transaction Pin</h1>
            <label htmlFor="">Pin</label>
            <div className="otp-boxes">
                {Array(4).fill(0).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className="otp-box"
                    // @ts-ignore
                    maxLength="1"
                    // @ts-ignore
                    ref={(el) => (inputs.current[index] = el)}
                    value={otp[index] || ''} // Set value based on otp state
                    onChange={(e) => handleChange(e, index)}
                    onKeyUp={(e) => handleKeyUp(e, index)}
                  />
                ))}
              </div>

            <label htmlFor="">Confirm Pin</label>
            <div className="otp-boxes">
                {Array(4).fill(0).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    className="otp-box"
                    // @ts-ignore
                    maxLength="1"
                    // @ts-ignore
                    ref={(el) => (secinputs.current[index] = el)}
                    value={confirmOtp[index] || ''} // Set value based on otp state
                    onChange={(e) => handleSecChange(e, index)}
                    onKeyUp={(e) => handleSecKeyUp(e, index)}
                  />
                ))}
              </div>

              <div className="btnsi">
                <button onClick={handleConfirm}>Set Pin</button>
                {/* <button>Resend OTP</button> */}
              </div>
        </div>
    </React.Fragment>
  )
}
