import React from 'react'
import { telcoUser } from '../../minst'
import HistItem from './HistItem'
import TelcoProv from './TelcoProv'
import Modal from '../Modal'
import OtherTelco from './OtherTelco'
import Loader from './Loader'

const MobileDash = () => {
    const [selector, setSelector] = React.useState(false);
    const [openModal, setOpenModal] = React.useState(false);
    const [telco, setTelco] = React.useState();
    const [loader, setLoader] = React.useState(false);

    const handleTelco = (name) => {
        setTelco(name.toLowerCase());
        setSelector(true);
    }

    const handleLoader = () => setLoader(!loader);

    const handleSelector = (e) => {
        setSelector(true);
    };

    const handleModal = () => setOpenModal(!openModal);



  return (
    <React.Fragment>
        {loader && <Loader/>}
        <Modal isOpen={openModal} onClose={handleModal} children={<OtherTelco/>}/>
        <div className="mobiledash">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                <path d="M0.292895 7.43547C-0.0976295 7.826 -0.0976295 8.45916 0.292895 8.84968L6.65686 15.2136C7.04738 15.6042 7.68055 15.6042 8.07107 15.2136C8.46159 14.8231 8.46159 14.19 8.07107 13.7994L2.41422 8.14258L8.07107 2.48572C8.46159 2.0952 8.46159 1.46203 8.07107 1.07151C7.68055 0.680986 7.04738 0.680986 6.65686 1.07151L0.292895 7.43547ZM15 7.14258L1 7.14258V9.14258L15 9.14258V7.14258Z" fill="#0097FF"/>
            </svg>

            <h3>buy e-pins</h3>

            <div className="balancebadge">
                <p>available balance</p>
                <h2>&#8358;&nbsp;15,000</h2>
                <a href="">schedule transactions&nbsp;&gt;</a>
            </div>

            <div className="telcogather">
                <div className='alltelco'>
                    <div className="telco" onClick={() => handleTelco('Aitrile')}>
                        <img src="/airtel.png" alt="banffpay telco" />
                        <h6>airtel</h6>
                    </div>
                    <div className="telco" onClick={() => handleTelco('glo')}>
                        <img src="/glo.png" alt="banffpay telco" />
                        <h6>glo</h6>
                    </div>
                    <div className="telco" onClick={() => handleTelco('MTN')}>
                        <img src="/mtn.png" alt="banffpay telco" />
                        <h6>MTN</h6>
                    </div>
                    <div className="telco" onClick={() => handleTelco('9mobile')}>
                        <img src="/9mobile.png" alt="banffpay telco" />
                        <h6>9 Mobile</h6>
                    </div>
                </div>

                <button onClick={handleModal}>
                    others 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="down-arrow"><path d="M16 22a2 2 0 0 1-1.41-.59l-10-10a2 2 0 0 1 2.82-2.82L16 17.17l8.59-8.58a2 2 0 0 1 2.82 2.82l-10 10A2 2 0 0 1 16 22Z"></path></svg>
                </button>
            </div>  

            {selector && <TelcoProv telname={telco} handleLoader={handleLoader}/>}

            <div className="recenttransact">
                <div className="top-action">
                    <p>recent transactions</p>
                    <a href="/mobile/history">View all</a>
                </div>
                <div className="history">
                    {
                        telcoUser.map((item, index) => (
                            <HistItem data={item} key={index}/>
                        ))
                    }
                </div>
            </div>
        </div>
    </React.Fragment>
  )
}

export default MobileDash