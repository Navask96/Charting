import React, { useState } from 'react';
import TextField from '@mui/material/TextField';

function ChartSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Pass the search term to the parent component for filtering
  };

  return (
    <TextField
      label="Search charts by name or tags"
      variant="outlined"
      size='small'
      sx={{
        marginTop:2
      }}
      value={searchTerm}
      onChange={handleSearch}
    />
  );
}

export default ChartSearch;
