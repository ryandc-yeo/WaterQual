import PropTypes from 'prop-types';

export default function Card({title, isRequired=false}) {
    return (
        <div className='card'>
            <h2>{title}</h2>
            {isRequired ? <span className='required'>*</span> : null}
        </div>
    )
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    isRequired: PropTypes.bool
}