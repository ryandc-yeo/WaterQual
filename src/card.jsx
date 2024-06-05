import PropTypes from 'prop-types';
import { IoIosInformationCircleOutline } from "react-icons/io";
import './card.css';

export default function Card({title, isRequired=false}) {
    return (
        <div className='card'>
            <div className='row'>
                <h2>{title}</h2>
                {isRequired ? <span className='required'>*</span> : null}
            </div>
            <div className='row'>
                <IoIosInformationCircleOutline className='info' />
                <input className='input-field' />
            </div>
            <div className='card2'></div>
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    isRequired: PropTypes.bool
}