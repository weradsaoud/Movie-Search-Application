import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ search }) => {
    const [searchText, setSearchText] = useState("");

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        search(searchText);
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center">
            <input
                type="text"
                value={searchText}
                onChange={handleChange}
                className="bg-gray-100 hover:bg-gray-200 rounded-l-full h-12 w-52 sm:w-80 px-4"
                placeholder="Search..."
            />
            <button
                type="submit"
                className="bg-gray-600 hover:bg-gray-900 rounded-r-full h-12 w-12 flex justify-center items-center"
            >
                <FaSearch className="text-white" />
            </button>
        </form>
    );
};

export default SearchBar;
