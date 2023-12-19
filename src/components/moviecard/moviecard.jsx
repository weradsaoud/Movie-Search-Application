import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { IconContext } from "react-icons";
import { TMDB_IMG_URL } from "../../config/config";
import { NavLink } from "react-router-dom";
import Pathes from "../../router/pathes";

const MovieCard = ({ movie, isFavorite }) => {
    // destructure movie object
    console.log("isFavorite: ", isFavorite);
    const { id, poster_path, title, release_date, overview } = movie;
    const [liked, setLiked] = useState(isFavorite);

    const handleLike = (e, movie) => {
        e.preventDefault();
        setLiked(!liked);
        let favoritesStr = localStorage.getItem("favorites");
        if (favoritesStr) {
            let favorites = JSON.parse(favoritesStr);
            liked ? favorites = favorites.filter((fav, idx) => fav.id !== movie.id) : favorites.push(movie);
            let favoritesString = JSON.stringify(favorites);
            localStorage.setItem('favorites', favoritesString);
            let localStorageChanged = new CustomEvent('localStorageChanged');
            document.dispatchEvent(localStorageChanged);
            return;
        }
        localStorage.setItem('favorites', JSON.stringify([movie]));
    }

    return (
        <NavLink to={`/${id}`} state={movie}>
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <div className="relative">
                    <img
                        className="w-full h-64 object-cover"
                        src={`${TMDB_IMG_URL}${poster_path}`}
                        alt={title}
                    />
                    <IconContext.Provider value={{ color: liked ? "red" : "black", size: "1em" }}>
                        <button
                            className="absolute bottom-0 left-0 m-2 bg-gray-200 rounded-full p-2"
                            onClick={(e) => handleLike(e, movie)}
                        >
                            <FaHeart />
                        </button>
                    </IconContext.Provider>
                </div>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <p className="text-gray-700 text-base">{release_date}</p>
                    <p title={overview} className="text-gray-700 text-base line-clamp-2">{overview}</p>
                </div>
            </div>
        </NavLink>
    );
};

export default MovieCard;
