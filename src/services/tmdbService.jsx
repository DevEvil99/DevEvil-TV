// src/services/tmdbService.js
import axios from 'axios';

const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbService = axios.create({
  baseURL: BASE_URL,
});

export const getTrendingMovies = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/movie/popular?include_adult=false&api_key=${TMDB_API_KEY}&page=${page}`
    );

    const trendingMovies = response.data.results;

    const moviesWithImagesAndVideos = await Promise.all(
      trendingMovies.map(async (movie) => {
        const movieDetails = await tmdbService.get(
          `/movie/${movie.id}?include_adult=false&api_key=${TMDB_API_KEY}&append_to_response=images,videos`
        );
        return movieDetails.data;
      })
    );

    return moviesWithImagesAndVideos;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};



export const getNowPlayingMovies = async () => {
  try {
    const response = await tmdbService.get(`/movie/now_playing?include_adult=false&api_key=${TMDB_API_KEY}&append_to_response=videos,images`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw error;
  }
};

export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/movie/top_rated?include_adult=false&api_key=${TMDB_API_KEY}&page=${page}&append_to_response=videos,images`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular movies:', error);
    throw error;
  }
};

export const getTrendingTvShows = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/trending/tv/day?include_adult=false&api_key=${TMDB_API_KEY}&page=${page}&append_to_response=videos,images`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending TV shows:', error);
    throw error;
  }
};

export const getPopularTvShows = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/tv/top_rated?include_adult=false&api_key=${TMDB_API_KEY}&page=${page}&append_to_response=videos,images`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching popular TV shows:', error);
    throw error;
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbService.get(`/movie/${movieId}?include_adult=false&api_key=${TMDB_API_KEY}&append_to_response=credits,videos,images&include_image_language=en-US`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

export const getTvShowDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/${id}?include_adult=false&api_key=${TMDB_API_KEY}&append_to_response=credits,seasons,videos,images&include_image_language=en-US`);

    if (!response.data || !response.data.seasons) {
      throw new Error('Failed to fetch TV show details');
    }

    const data = response.data;

    console.log('TV Show Details API Response:', data);

    const seasonPromises = data.seasons.map(async (season) => {
      const episodes = await getSeasonEpisodes(id, season.season_number);
      return {
        season_number: season.season_number,
        episodes,
      };
    });

    const seasons = await Promise.all(seasonPromises);

    const tvShowDetails = {
      name: data.name,
      poster_path: data.poster_path,
      first_air_date: data.first_air_date,
      episode_run_time: data.episode_run_time,
      genres: data.genres,
      overview: data.overview,
      vote_average: data.vote_average,
      created_by: data.created_by,
      backdrop_path: data.backdrop_path,
      tagline: data.tagline,
      number_of_seasons: data.number_of_seasons,
      number_of_episodes: data.number_of_episodes,
      seasons,
      credits: data.credits,
      images: data.images
    };

    return tvShowDetails;
  } catch (error) {
    console.error('Error fetching TV show details:', error.message);
    throw error;
  }
};

export const getSeasonEpisodes = async (tvShowId, seasonNumber) => {
  try {
    const response = await fetch(`${BASE_URL}/tv/${tvShowId}/season/${seasonNumber}?api_key=${TMDB_API_KEY}`);

    if (!response.ok) {
      throw new Error('Failed to fetch season details');
    }

    const data = await response.json();

    console.log(`Season ${seasonNumber} Episodes API Response:`, data);

    const episodes = data.episodes.map((episode) => ({
      id: episode.id,
      name: episode.name,
      still_path: episode.still_path,
      image: `https://image.tmdb.org/t/p/original/${episode.still_path}`, 
    }));

    return episodes;
  } catch (error) {
    console.error(`Error fetching season ${seasonNumber} episodes:`, error.message);
    throw error;
  }
};

