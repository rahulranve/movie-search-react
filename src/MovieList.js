
// import React, { useState, useEffect } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, TablePagination } from '@mui/material';
// import { useNavigate } from "react-router-dom";
// import { fetchMovies } from './APIS/services';
// import './List.css';

// const MovieList = ({ searchedMovie }) => {
//   const [movies, setMovies] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const navigate = useNavigate();

// console.log(`as a props in movielist`,searchedMovie);

//   useEffect(() => {
//     const loadMovies = async () => {
//       try {
//         const moviesData = await fetchMovies(1, 10);
//         setMovies(moviesData);
//       } catch (error) {
//         console.error('Error fetching movies:', error);
//       }
//     };

//     loadMovies();
//   }, []);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleViewDetails = (movie) => {
//     navigate(`/movie/${movie.name}`);
//   };

//   const arraySearchedMovie = Array.isArray(searchedMovie) && searchedMovie.flat();
//   const moviesToRender = arraySearchedMovie && arraySearchedMovie.length > 0 ? arraySearchedMovie : movies;
//   const emptyRows = rowsPerPage - Math.min(rowsPerPage, moviesToRender.length - page * rowsPerPage);

//   return (
//     <div>
//       <Typography variant="h5" gutterBottom className="movie-list-title">
//         <a href=''>
//           Movie List
//         </a>
//       </Typography>


//       <TableContainer component={Paper} className="table-container">
//         <Table>
//           <TableHead>
//             <TableRow className="table-header">
//               <TableCell className="header-cell">Sr No.</TableCell>
//               <TableCell className="header-cell">Title</TableCell>
//               <TableCell className="header-cell">Release Date</TableCell>
//               <TableCell className="header-cell">Tags</TableCell>
//               <TableCell className="header-cell">Artists</TableCell>
//               <TableCell align="right" className="header-cell">Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {moviesToRender.map(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((movie, index) => (
//               <TableRow key={index} className="table-row">
//                 <TableCell component="th" scope="row">
//                   {page * rowsPerPage + index + 1}
//                 </TableCell>
//                 <TableCell>{movie.name}</TableCell>
//                 <TableCell>{new Date(movie.releaseDate).toLocaleDateString()}</TableCell>
//                 <TableCell>{movie.tags.join(', ')}</TableCell>
//                 <TableCell>
//                   {movie.artists.map((artist, idx) => (
//                     <div key={idx}>{artist.name} ({artist.role})</div>
//                   ))}
//                 </TableCell>
//                 <TableCell align="right">
//                   <Button
//                     variant="contained"
//                     color="primary"
//                     onClick={() => handleViewDetails(movie)}
//                   >
//                     View Details
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             {emptyRows > 0 && (
//               <TableRow style={{ height: 53 * emptyRows }}>
//                 <TableCell colSpan={6} />
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={moviesToRender.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// };

// export default MovieList;








import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, Paper, TablePagination } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { fetchMovies } from './APIS/services'; // Your updated fetchMovies function
import './List.css';

const MovieList = ({ searchedMovie }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [totalMovies, setTotalMovies] = useState(0);
  const navigate = useNavigate();

  console.log(`as a props in movielist`, searchedMovie);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const response = await fetchMovies(page + 1, rowsPerPage); // Adjusting for 1-based pagination
        setMovies(response.movies);
        setTotalMovies(response.totalCount);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    loadMovies();
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewDetails = (movie) => {
    navigate(`/movie/${movie.name}`);
    // navigate(`/movie/${movie.name}`, { state: { movie } });

  };

  const arraySearchedMovie = Array.isArray(searchedMovie) && searchedMovie.flat();
  const moviesToRender = arraySearchedMovie && arraySearchedMovie.length > 0 ? arraySearchedMovie : movies;

  return (
    <div>
      <Typography variant="h5" gutterBottom className="movie-list-title">
        Movie List
      </Typography>

      <TableContainer component={Paper} className="table-container">
        <Table>
          <TableHead>
            <TableRow className="table-header">
              <TableCell className="header-cell">Sr No.</TableCell>
              <TableCell className="header-cell">Title</TableCell>
              <TableCell className="header-cell">Release Date</TableCell>
              <TableCell className="header-cell">Tags</TableCell>
              <TableCell className="header-cell">Artists</TableCell>
              <TableCell align="right" className="header-cell">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {moviesToRender.map((movie, index) => (
              <TableRow key={movie.id} className="table-row">
                <TableCell component="th" scope="row">
                  {page * rowsPerPage + index + 1}
                </TableCell>
                <TableCell>{movie.name}</TableCell>
                <TableCell>{new Date(movie.releaseDate).toLocaleDateString()}</TableCell>
                <TableCell>{movie.tags.join(', ')}</TableCell>
                <TableCell>
                  {movie.artists.map((artist, idx) => (
                    <div key={idx}>{artist.name} ({artist.role})</div>
                  ))}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleViewDetails(movie)}
                  >
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={arraySearchedMovie && arraySearchedMovie.length > 0 ? arraySearchedMovie.length : totalMovies}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default MovieList;
