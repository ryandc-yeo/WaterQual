import { useLocation } from 'react-router-dom';
import './info.css';
import info_json from './info.json'; 

export default function Info() {
    const location = useLocation();
    const { title } = location.state || { title: 'pH' };

    return (
        <div className='info-page'>
            <h1>{title}</h1>
            <p className='info-text'>{info_json[title].text1}</p>
            <p className='info-text'>{info_json[title].text2}</p>
            <a href="/"><button>Back</button></a>
        </div>
    );
}