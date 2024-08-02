
import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid } from '@mui/material';
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';




const searchBarStyles = {
    marginLeft: "160px",
    marginBottom: "10px"
};





const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {

    const [allTitles, setAllTitles] = useState([]);

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await axios.get(`http://172.27.194.133:8012/Movies`);
                setAllTitles(response.data)
                console.log(response.data);
            } catch (err) {
                console.error(`error fetching titles`, err)
            }
        }
        fetchTitles()

    }, [])








    return (
        <Grid container spacing={2} alignItems="center" style={searchBarStyles}>
            <Grid item xs={8}>
                {/* <TextField
                    fullWidth
                    type="text"
                    label="Search for a movie..."
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                /> */}
                <Stack spacing={2}>
                    <Autocomplete
                        id="free-solo-demo"
                        freeSolo
                        options={allTitles.map((option) => option.name)}
                        renderInput={(params) => <TextField {...params} label="Search for a movie..." />}
                        onInputChange={(event, newInputValue) => setSearchQuery(newInputValue)}
                    />
                   
                </Stack>
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search
                </Button>
            </Grid>
            <Grid>

            </Grid>
        </Grid>
    );
};

export default SearchBar;
