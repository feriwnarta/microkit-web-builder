import PropTypes from 'prop-types';

function ButtonPrimary({ children, className, id = '' }) {
    return (
        <button type="button" className={`btn btn-primary ${className}`} id={id}>{children}</button>
    );
}

ButtonPrimary.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    id: PropTypes.string
};

export default ButtonPrimary;