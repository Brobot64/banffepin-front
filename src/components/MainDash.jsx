import React, { useEffect } from 'react'
import { getAllPins, getAllSchedules, getAllSoldPins, getAllTelcos, getAllUnsoldPins } from '../backies/schedulers';
import Modal from './Modal';
import CreateSchedule from './CreateSchedule';
import Schedules from './Schedules';
import TecloProviders from './TecloProviders';
import CreateTelco from './CreateTelco';
import SeperateTecloPin from './SeperateTecloPin';
import RegisterUser from './RegisterUser';

const MainDash = () => {
    const [schedulers, setSchedulers] = React.useState();
    const [telcos, setTelcos] = React.useState(23);
    const [pins, setPins] = React.useState(23);
    const [soldPins, setSoldPins] = React.useState(23);
    const [unSoldPins, setUnSoldPins] = React.useState(23);
    const [open, SetOpen] = React.useState(false);
    const [component, setComponent] = React.useState();

    const onOpen = () => SetOpen(!open);

    const openModel = (component) => {
        SetOpen(true);
        setComponent(component);
    }

    const separateAndCountPins = (data, criteria) => {
        // Check if data is an array
        // if (!Array.isArray(data)) {
        //   throw new Error('Input data must be an array');
        // }
    
        const separatedPins = {};
      
        // Loop through each pin in the data
        data.forEach((pin) => {
          // Access the specified criteria value
          const criteriaValue = pin[criteria];
      
          if (!separatedPins[criteriaValue]) {
            separatedPins[criteriaValue] = [];
          }
      
          // Add the current pin to the corresponding array in separatedPins
          separatedPins[criteriaValue].push(pin);
        });
      
        // Create an object to store counts
        const counts = {};
      
        // Loop through the keys of separatedPins to count the pins
        for (const key in separatedPins) {
          if (Object.prototype.hasOwnProperty.call(separatedPins, key)) {
            counts[key] = separatedPins[key].length;
          }
        }
      
        return { separatedPins, counts };
      }
      
    //   const resultByTelco = separateAndCountPins(response, 'telco');
    //   console.log(resultByTelco);
      
    //   const resultByDenomination = separateAndCountPins(response, 'denomination');
    //   console.log(resultByDenomination);
      
    // Get Datas
    useEffect(() => {
        const fetchSchedulers = async () => {
            try {
                const response = await getAllSchedules();
                if (response.status === 200 || response.status === 201) setSchedulers(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchSchedulers();
    }, [])

    useEffect(() => {
        const fetchTelcos = async () => {
            try {
                const response = await getAllTelcos();
                if (response.status === 200 || response.status === 201) setTelcos(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchTelcos();
    }, [])

    useEffect(() => {
        const fetchPins = async () => {
            try {
                const response = await getAllPins();
                if (response.status === 200 || response.status === 201) {
                    setPins(response.data)
                    console.log("pins", response.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchPins();
    }, [])

    useEffect(() => {
        const fetchSoldPins = async () => {
            try {
                const response = await getAllSoldPins();
                if (response.status === 200 || response.status === 201) setSoldPins(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchSoldPins();
    }, [])

    useEffect(() => {
        const fetchUnsoldPins = async () => {
            try {
                const response = await getAllUnsoldPins();
                if (response.status === 200 || response.status === 201) setUnSoldPins(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchUnsoldPins();
    }, [])
    // End Get Datas
  return (
    <React.Fragment>
        <React.Fragment>
            <Modal isOpen={open} onClose={onOpen} children={component}/>
            <div className="top-major">
                <div className="liment">
                    <div className="legion">
                        <h3>Schedulers</h3>
                        <h2>{schedulers ? schedulers.length : 0}</h2>
                    </div>

                    <div className="fawn">
                        <button onClick={() => openModel(<Schedules schedules={schedulers}/>)}>
                            view
                        </button>

                        <button onClick={() => openModel(<CreateSchedule/>)}>
                            New
                        </button>
                    </div>
                </div>

                <div className="liment">
                    <div className="legion">
                        <h3>Telcos</h3>
                        <h2>{telcos ? telcos.length : 0}</h2>
                    </div>

                    <div className="fawn">
                        <button onClick={() => openModel(<TecloProviders providers={telcos}/>)}>
                            view
                        </button>

                        <button onClick={() => openModel(<CreateTelco schedulers={schedulers}/>)}>
                            new
                        </button>
                    </div>

                </div>

                <div className="liment">
                    <div className="legion">
                        <h3>Total Pins</h3>
                        <h2>{pins ? pins.length : 23}</h2>
                    </div>
                    <button onClick={() => openModel(<SeperateTecloPin epinscounts={separateAndCountPins(pins,'telco').counts}/>)}>
                        view
                    </button>
                </div>

                <div className="liment">
                    <div className="legion">
                        <h3>Unsold</h3>
                        <h2>{unSoldPins ? unSoldPins.length : 23}</h2>
                    </div>
                    <button onClick={() => openModel(<SeperateTecloPin epinscounts={separateAndCountPins(unSoldPins,'telco').counts}/>)}>
                        view
                    </button>
                </div>

                <div className="liment">
                    <div className="legion">
                        <h3>Sold</h3>
                        <h2>{soldPins ? soldPins.length : 32}</h2>
                    </div>
                    <button onClick={() => openModel(<SeperateTecloPin epinscounts={separateAndCountPins(soldPins,'telco').counts}/>)}>
                        view
                    </button>
                </div>
            </div>

            <div className="next-major">
                <button onClick={() => openModel(<RegisterUser />)}>
                    Create User
                </button>
            </div>
        </React.Fragment>
    </React.Fragment>
  )
}

export default MainDash