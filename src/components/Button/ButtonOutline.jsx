import PropTypes from 'prop-types';

function ButtonOutline({ children, className }) {
    return (
        <button type="button" className={`btn btn-outline-primary ${className}`}>{children}</button>
    );
}


ButtonOutline.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default ButtonOutline;




