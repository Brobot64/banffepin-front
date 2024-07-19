import React from 'react'
import { telcoUser } from '../../minst'
import HistItem from './HistItem'
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal';
import HistoryView from './HistoryView';

const FullHistory = () => {
    const navigate = useNavigate();
    const [component, setComponent] = React.useState();
    const [isOpen, setIsOpen] = React.useState(false);

    const hanldeModalChange = () => setIsOpen(!isOpen);

    const handleReturn = () => {
        navigate(-1);
    }

    const handleClick = (comp) => {
        setIsOpen(true);
        setComponent(comp);
    }

  return (
    <React.Fragment>
        <Modal isOpen={isOpen} onClose={hanldeModalChange} children={<HistoryView data={component}/>}/>
        <div className="fullhistory">
            <svg onClick={handleReturn} xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                    <path d="M0.292895 7.43547C-0.0976295 7.826 -0.0976295 8.45916 0.292895 8.84968L6.65686 15.2136C7.04738 15.6042 7.68055 15.6042 8.07107 15.2136C8.46159 14.8231 8.46159 14.19 8.07107 13.7994L2.41422 8.14258L8.07107 2.48572C8.46159 2.0952 8.46159 1.46203 8.07107 1.07151C7.68055 0.680986 7.04738 0.680986 6.65686 1.07151L0.292895 7.43547ZM15 7.14258L1 7.14258V9.14258L15 9.14258V7.14258Z" fill="#0097FF"/>
            </svg>
            <h2>transaction history</h2>
            <div className="history">
                {
                    telcoUser.map((item, index) => (
                        <HistItem data={item} key={index} onClick={() => handleClick(item)}/>
                    ))
                }
                {
                    telcoUser.map((item, index) => (
                        <HistItem data={item} key={index} onClick={() => handleClick(item)}/>
                    ))
                }
                {
                    telcoUser.map((item, index) => (
                        <HistItem data={item} key={index}/>
                    ))
                }
            </div>
        </div>
    </React.Fragment>
  )
}

export default FullHistory