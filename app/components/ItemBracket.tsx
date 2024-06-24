'use client';

import { useState, useEffect } from 'react';
import { Container, Box} from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Item } from '../lib/definitions';
import { Edit } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ResponsiveBox from './ResponsiveBox';


export default function ItemBracket({item, onChangeItem, onItemSave} : {item : Item, onChangeItem : (item: Item) => void, onItemSave : (item: Item) => void}) {
    const [edit, setEdit] = useState(false);
    return(
        <ResponsiveBox >
            <Box flexDirection={'row'} display={'flex'}>
                <Box>
                    {edit ? 
                    <TextField onChange={(e)=>onChangeItem({...item, name:e.target.value})} defaultValue={item.name} size='small' sx={{width:'5vw'}}/>
                    :
                    <Typography>{item.name}</Typography>
                    }
                </Box>
                <Box>
                    <IconButton onClick={()=>{setEdit(!edit)}}>
                        <Edit sx={{ fontSize: 22}}/>
                    </IconButton>
                    
                </Box>
            </Box>
            <Box sx={{position:'relative'}}>
                {checkNumber(item.length) ? 
                <TextField
                sx = {{background:'white', margin:'5px',
                '& .MuiInputBase-root': {
                    height: {
                      xs: '10vh',  
                      sm: '10vh', 
                      md: '10vh', 
                      lg: '5vh', 
                      xl: '5vh', 
                    },
                  },
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: {
                      xs: '10vh',
                      sm: '10vh',
                      md: '10vh',
                      lg: '5vh',
                      xl: '5vh',
                    }}
                }}
                id="outlined-length"
                label="Length"
                defaultValue="0"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeItem({...item, length: event.target.value});
                }}
                />
                :
                <TextField
                error
                sx = {{background:'white',margin:'5px',
                '& .MuiInputBase-root': {
                    height: {
                      xs: '10vh',  
                      sm: '10vh', 
                      md: '10vh', 
                      lg: '5vh', 
                      xl: '5vh', 
                    },
                  },
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: {
                      xs: '10vh',
                      sm: '10vh',
                      md: '10vh',
                      lg: '5vh',
                      xl: '5vh',
                    }}
                }}
                id="outlined-length"
                label="Length"
                defaultValue="0"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeItem({...item, length: event.target.value});
                }}
                />
            }
            </Box>
            <Box sx={{position:'relative'}}>
                {checkNumber(item.width) ? 
                <TextField
                sx = {{background:'white',margin:'5px',
                '& .MuiInputBase-root': {
                    height: {
                      xs: '10vh',  
                      sm: '10vh', 
                      md: '10vh', 
                      lg: '5vh', 
                      xl: '5vh', 
                    },
                  },
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: {
                      xs: '10vh',
                      sm: '10vh',
                      md: '10vh',
                      lg: '5vh',
                      xl: '5vh',
                    }}
                }}
                id="outlined-width"
                label="Width"
                defaultValue="0"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeItem({...item, width: event.target.value});
                }}
                />
                :
                <TextField
                error
                sx = {{background:'white',margin:'5px',
                '& .MuiInputBase-root': {
                    height: {
                      xs: '10vh',  
                      sm: '10vh', 
                      md: '10vh', 
                      lg: '5vh', 
                      xl: '5vh', 
                    },
                  },
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: {
                      xs: '10vh',
                      sm: '10vh',
                      md: '10vh',
                      lg: '5vh',
                      xl: '5vh',
                    }}
                }}
                id="outlined-width"
                label="Width"
                defaultValue="0"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeItem({...item, width: event.target.value});
                }}
                />
                }
            </Box>
            <Box sx={{position:'relative'}}>
                {checkNumber(item.height) ? 
                <TextField
                sx = {{background:'white',margin:'5px',
                '& .MuiInputBase-root': {
                    height: {
                      xs: '10vh',  
                      sm: '10vh', 
                      md: '10vh', 
                      lg: '5vh', 
                      xl: '5vh', 
                    },
                  },
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: {
                      xs: '10vh',
                      sm: '10vh',
                      md: '10vh',
                      lg: '5vh',
                      xl: '5vh',
                    }}
                }}
                id="outlined-height"
                label="Height"
                defaultValue="0"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeItem({...item, height: event.target.value});
                }}
                />
                :
                <TextField
                error
                sx = {{background:'white',margin:'5px',
                '& .MuiInputBase-root': {
                    height: {
                      xs: '10vh',  
                      sm: '10vh', 
                      md: '10vh', 
                      lg: '5vh', 
                      xl: '5vh', 
                    },
                  },
                  '& .MuiAutocomplete-inputRoot': {
                    minHeight: {
                      xs: '10vh',
                      sm: '10vh',
                      md: '10vh',
                      lg: '5vh',
                      xl: '5vh',
                    }}
                }}
                id="outlined-height"
                label="Height"
                defaultValue="0"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onChangeItem({...item, height: event.target.value});
                }}
                />
                }
            </Box>
            {checkNumber(item.length) && checkNumber(item.width) && checkNumber(item.height) ?
                <Button variant="contained" onClick={()=>{onItemSave(item)}} onMouseOver={()=>{}} sx={{margin:'5px', background:'rgb(0,254,255,0.7)', '&:hover':{background:'rgb(0,230,255,0.7)'}}}>Add</Button>
                :
                <Button disabled>Add</Button>
            }
            
        </ResponsiveBox>
    );
}

function checkNumber (propery: string) {
    const regex = /^[0-9]+$/;
    return regex.test(propery);
}