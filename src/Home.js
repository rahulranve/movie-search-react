
import React, { useState } from 'react';
import { searchMovies } from './APIS/services';
import SearchBar from './SearchBar';
import MovieList from './MovieList';
import Alert from '@mui/material/Alert';
import { Container, Grid } from '@mui/material';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedMovie, setFilteredMovie] = useState([]);
  const [alertMessage, setAlert] = useState("");

  const handleSearch = async () => {
   
    if (searchQuery.length < 3) {
      setAlert("Please enter at least 3 characters...");
      return;
    }
    try {
      const moviesData = await searchMovies(searchQuery);
      const filteredMovies = moviesData.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));
      console.log(`filtered movies partially`,filteredMovies);
      if (filteredMovies) {
        setFilteredMovie([filteredMovies]);
        setAlert("");
      } else {
        setAlert("Movies Not found");
        setFilteredMovie([]);
      }
    } catch (error) {
      setAlert("Movies Not found");
      setFilteredMovie([]);
      console.error(error);
    }
  };

  return (
    <Container style={{ maxWidth: '1500px', backgroundColor: 'aliceblue' }}>
      <Grid container justifyContent="center" spacing={2}>
        <Grid item xs={12}>
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            handleSearch={handleSearch}
          />
        </Grid>
        {alertMessage && (
          <Grid item xs={12}>
            <Alert severity="error">{alertMessage}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <MovieList searchedMovie={searchedMovie} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
