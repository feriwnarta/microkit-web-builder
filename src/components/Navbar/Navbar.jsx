import MicrokitIcon from '../../assets/svg/MicroKit.svg';
import ButtonResponsive from '../Button/ButtonResponsive';
import ButtonOutline from '../Button/ButtonOutline';
import ButtonPrimary from '../Button/ButtonPrimary';
import ButtonAvatar from '../Button/ButtonAvatar';
import LivePreview from '../../services/LivePreview/live';
import { useRenderContext } from '../../context/RenderContext';


function livePreview(html) {

    LivePreview(html);

}

function Navbar() {
    const { renderContent } = useRenderContext();


    const style = {
        margin: "0 3rem",
        padding: "0px"
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid" style={style}>
                <a className="navbar-brand" href="#">
                    <img src={MicrokitIcon} alt="" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav mx-auto">
                        <li className="nav-item">
                            <ButtonResponsive icon="desktop-icon" />
                        </li>
                        <li className="nav-item">
                            <ButtonResponsive icon="tablet-icon" />
                        </li>
                        <li className="nav-item">
                            <ButtonResponsive icon="phone-icon" />
                        </li>
                    </ul>

                    <div className='d-flex flex-row'>
                        <ButtonOutline id='btnLivePreview' onClick={() => livePreview(renderContent)}>Live Preview</ButtonOutline>
                        <ButtonPrimary className='ml-075' id='btnSiteToCode'>Site to Code</ButtonPrimary>
                        <ButtonAvatar className='ml-075'></ButtonAvatar>
                    </div>
                </div>


            </div>
        </nav>

    );
}

export default Navbar;