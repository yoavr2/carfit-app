'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Item, Specs } from '../../lib/definitions';
import InOut from '../../components/InOut';
import { json } from 'stream/consumers';
import ViewResults from '@/app/components/ViewResults';
import { Container, Box} from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import ItemsToFit from '@/app/components/ItemsToFit';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { TextFields } from '@mui/icons-material';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { spec } from 'node:test/reporters';

export default function Page() {
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [year, setYear] = useState('');
    const [items, setItems] = useState<Item[]>([]);
    const [specs, setSpecs] = useState<Specs | null>(null);
    const [checkedItems, setCheckedItems] = useState<boolean[]>([]);
    const [whereToFit, setWhereToFit] = useState('luggage');

    const router = useRouter();
    

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const make = searchParams.get('make');
        const model = searchParams.get('model');
        const year = searchParams.get('year');
        const itemsQuery = searchParams.get('items');
    
        setMake(make || '');
        setModel(model || '');
        setYear(year || '');
        
        if (itemsQuery) {
            const parsedItems = itemsQuery.split(',').map(pair => {
                const [id, name, length, width, height] = pair.split(':');
                return { id: parseInt(id, 10), name: name, length: length, width: width, height: height, checked: true };
            });
            // const checked = parsedItems.map((item) => {return true;})
            // setCheckedItems(checked);
            setItems(parsedItems);
        }

        const fetchSpecs = async () => {
        const response = await fetch(`/api/specs?make=${make}&model=${model}&year=${year}`);
        const data = await response.json();
        const fetchedSpecs = JSON.parse(data[0].sizes);
        // console.log(data[0].sizes);
        // console.log(fetchedSpecs)
        setSpecs(fetchedSpecs);
        };

        fetchSpecs();
    }, []);


    const handleCheck = (id : number) => {
        // const newChecked = checkedItems.map((item, index)=>{
        //     if(index == id){
        //         return !item;
        //     }
        //     return item;
        // });
        // setCheckedItems(newChecked);
        const newItems = items.map(item => item.id === id ? {...item, checked: !item.checked} : item );
        setItems(newItems);
    };

    const handleChange = (event: SelectChangeEvent) => {
        setWhereToFit(event.target.value as string);
        };

    const handleBackPage = () => {
        const itemsQuery = items.map(item => `${item.id}:${item.name}:${item.length}:${item.width}:${item.height}`).join(',');
        router.push(`/WillItFit?make=${make}&model=${model}&year=${year}&items=${itemsQuery}`);
    };
    return(
        <>
        <Box flexGrow={1} sx={{minHeight: '100vh', minWidth:'100vw',height:'100vh', width:'100vw', display: 'flex', flexDirection: 'column'}}>
        <Grid container
        spacing={2}
        columns={18}
        style={{ height: '100vh', width:'100vw' }}>
            <Grid item xs={18}>
            <Box
                bgcolor="white"
                boxShadow={'0px 4px 20px 0px rgba(167,167,167,0.5)'}
                sx={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100vw'}}
            >
                <Typography variant='h1' color={'#1d45ac'} >Will It Fit?</Typography>
            </Box>
            
            </Grid>
            <Grid item xs={3}>
                <Box sx={{mt:-5}} justifyContent={'center'} alignContent={'center'} display={'flex'}>
                    <Typography>
                        Car pic
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{mt:-5}} justifyContent={'center'} alignContent={'center'} display={'flex'}>
                    <Typography>
                        {make} {model} {year}
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{mt:-5}} justifyContent={'center'} alignContent={'center'} display={'flex'} flexDirection={'column'}>
                    <Typography variant='h5' justifyContent={'center'} alignContent={'center'} display={'flex'}>
                        {whereToFit == 'luggage' ? specs?.min_cargo_capacity+' ' : ''}
                        {whereToFit == 'luggage + lowered seats' ? specs?.max_cargo_capacity+' ' : ''}
                         liters
                    </Typography>
                    <Typography justifyContent={'center'} alignContent={'center'} display={'flex'}>
                        Cargo Capacity
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{mt:-10}} justifyContent={'center'} alignContent={'center'} display={'flex'}>
                    <Typography>
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box sx={{mt:-10}} justifyContent={'center'} alignContent={'center'} display={'flex'}>
                    <Typography>
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={3} >
                <Box sx={{mt:-5}} justifyContent={'center'} alignContent={'center'} display={'flex'}>
                    <Typography>
                    </Typography>
                </Box>
            </Grid>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={10}>
                <Box justifyContent={'space-evenly'} alignContent={'center'} display={'flex'} flexDirection={'row'}>
                    <Box mt={0}>
                    <Typography variant='h4'>
                        Where to fit?
                    </Typography>
                    </Box>
                    <Box mt={0} >
                    <Select
                    sx={{background:'white', width:'30vw'}}
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={whereToFit}
                    onChange={handleChange}
                    >
                    {parseInt(specs ? specs.min_cargo_capacity : '0') > 0 ? <MenuItem value={"luggage"}>luggage</MenuItem> : null}
                    {/* <MenuItem value={"rear seats"}>rear seats</MenuItem> */}
                    {parseInt(specs ? specs.max_cargo_capacity : '0') > 0 ? <MenuItem value={"luggage + lowered seats"}>luggage + lowered seats</MenuItem> : null }
                    </Select>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={4}>

            </Grid>
            <Grid item xs={9}>
                <Box justifyContent={'space-evenly'} alignContent={'center'} display={'flex'} flexDirection={'row'} mt={0} sx={{}}>
                    <InOut items={items} specs={specs} whereToFit={whereToFit}/>
                </Box>
            </Grid>
            <Grid item xs={9}>
                <Box justifyContent={'center'} alignContent={'center'} display={'flex'}>
                    <ItemsToFit items={items} handleChange={handleCheck}/>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Box justifyContent={'center'} alignContent={'center'} display={'flex'}>
                <Button variant='contained' onClick={handleBackPage}>Back</Button>
                </Box>
            </Grid>
        </Grid>
        </Box>
        </>
    );
}

