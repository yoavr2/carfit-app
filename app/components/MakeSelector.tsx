'use client';

import React, { useState, useEffect, ChangeEventHandler } from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { SelectChangeEvent } from '@mui/material/Select';
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material';

type Make = {
    make : string
}

const MakeSelector = ({ make, handleSelector } : {make : string | null, handleSelector : (vent: React.SyntheticEvent, value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string>) => void}) => {
    const [makes, setMakes] = useState<string[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
        const response = await fetch('/api/makes');
        const data = await response.json();
        const options : string[] = []
        data.map((make : Make) => (
            options.push(make.make)
        ));
        setMakes(options);
        };

        fetchCategories();
    }, []);

    

    return (
        <Autocomplete
            disablePortal
            id="combo-box-make"
            options={makes}
            defaultValue={make}
            sx={{ width: '18vw',
            '& .MuiInputBase-root': {
                height: {
                  xs: '8vh',  // extra-small devices
                  sm: '10vh', // small devices
                  md: '10vh', // medium devices
                  lg: '10vh', // large devices
                  xl: '7vh', // extra-large devices
                },
              },
              '& .MuiAutocomplete-inputRoot': {
                minHeight: {
                  xs: '8vh',
                  sm: '8vh',
                  md: '8vh',
                  lg: '8vh',
                  xl: '7vh',
                }}
            , margin:'5px' , background:'white'}}
            renderInput={(params) => <TextField {...params} label="Make" />}
            onChange={handleSelector}
        />
    );
};

export default MakeSelector;