export const searchMedia = async (query) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?include_adult=false&api_key=${TMDB_API_KEY}&query=${query}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();

    console.log('Search API Response:', data);

    const results = data.results.map((result) => ({
      id: result.id,
      title: result.title || result.name,
      poster_path: result.poster_path ? `${result.poster_path}` : null,
      media_type: result.media_type, 
    }));

    return results;
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    throw error;
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/movie/upcoming?include_adult=false&api_key=${TMDB_API_KEY}&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

export const getUpcomingTvShows = async (page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}/tv/on_the_air?include_adult=false&api_key=${TMDB_API_KEY}&page=${page}`);
    const showsWithImages = response.data.results.map((show) => ({
      ...show,
      image: `https://image.tmdb.org/t/p/w300/${show.poster_path}`,
    }));
    return showsWithImages;
  } catch (error) {
    console.error('Error fetching upcoming TV shows:', error);
    throw error;
  }
};

export const getMovieTrailer = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${TMDB_API_KEY}`
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const trailer = data.results.find((video) => video.type === 'Trailer');

      return trailer ? trailer.key : null;
    } else {
      return null; 
    }
  } catch (error) {
    console.error('Error fetching movie trailer:', error);
    throw error;
  }
}; 

export const getMovieRecommendations = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch movie recommendations');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in getMovieRecommendations: ${error.message}`);
  }
};

export const getTvRecommendations = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/recommendations?api_key=${TMDB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch tv recommendations');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in getTvRecommendations: ${error.message}`);
  }
};


export const getMovieReviews = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/reviews?api_key=${TMDB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch movie reviews');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in getMovieReviews: ${error.message}`);
  }
};

export const getTvReviews = async (tvId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/reviews?api_key=${TMDB_API_KEY}`
    );

    if (!response.ok) {
      throw new Error('Unable to fetch tv reviews');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error in getTvReviews: ${error.message}`);
  }
};


export const getTvTrailer = async (id) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${TMDB_API_KEY}`
    );

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const trailer = data.results.find((video) => video.type === 'Trailer');

      return trailer ? trailer.key : null;
    } else {
      return null; 
    }
  } catch (error) {
    console.error('Error fetching tv trailer:', error);
    throw error;
  }
}; 

export const getGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    throw new Error('Error fetching genres from TMDB API');
  }
};

export const getTvGenres = async () => {
  try {
    const response = await fetch(`${BASE_URL}/genre/tv/list?api_key=${TMDB_API_KEY}`);
    const data = await response.json();
    return data.genres;
  } catch (error) {
    throw new Error('Error fetching genres from TMDB API');
  }
};


export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Error fetching movies by genre from TMDB API');
  }
};

export const getTvByGenre = async (genreId, page = 1) => {
  try {
    const response = await fetch(`${BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    throw new Error('Error fetching tv by genre from TMDB API');
  }
};

export const getTopActors = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/person/popular?api_key=${TMDB_API_KEY}&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching top actors:', error);
    throw error;
  }
}; 

export const getAnimeMovies = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/discover/movie?include_adult=false&api_key=${TMDB_API_KEY}&with_keywords=210024&page=${page}`
    );

    return response.data.results;
  } catch (error) {
    console.error('Error fetching anime movies:', error);
    throw error;
  }
}

export const getAnimeTv = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/discover/tv?include_adult=false&api_key=${TMDB_API_KEY}&with_keywords=210024&page=${page}`
    );

    return response.data.results;
  } catch (error) {
    console.error('Error fetching anime tv:', error);
    throw error;
  }
}

export const getTurkishMovies = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/discover/movie?include_adult=false&api_key=${TMDB_API_KEY}&with_original_language=tr&page=${page}`
    );

    return response.data.results;
  } catch (error) {
    console.error('Error fetching turkish movies:', error);
    throw error;
  }
}

export const getTurkishTv = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/discover/tv?include_adult=false&api_key=${TMDB_API_KEY}&with_original_language=tr&page=${page}`
    );

    return response.data.results;
  } catch (error) {
    console.error('Error fetching turkish tv:', error);
    throw error;
  }
}

