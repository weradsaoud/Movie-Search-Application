import React, { useEffect, useState } from 'react';
import MovieCard from '../moviecard/moviecard';

function Favorites() {

    const [movies, setMovies] = useState([]);

    const localStorageChangedHandler =  () => {
        console.log("localStorageChangedHandler");
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        console.log("favorites: ", favorites);
        setMovies(favorites);
    };

    useEffect(() => {
        document.addEventListener('localStorageChanged', localStorageChangedHandler);
        let favorites = JSON.parse(localStorage.getItem('favorites'));
        setMovies(favorites);
        return () => {
            document.removeEventListener('localStorageChanged', localStorageChangedHandler);
        };
    }, []);

    return (
        <section className="max-w-[1200px] w-full mx-auto md:px-8 sm:px-6 px-4 xl:px-0">
            <div className="flex w-fit flex-wrap xs:gap-4 gap-[14px] justify-center mt-5">
                {movies?.map((movie, index) => (
                    <MovieCard key={index} isFavorite={true} movie={movie}  />
                ))}
            </div>
        </section>
    );
}

export default Favorites;

