
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Paper, Button, Chip, Grid, Card, CardContent, Autocomplete, TextField } from '@mui/material';
import { fetchMovieDetail, fetchAvailableTags, addTagToMovie, removeTagFromMovie } from './APIS/services';
import Alert from '@mui/material/Alert';
import './MovieDetail.css';

const MovieDetail = () => {
  const { movieName } = useParams();
  const [movie, setMovie] = useState(null);
  const [tags, setTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const [alertMessage, setAlert] = useState("");

  console.log("id detail",movieName);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const movieData = await fetchMovieDetail(movieName);
        if (movieData.length > 0) {
          const movie = movieData[0];
          setMovie(movie);
          setTags(movie.tags);
        } else {
          alert('movie not found');
        }
      } catch (error) {
        console.error('Error fetching movie:', error);
      }
    };

    const fetchTags = async () => {
      try {
        const tagsData = await fetchAvailableTags();
        setAvailableTags(tagsData);
      } catch (error) {
        console.error('Error fetching available tags:', error);
      }
    };

    fetchDetails();
    fetchTags();
  }, [movieName]);

  const handleAddTag = async () => {
    if (selectedTag) {


      if (tags.includes(selectedTag.name)) {
        setAlert("Tag already exists");
        return;
      }

      try {
        await addTagToMovie(movie.id, selectedTag.name);
        setTags([...tags, selectedTag.name]);
        setSelectedTag(null);
        setAlert("");

      } catch (error) {
        console.error('Error adding tag:', error);
      }
    }
    
  };

  const handleDeleteTag = async (tagToDelete) => {
     const tag = availableTags.find(tag => tag.name === tagToDelete);
    try {
      await removeTagFromMovie(movie.id, tag.id);
      setTags(tags.filter(tag => tag !== tagToDelete));
    } catch (error) {
      console.error('Error removing tag:', error);
    }
  };

  if (!movie) {
    return <Typography variant="h5">Loading...</Typography>;
  }

  return (
    <Paper className="movie-detail-container">
      <Typography variant="h4" gutterBottom className="movie-title">
        Movie Details
      </Typography>
      <Grid container spacing={2} className="movie-info-container">
        <Grid item xs={12}>
          <Typography variant="h6" className="movie-info-title">
            Title: {movie.name}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" className="movie-info-release-date">
            Release Date: {new Date(movie.releaseDate).toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Actors:</Typography>
          {movie.artists.map((artist, idx) => (
            <Card key={idx} variant="outlined" className="artist-card">
              <CardContent>
                <Typography variant="body1" className="artist-role"><strong>Role:</strong> {artist.role}</Typography>
                <Typography variant="body1" className="artist-name"><strong>Artist:</strong> {artist.name}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Tags:
          </Typography>
          <div className="tags-container">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                onDelete={() => handleDeleteTag(tag)}
                className="tag-chip"
                color="primary"
              />
            ))}
          </div>
        </Grid>
        <Grid item xs={12} className="add-tag-container">
          <Autocomplete
            options={availableTags}
            getOptionLabel={(option) => option.name}
            value={selectedTag}
            onChange={(event, newValue) => setSelectedTag(newValue)}
            renderInput={(params) => <TextField {...params} label="New Tag" variant="outlined" size="small" />}
            className="add-tag-dropdown"
          />
          <Button variant="contained" color="primary" onClick={handleAddTag}>
            Add Tag
          </Button>
        </Grid>
        <Grid item xs={12}>
          {
            alertMessage && (
              <Alert severity="error">Tag already exists</Alert>
            )
          }
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className="back-button"
            onClick={() => window.history.back()}
          >
            Back
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default MovieDetail;

