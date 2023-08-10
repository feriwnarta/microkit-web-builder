import PropTypes from 'prop-types';
import { useRenderContext } from "../../context/RenderContext";

function onClick(icon, setSizeRender) {



    switch (icon) {
        case 'tablet-icon':
            setSizeRender({ minWidth: "768px" });
            break;
        case 'desktop-icon':
            setSizeRender({ width: "100%" });
            break;
        case 'phone-icon':
            setSizeRender({ width: "390px" });
            break;
        default:
            setSizeRender({ width: "100%" });
            break;
    }
}

function ButtonResponsive({ icon }) {
    const { setSizeRender } = useRenderContext();

    return (
        <button
            type="button"
            className="btn btn-icon"
            onClick={() => onClick(icon, setSizeRender)}
        >
            <i className={icon}></i>
        </button>
    );
}

ButtonResponsive.propTypes = {
    icon: PropTypes.string.isRequired,
};

export default ButtonResponsive;
