import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import ParkingCard from './Components/ParkingCard'

import CardParkDetailModal from './Components/CardParkDetailModal';
import { Button, Card, Dropdown, DropdownButton, Form } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const url = 'https://api.data.gov.hk/v1/carpark-info-vacancy?data=vancancy&vehicleTypes=LGV&lang=en_US';

function App() {
    //State management
    const [state, setState] = useState([]);
    const [content, setContent] = useState({});
    const [searchName, setSearchName] = useState('');

    useEffect(() => {
        getAllCarPark()
        console.log('Hello');
    }, []);

    async function filterVehicle(category) {
        const newUrl = `https://api.data.gov.hk/v1/carpark-info-vacancy?data=vancancy&vehicleTypes=${category}&lang=en_US`;
        const { data } = await axios.get(newUrl);
        setState(data.results);
    }

    async function getAllCarPark() {
        //Fetch data from api
        const { data } = await axios.get(url);
        //Set state
        setState(data.results);
    }

    function addContent(content) {
        setContent(content);
    }

    function handleSearch() {
        // Search base on all of the car park

        // getAllCarPark();
        let tmp = []

        if (searchName === '') {
            getAllCarPark();
        }

        state.map(item => {
            if (item.name.toLowerCase().includes(searchName.toLowerCase())) {
                tmp.push(item);
            }
        })

        if (tmp.length > 0) {
            setState(tmp);

        } else {
            alert("No result found");
            getAllCarPark();
        }
        // console.log(tmp);
    }

    // function find

    //Trigger when the state is change
    // useEffect(() => {
    //     console.log(state);
    // }, [state]);

    return (
        <div className="App">
            {/* SearchBar */}
            <form className="input-group rounded input__small" onSubmit={(e) => {
                e.preventDefault();
                handleSearch();
            }}>
                <input type="search" className="form-control rounded" placeholder="Search Parking Name"
                    aria-label="Search"
                    aria-describedby="search-addon" value={searchName} onChange={(e) => { setSearchName(e.target.value) }} />
                <button className="input-group-text border-0" id="search-addon" type="submit">
                    <i className="fas fa-search"></i>
                </button>
                <div className="home">
                    <button className="home__btn" onClick={() => { getAllCarPark() }}>All</button>
                </div>
            </form>
            {/* Dropdown Menu group/ */}
            <div className="dropdown" style={{ marginBottom: "10px" }}>
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                    data-toggle="dropdown" aria-haspopup="true" data-bs-toggle="dropdown">
                    Select Vehicle Type
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <a className="dropdown-item" onClick={() => { filterVehicle('privateCar') }}>Private Car</a>
                    <a className="dropdown-item" onClick={() => { filterVehicle('coach') }}>Coach</a>
                    <a className="dropdown-item" onClick={() => { filterVehicle('motorCycle') }}>Motor Cycle</a>
                </div>
            </div>

            {/*Card display*/}

            <div className="row">
                {
                    state.map((item, index) => (
                        //Render item from API
                        <ParkingCard data={item} key={index} addContent={addContent} />
                    ))
                }
            </div>

            {/* Display Parking Modal Detail */}
            <CardParkDetailModal data={content} />
        </div>
    );
}

export default App;
