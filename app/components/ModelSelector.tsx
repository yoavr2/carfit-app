'use client';

import React, { useState, useEffect } from 'react';
import { Select, MenuItem, FormControl, InputLabel, CircularProgress } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material';

type Model = {
    model : string
}

const ModelSelector = ({ selectedMake, selectedModel, handleSelector } : {selectedMake : string | null, selectedModel: string | null, handleSelector : (vent: React.SyntheticEvent, value: string | null, reason: AutocompleteChangeReason, details?: AutocompleteChangeDetails<string>) => void}) => {
    const [models, setModels] = useState<string[]>([]);
    const [loadingModels, setLoadingModels] = useState(false);

    useEffect(() => {
        if (selectedMake) {
            const fetchItems = async () => {
            setLoadingModels(true);
            const response = await fetch(`/api/models?make=${selectedMake}`);
            const data = await response.json();
            const options : string[] = []
            data.map((model : Model) => (
                options.push(model.model)
            ));
            setModels(options);
            setLoadingModels(false);
            };

        fetchItems();
        }
    }, [selectedMake]);

    return (
        <Autocomplete
            disablePortal
            id="combo-box-model"
            options={models}
            defaultValue={selectedModel}
            disabled={loadingModels || !selectedMake}
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
            , margin:'5px' , background:'white' }}
            renderInput={(params) => <TextField {...params} label="Model" />}
            onChange={handleSelector}
        />
    );
};

export default ModelSelector;
