import { useLocation } from 'react-router-dom';
import './info.css';
import info_json from './info.json'; 

export default function Potability() {
    const location = useLocation();
    const { message } = location.state || {}; 

    return (
        <div className='info-page'>
            <h1>{message}</h1>
            <p className='info-text'>{info_json[message].text1}</p>
            <p className='info-text'>{info_json[message].text2}</p>
            <a href="/"><button>Back</button></a>
        </div>
    );
}