import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from "@mui/material/styles";


const CustomAutocomplete = styled(Autocomplete)(({ theme }) => ({
  "& .MuiInputLabel-root": {
    color: "white"
  },
  "& .MuiOutlinedInput-root": {
    width: "200px", 
    color: "white",
    height:"45px",
    "& fieldset": {
      borderColor: "white"
    },
    "&:hover fieldset": {
      borderColor: "white"
    },
    "&.Mui-focused fieldset": {
      borderColor: "white"
    },

  },
  "& .MuiAutocomplete-option": {
    backgroundColor: "white",
    color: "white"
  },

}));



export default function NetworkDropDown() {
  const [selectedValue, setSelectedValue] = useState("Preview");

  const handleSelect = (event, value) => {
    if (value !== null) {
      setSelectedValue(value);
    }
  };

  return (
    <CustomAutocomplete
    options={["preview"]}
    getOptionLabel={(option) => option}
      onChange={handleSelect}
      value={selectedValue}
      renderInput={(params) => (
        <TextField {...params} label="Network" variant="outlined" />
      )}
    />
  );
}


