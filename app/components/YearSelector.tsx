'use client';

import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material';

type Year = {
    year : string
}

export default function YearSelector ({ selectedMake, selectedModel, selectedYear, handleSelector } : {selectedMake : string | null, selectedModel: string | null, selectedYear : string | null, handleSelector : (vent: React.SyntheticEvent, value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string>) => void}) {
    const [years, setYears] = useState<string[]>([]);
    const [loadingYears, setLoadingYears] = useState(false);

    useEffect(() => {
        if (selectedModel && selectedMake) {
            const fetchItems = async () => {
            setLoadingYears(true);
            const response = await fetch(`/api/years?make=${selectedMake}&model=${selectedModel}`);
            const data = await response.json();
            const options : string[] = []
            data.map((year : Year) => (
                options.push(year.year)
            ));
            setYears(options);
            setLoadingYears(false);
            };

        fetchItems();
        }
    }, [selectedMake, selectedModel]);

    return (
        <Autocomplete
            disablePortal
            id="combo-box-model"
            options={years}
            defaultValue={selectedYear}
            disabled={loadingYears || !selectedMake || !selectedModel}
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
            renderInput={(params) => <TextField {...params} label="Year" />}
            onChange={handleSelector}
        />
    );
};

