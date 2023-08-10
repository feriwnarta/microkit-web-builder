import Accordion from "../Accordion/Accordion";
import SearchButton from "../Search/SearchButton";


function Sidebar() {
    return (
        <div className="sidebar">
            <SearchButton></SearchButton>
            <Accordion></Accordion>

        </div >


    );
}

export default Sidebar;