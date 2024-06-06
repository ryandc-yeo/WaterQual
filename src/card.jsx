import PropTypes from 'prop-types';
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from 'react-router-dom';
import './card.css';

export default function Card({title, placeholder, value, onChange}) {
    const handleInputChange = (e) => {
        console.log(`Input for ${title}:`, e.target.value);  
        onChange(title, e.target.value);  // Pass the title and the new value to the onChange handler
    };

    return (
        <div className='card'>
            <div className='row'>
                <h2>{title}</h2>
                {/* {isRequired ? <span className='required'>*</span> : null} */}
            </div>
            <div className='row'>
                <Link 
                    to='/info'
                    state={{ title }}
                    className='info-button' 
                >
                    <IoIosInformationCircleOutline className='info' />
                </Link>
                <input 
                    className='input-field' 
                    placeholder={placeholder} 
                    value={value}
                    onChange={handleInputChange}          
                    />
            </div>
            <div className='card2'></div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
}