export const getIranianMovies = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/discover/movie?include_adult=false&api_key=${TMDB_API_KEY}&with_original_language=fa&page=${page}`
    );

    return response.data.results;
  } catch (error) {
    console.error('Error fetching iranian movies:', error);
    throw error;
  }
}

export const getIranianTv = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/discover/tv?include_adult=false&api_key=${TMDB_API_KEY}&with_original_language=fa&page=${page}`
    );

    return response.data.results;
  } catch (error) {
    console.error('Error fetching iranian tv:', error);
    throw error;
  }
}

export const getBannerMovies = async () => {
  try {
    const response = await tmdbService.get(
      `/movie/now_playing?include_adult=false&api_key=${TMDB_API_KEY}&page=1`
    );
    return response.data.results.slice(0, 6);
  } catch (error) {
    console.error('Error fetching banner movies:', error);
    throw error;
  }
};

export const getMovieQuickInfo = async (id) => {
  const response = await tmdbService.get(
    `/movie/${id}?include_adult=false&api_key=${TMDB_API_KEY}`
  );
  return {
    id: response.data.id,
    title: response.data.title,
    poster_path: response.data.poster_path,
    media_type: 'movie',
  };
};

export const getTvQuickInfo = async (id) => {
  const response = await tmdbService.get(
    `/tv/${id}?include_adult=false&api_key=${TMDB_API_KEY}`
  );
  return {
    id: response.data.id,
    name: response.data.name,
    poster_path: response.data.poster_path,
    media_type: 'tv',
  };
};

export const getTrendingMovieTrailers = async () => {
  try {
    const trendingMovies = await getNowPlayingMovies();

    const trailerPromises = trendingMovies.map(async (movie) => {
      const trailerKey = await getMovieTrailer(movie.id);
      return {
        id: movie.id,
        title: movie.title,
        trailerKey: trailerKey,
      };
    });

    const movieTrailers = await Promise.all(trailerPromises);

    return movieTrailers;
  } catch (error) {
    console.error('Error fetching trending movie trailers:', error);
    throw error;
  }
};


export const getRecentlyReleasedMovies = async (page = 1) => {
  try {
    const response = await tmdbService.get(
      `/discover/movie?include_adult=false&api_key=${TMDB_API_KEY}&sort_by=release_date.desc&page=${page}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching recently released movies:', error);
    throw error;
  }
};


export const getMovieVideos = async (movieId) => {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
    );
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      const youtubeVideos = data.results.filter((video) => video.site === 'YouTube');
      
      if (youtubeVideos.length === 0) {
        return [];
      }
      
      const officialTrailers = youtubeVideos.filter(
        (v) => v.official && v.type === 'Trailer'
      );
      if (officialTrailers.length > 0) return officialTrailers;
      
      const trailers = youtubeVideos.filter((v) => v.type === 'Trailer');
      if (trailers.length > 0) return trailers;
      
      const clips = youtubeVideos.filter((v) => v.type === 'Clip');
      if (clips.length > 0) return clips;
      
      return youtubeVideos;
    }
    return [];
  } catch (error) {
    console.error(`Error fetching videos for movie ${movieId}:`, error);
    return [];
  }
};

export const getShortsData = async () => {
  try {
    const response = await tmdbService.get(
      `/movie/popular?include_adult=false&api_key=${TMDB_API_KEY}&page=1`
    );
    const popularMovies = response.data.results;
    
    const shortsWithVideos = await Promise.all(
      popularMovies.map(async (movie) => {
        try {
          const videos = await getMovieVideos(movie.id);
          return {
            ...movie,
            videos: videos,
          };
        } catch (err) {
          console.error(`Failed to fetch videos for movie ${movie.id}`);
          return {
            ...movie,
            videos: [],
          };
        }
      })
    );

    const moviesWithVideos = shortsWithVideos.filter(
      (movie) => movie.videos && movie.videos.length > 0 && movie.backdrop_path && movie.poster_path
    );
    
    return moviesWithVideos.slice(0, 50);
  } catch (error) {
    console.error('Error fetching shorts data:', error);
    throw error;
  }
};