import React, { useEffect, useState } from 'react'
import MovieCard from '../moviecard/moviecard';
import Loader from '../loader/loader';
import { getPopular, searchMovies } from '../../services/services';
import SearchBar from '../searchbar/searchbar';
import { useNavigate } from 'react-router-dom';


function Home() {

    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    let favorites = JSON.parse(localStorage.getItem('favorites'));

    useEffect(() => {
        getPopular().then(res => {
            if (res.isErr) {
                navigate('/err', { state: res.err.response.data.status_message })
                return;
            }
            setMovies(res);
            setLoading(false);
        }).catch(err => navigate('/err', { state: err.message }));
    }, []);

    const handleSearch = (searchText) => {
        setLoading(true);
        (searchText)? searchMovies(1, searchText).then(res => {
            if (res.isErr) {
                navigate('/err', { state: res.err.response.data.status_message })
                return;
            }
            setMovies(res);
            setLoading(false);
        }).catch(err => navigate('/err', { state: err.message })): 
        getPopular().then(res => {
            if (res.isErr) {
                navigate('/err', { state: res.err.response.data.status_message })
                return;
            }
            setMovies(res);
            setLoading(false);
        }).catch(err => navigate('/err', { state: err.message }));
    };

    return (
        <>
            <div className='w-full my-5 mx-1 flex justify-center align-middle'>
                <SearchBar search={handleSearch} />
            </div>
            <section className="max-w-[1200px] w-full mx-auto md:px-8 sm:px-6 px-4 xl:px-0">
                {
                    loading ? <Loader /> :
                        (movies.length > 0) ? <div className="flex w-fit flex-wrap xs:gap-4 gap-[14px] justify-center">
                            {movies?.map((movie, index) => (
                                <MovieCard
                                    key={index}
                                    movie={movie}
                                    isFavorite={favorites?.find(fav => fav.id === movie.id) ? true : false} />
                            ))}
                        </div> : <div className='w-full flex justify-center text-4xl '>There are no movies match your search</div>
                }
            </section>
        </>
    );
}

export default Home;