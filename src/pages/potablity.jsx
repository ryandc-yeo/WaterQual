import { useLocation } from 'react-router-dom';
import './info.css';
import info_json from './info.json'; 

export default function Potability() {
    const location = useLocation();
    const { title, message } = location.state || { title: 'Unknown', message: 'No data received.' }; 

    return (
        <div className='info-page'>
            <h1>{title}</h1>
            <p className='info-text'>{info_json[title].text1}</p>
            <p className='info-text'>{info_json[title].text2}</p>
            <p className='info-text'>{message}</p>
            <a href="/"><button>Back</button></a>
        </div>
    );
}