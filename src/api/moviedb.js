import axios from "axios";
import {apiKey} from '../constants/index'

//end point
const apiBaseUrl = 'https://api.themoviedb.org/3'
const trendingMovies = `${apiBaseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingMovies = `${apiBaseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedMovies = `${apiBaseUrl}/movie/top_rated?api_key=${apiKey}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${apiKey}`

// dynamicEndpoint
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${apiKey}`
const movieSimilarEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${apiKey}`
const personDetailEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${apiKey}`
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${apiKey}`


export const image500 = path => path? `https://image.tmdb.org/t/p/w500${path}`: null
export const image342 = path => path? `https://image.tmdb.org/t/p/w342${path}`: null
export const image185 = path => path? `https://image.tmdb.org/t/p/w185${path}`: null

export const fallbackMoviePoster = 'https://images.hindustantimes.com/img/2022/12/25/1600x900/netflix_1671946334689_1671946334899_1671946334899.JPG'
export const fallbackPersonImage = "https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png"

const apiCall = async(endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params:{}
    }

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(err){
        console.log('error:',err)
        return{}
    }
}

export const fetchTrendingMovies= ()=>{
    return apiCall(trendingMovies)
}
export const fetchUpcomingMovies= ()=>{
    return apiCall(upcomingMovies)
}
export const fetchTopratedMovies= ()=>{
    return apiCall(topRatedMovies)
}

export const fetchMovieDetails =id=>{
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchCreditDetails =id=>{
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarDetails =id=>{
    return apiCall(movieSimilarEndpoint(id))
}
export const fetchPersonDetails =id=>{
    return apiCall(personDetailEndpoint(id))
}
export const fetchPersonMovies =id=>{
    return apiCall(personMoviesEndpoint(id))
}
export const fetchSearchMovies =(params)=>{
    return apiCall(searchMoviesEndpoint, params)
}