import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { TMDB_IMG_URL } from '../../config/config';
import { getGeners } from '../../services/services';

function Details() {
  const [geners, setGeners] = useState([]);
  const [casts, setCasts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  var movie = location.state;
  useEffect(() => {
    getGeners(movie.id).then(res => {
      if(res.isErr) {
        navigate('/err', {state: res.err.response.data.status_message})
        return;
      }
      setGeners(res.genres);
      setCasts(res.credits.cast)
    }).catch(err => navigate('/err', {state: err.message}));
  }, []);

  console.log(movie);
  return (

    <div className="w-full h-screen bg-cover bg-center bg-no-repeat pt-10" style={{ backgroundImage: `url('${TMDB_IMG_URL}${movie.backdrop_path}')` }}>
      {/* details div */}
      <div className='flex ml-2 sm:ml-9 md:ml-16 mr-2 sm:mr-16'>
        {/* written details */}
        <div className='w-full sm:w-1/2 bg-zinc-600 bg-opacity-40 p-1 sm:p-3 rounded-xl'>
          {/* title */}
          <p className='font-serif text-lg sm:text-4xl text-white opacity-100 sm:font-extrabold'>
            {movie.title}
          </p>
          {/* generes */}
          <div className={`flex text-center justify-around max-w ${geners.length > 3 ? 'max-w-sm' : 'max-w-xs'} mt-2`}>
            {
              geners.map(gener => {
                return <div className='text-white text-sm sm:text-lg rounded-xl border-2 p-1'>
                  {gener.name}
                </div>
              })
            }
          </div>
          {/* overview */}
          <p className='text-white text-sm sm:text-lg'>
            {movie.overview}
          </p>
        </div>
        {/* poster image */}
        <div className='w-40 hidden sm:block h-fit ml-5 shadow-2xl rounded-xl bg-white'>
          <img className='shadow-2xl rounded-xl bg-white' src={`${TMDB_IMG_URL}${movie.poster_path}`} />
        </div>
      </div>
      {/* top casts */}
      <div className='ml-2 sm:ml-9 md:ml-16 mr-2 sm:mr-16'>
        <div className='w-full text-xl font-bold text-white mb-3'>Top Casts</div>
        <div className='flex w-fit flex-wrap xs:gap-4 gap-[14px] justify-center'>
          {
            casts.slice(0, 5).map(cast => {
              return <div class="block w-fit sm:ml-2 mb-3 sm:mb-0 rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
                <img
                  class="rounded-t-lg h-36 object-cover sm:h-40 sm:w-full"
                  src={`https://image.tmdb.org/t/p/original${cast.profile_path}`}
                  alt={cast.original_name} />
                <div class=" p-1">
                  <p
                    class="text-xs sm:text-md leading-tight text-neutral-800 dark:text-neutral-50">
                    {cast.original_name}
                  </p>
                </div>
              </div>
            })
          }
        </div>
      </div>
    </div>
  );
}

export default Details