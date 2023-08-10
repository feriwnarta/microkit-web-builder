import PropTypes from 'prop-types';
import Test from '../../assets/Ellipse 1.png';

function ButtonAvatar({ className }) {
    return (
        <img src={Test} className={`avatar ${className}`} />
    );
}

ButtonAvatar.propTypes = {
    className: PropTypes.string.isRequired
};



export default ButtonAvatar;