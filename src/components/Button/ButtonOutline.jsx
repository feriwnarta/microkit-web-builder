import PropTypes from 'prop-types';

function ButtonOutline({ children, className = '', id = '', onClick }) {
    return (
        <button
            type="button"
            className={`btn btn-outline-primary ${className}`}
            id={id}
            onClick={onClick}
        >
            {children}
        </button>
    );
}



ButtonOutline.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    id: PropTypes.string,
    onClick: PropTypes.func,
};

export default ButtonOutline;




