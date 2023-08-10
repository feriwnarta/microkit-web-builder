export default function SearchButton() {
    return (
        <div className="search-container">
            <input type="text" className="form-control" id="searchInput" placeholder="Search Component" />
            <div className="search-box">
                <i className="search-icon"></i>
            </div>
        </div>

    );
}