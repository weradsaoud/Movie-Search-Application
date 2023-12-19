import axios from "axios";
import { buildURL } from "../utils/functions";
import { API_KEY } from "../config/config";

export async function getPopular() {
    return await axios.get(buildURL())
        .then(response => {
            return response.data.results
        })
        .catch(err => {return {err: err, isErr: true}});
}

export async function searchMovies(page, query) {
    return await axios.get(buildURL(page, query))
        .then(response => {
            return response.data.results
        })
        .catch(err => {return {err: err, isErr: true}});
}

export async function getGeners(id) {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`)
    .then((res) => {
        return res.data;
    }).catch(err => {return {err: err, isErr: true}});
}

