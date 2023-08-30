import PropTypes from 'prop-types';

export default function Popover({ children }) {

    return (
        <div id="popoverContainer">
            {children}
        </div>
    );

}

Popover.propTypes = {
    children: PropTypes.node.isRequired,
};