import PropTypes from 'prop-types';

function ButtonPrimary({ children, className }) {
    return (
        <button type="button" className={`btn btn-primary ${className}`}>{children}</button>
    );
}

ButtonPrimary.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string
};

export default ButtonPrimary;