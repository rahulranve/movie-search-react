// import './App.css';
import Home from './Home';
import MovieDetail from './MovieDetail';
import { Typography } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import AppBar from '@mui/material/AppBar';



function App() {


  const mockMovies = [
    {
      "title": "Inception",
      "id": 1,
      "release_year": 2010,
      "tags": ["Sci-Fi", "Thriller"]
    },
    {
      "title": "The Dark Knight",
      "id": 2,
      "release_year": 2008,
      "tags": ["Action", "Crime", "Drama"]
    },
    {
      "title": "Interstellar",
      "id": 3,
      "release_year": 2014,
      "tags": ["Sci-Fi", "Drama", "Adventure"]
    },
    {
      "title": "The Matrix",
      "id": 4,
      "release_year": 1999,
      "tags": ["Sci-Fi", "Action"]
    },
    {
      "title": "Pulp Fiction",
      "id": 5,
      "release_year": 1994,
      "tags": ["Crime", "Drama"]
    },
    {
      "title": "Fight Club",
      "id": 6,
      "release_year": 1999,
      "tags": ["Drama"]
    },
    {
      "title": "Forrest Gump",
      "id": 7,
      "release_year": 1994,
      "tags": ["Drama", "Romance"]
    },
    {
      "title": "The Shawshank Redemption",
      "id": 8,
      "release_year": 1994,
      "tags": ["Drama"]
    },
    {
      "title": "The Godfather",
      "id": 9,
      "release_year": 1972,
      "tags": ["Crime", "Drama"]
    },
    {
      "title": "The Lord of the Rings: The Fellowship of the Ring",
      "id": 10,
      "release_year": 2001,
      "tags": ["Adventure", "Fantasy"]
    }
  ];

  const headerStyle = {
    marginBottom: "10px"
  };



  return (
    <Router>
      <div >
        {/* <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" component="div">
              Photos
            </Typography>
          </Toolbar>
        </AppBar> */}
        <header style={headerStyle}>
          <Typography variant="h2" align="center">
            Movie Search App
          </Typography>
        </header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:movieName" element={<MovieDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
