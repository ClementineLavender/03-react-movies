import axios from 'axios';
import type { Movie } from '../types/movie';

interface MoviesHttpResponse {
    results: Movie[];
}

export const fetchMovies = async (movieName: string): Promise<Movie[]> => {
    const response = await axios.get<MoviesHttpResponse>(
        'https://api.themoviedb.org/3/search/movie',
        {
            params: {
                query: movieName,
            },
            headers: {
                Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
            },
        }
    );
    // console.log(response.data.results);

    return response.data.results;
};