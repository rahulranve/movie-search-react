import axios from 'axios';

const BASE_URL = 'http://172.27.194.133:8012';

// Fetch movie details
export const fetchMovieDetail = async (movieName) => {
  try {
    const response = await axios.get(`${BASE_URL}/Movies/searchmovies?searchTerm=${movieName}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movie:', error);
    throw error;
  }
};


// Fetch available tags
export const fetchAvailableTags = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/Tags`);
    return response.data;
  } catch (error) {
    console.error('Error fetching available tags:', error);
    throw error;
  }
};

// Add a tag 
export const addTagToMovie = async (movieId, tagName) => {
  try {
    const response = await axios.post(`${BASE_URL}/Movies/${movieId}/addTags`, [
      { name: tagName }
    ]);
    return response.data;
  } catch (error) {
    console.error('Error adding tag:', error);
    throw error;
  }
};



// Remove a tag from a movie
export const removeTagFromMovie = async (movieId, tagId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/Movies/removeTagFromMovie`, {
      params: {
        tagId: tagId,
        movieId: movieId,

      }
    });
    return response.data;
  } catch (error) {
    console.error('Error removing tag:', error);
    throw error;
  }
};


// Fetch movies with pagination
export const fetchMovies = async (page, pageSize) => {
  try {
    const response = await axios.get(`${BASE_URL}/Movies/movies`, {
      params: {
        page,
        pageSize
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Search for a movie
export const searchMovies = async (searchQuery) => {
  try {
    const response = await axios.get(`${BASE_URL}/Movies/searchmovies?searchTerm=${searchQuery}`);
    return response.data;
  } catch (error) {
    console.error('Error searching for movie:', error);
    throw error;
  }
};
