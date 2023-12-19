import { API_KEY, TMDB_API_BASE_URL } from "../config/config";

export function buildURL(page = 1, query) {
    if (query) {
        return `${TMDB_API_BASE_URL}search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
    }
    return `${TMDB_API_BASE_URL}movie/popular?api_key=${API_KEY}&page=${page}`;
}