import React from 'react'
import { allOtherTelcos } from '../../minst';
import { colorArray } from '../../minst';
import { getFirstLetter } from '../../minst';
import { getRandomText } from '../../minst';

const OtherTelco = ({ telco, handleTelcoChange, }) => {
    // const randomColor = getRandomText(colorArray);
    // const colstr = `#${randomColor}`;
  return (
    <React.Fragment>
        <div className="othertelco scrollable">
            <h4>Other Telcos: </h4>
            {
                allOtherTelcos.map((item, index) => (
                    <div className={`telco ${telco && telco.toLowerCase() === item.toLowerCase() && 'active'}`} key={index} onClick={() => handleTelcoChange(item)}>
                        <div className="badgeR" style={{ background: `#${getRandomText(colorArray)}` }}>{getFirstLetter(item)}</div>
                        
                        <h6>{item}</h6>
                    </div>
                ))
            }
            <div className="telco">
                {/* <img src="/airtel.png" alt="banffpay telco" /> */}
                {/* <div className="badgeR" style={{ background: `${colstr}` }}>{getFirstLetter('airtel')}</div>
                <h6>airtel</h6> */}
            </div>
        </div>
    </React.Fragment>
  )
}

export default OtherTelco