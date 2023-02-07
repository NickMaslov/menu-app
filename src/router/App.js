import { useState, useEffect } from 'react';
import { fetchPlaces } from '../apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        // fetchPlaces();

        fetchPlaces()
            .then((data) => setPlaces(data.results))
            .catch((e) => console.error(e));
    }, []);

    const notify = () => toast('🦄 Wow so easy!');

    return (
        <div>
            <button onClick={notify}>Notify!</button>
            {places.map((place) => (
                <div key={place.id}>
                    <h5>{place.name}</h5>
                    <img src={place.image} alt='' width={100} height={100} />
                </div>
            ))}
            <ToastContainer />
        </div>
    );
}

export default App;
