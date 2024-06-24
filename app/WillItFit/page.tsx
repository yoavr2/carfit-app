'use client'

import * as React from 'react';
import { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { Container, Box} from '@mui/system';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import {Asynchronous} from '@/app/WillItFit/make-selector';
import fetchRevenue from '@/app/lib/data';
import { sql } from '@vercel/postgres';
import MakeSelector from '../components/MakeSelector';
import ModelSelector from '../components/ModelSelector';
import YearSelector from '../components/YearSelector';
import ItemBracket from '../components/ItemBracket';
import { AutocompleteChangeReason, AutocompleteChangeDetails } from '@mui/material';
import SavedItem from '../components/SavedItem';
import { Item } from '../lib/definitions';
import Button from '@mui/material/Button';
import { useRouter,useSearchParams } from 'next/navigation';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import theme from '@/theme';
import { PlayArrowRounded } from '@mui/icons-material';


export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const make = searchParams.get('make');
    const model = searchParams.get('model');
    const year = searchParams.get('year');
    const itemsQuery = searchParams.get('items');
    const [selectedMake, setSelectedMake] = useState<string | null>(make);
    const [selectedModel, setSelectedModel] = useState<string | null>(model);
    const [selectedYear, setSelectedYear] = useState<string | null>(year);

    const [items, setItems] = useState<Item[]>([]);
    const [currItem, setCurrItem] = useState<Item>({id: 0, name: "Item 1", length: "0", width: "0", height: "0", checked:true});

    useEffect(() => {
      if (itemsQuery) {
        let lastId = 0;
        const parsedItems = itemsQuery.split(',').map(pair => {
            const [id, name, length, width, height] = pair.split(':');
            if (parseInt(id) > lastId){
              lastId = parseInt(id);
            }
            return { id: parseInt(id, 10), name: name, length: length, width: width, height: height, checked: true };
        });
        setItems(parsedItems);
        setCurrItem({id: lastId+1, name: "Item "+(parsedItems.length+1), length: "0", width: "0", height:"0", checked:true})
      }
    },[itemsQuery]);
    
    const handleMakeSelector = (event: React.SyntheticEvent,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string>) => {
        setSelectedMake(value);
    };

    const handleModelSelector = (event: React.SyntheticEvent,
        value: string | null,
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<string>) => {
        setSelectedModel(value);
    };

    const handleYearSelector = (event: React.SyntheticEvent,
      value: string | null,
      reason: AutocompleteChangeReason,
      details?: AutocompleteChangeDetails<string>) => {
        setSelectedYear(value);
    };

    const handleItemChange = (event: React.ChangeEvent<HTMLInputElement>, id : number, property : string) => {
      switch(property){
        case "l":
          setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, length: event.target.value } : item));
          break;
        case "w":
          setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, width: event.target.value } : item));
          break;
        case "h":
          setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, height: event.target.value } : item));
          break;
      }
      
    };

    const handleItemSave = (item : Item) => {
      const newItems = [...items, item];
      setItems(newItems);
      setCurrItem({...currItem, id: currItem.id+1, name: "Item "+(currItem.id+2)})
    };

    const handleAddItemChange = (item : Item) => {
      setCurrItem(item)
    };

    const handleDeleteItem = (id : number) => {
      const newItems = items.filter((item)=>item.id != id);
      setItems(newItems);
    };

    const handleNextPage = () => {
      const itemsQuery = items.map(item => `${item.id}:${item.name}:${item.length}:${item.width}:${item.height}`).join(',');
      router.push(`/WillItFit/Result?make=${selectedMake}&model=${selectedModel}&year=${selectedYear}&items=${itemsQuery}`);
    };

    

    return(
      <Box flexGrow={1} sx={{minHeight: '100vh', minWidth:'100vw',height:'100vh', width:'100vw', display: 'flex', flexDirection: 'column'}}>
      <Grid container
      spacing={2}
      columns={16}
      style={{ height: '100vh', width:'100vw' }}>
        <Grid item xs={16}>
          <Box
            bgcolor="white"
            boxShadow={'0px 4px 20px 0px rgba(167,167,167,0.5)'}
            sx={{position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', width:'100vw'}}
          >
            <Typography variant='h1' color={'#1d45ac'} >Will It Fit?</Typography>
          </Box>
          
        </Grid>

        <Grid item xs={7}>
          <Box
            p={2}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', height:'50px'}}
          >
            <Typography variant='h2' color={'#1d45ac'} >1</Typography>
            <Typography variant='h2' >Car Details</Typography>
          </Box>
          </Grid>
          <Grid item xs={2}>
          </Grid>
          <Grid item xs={7}>
          <Box
            p={2}
            sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column', height:'50px'}}
          >
            <Typography variant='h2' color={'#1d45ac'} >2</Typography>
            <Typography variant='h2' >Items</Typography>
          </Box>
          </Grid>

          <Grid item xs={7} sx={{background:''}}>
          <Box 
            p={2}>
          <Container
            maxWidth="md" 
            sx={{position:'relative', background:'linear-gradient(to right, rgba(253, 253, 253, 0.60), rgba(228, 228, 228, 0.60))', width:'80%', height:'40vh', top:'0px', display: 'flex', flexDirection:'row',justifyContent: 'space-between', alignItems: 'center'}}
          >
            <Box justifyContent="center" alignContent={'center'}>
              Icon
            </Box>
            <Box alignContent={'center'} flexDirection={'column'} right={'200px'}>
              <MakeSelector make={selectedMake} handleSelector={handleMakeSelector} />
              <ModelSelector selectedMake={selectedMake} selectedModel={selectedModel} handleSelector={handleModelSelector} />
              <YearSelector selectedMake={selectedMake} selectedModel={selectedModel} selectedYear={selectedYear} handleSelector={handleYearSelector} />
            </Box>
          </Container>
          </Box>
          </Grid>
          <Grid item xs={2}>
            <Box alignContent={'center'} justifyContent={'center'} position={'relative'} display={'flex'} sx ={{background:'', height:'300px'}}>
              <PlayArrowRounded sx={{fontSize:'10vw', color:'rgba(29, 69, 172, 0.83)', display:'flex', margin:'70px'}}/>
            </Box>
          </Grid>
          <Grid item xs={7}>
          <Box
            p={2}
          >
            <Container maxWidth="md" sx={{position:'relative', flexDirection:'column', alignItems:'center', display:'flex'}}>
            <ItemBracket item={currItem} onChangeItem={handleAddItemChange} onItemSave={handleItemSave}/>
            <Box sx={{maxHeight:'200px', overflow:'scroll', 
            '&::-webkit-scrollbar': {
              width: '0.3em'
            },
            '&::-webkit-scrollbar-track': {
              boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
              webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0,0,0,.1)',
              outline: '1px solid slategrey'
            },
            '&::-webkit-scrollbar-corner': { background: 'transparent' }
            }}>
            {items.toReversed().map((item) => (
              <SavedItem key={item.id} item={item} onItemDelete={handleDeleteItem} />
            ))}
            </Box>
          </Container>
          </Box>
          </Grid>

          <Grid item xs={16}>
          <Box sx={{position: 'fixed', bottom: 0, left: 0, width: '100%'}}>
            {selectedMake && selectedModel && selectedYear ?
              <Button variant='contained' onClick={handleNextPage} sx={{minWidth:'100%', background:'rgb(104,175,215,1)', '&:hover':{background:'rgb(104,155,215,1)'}}}>Calculate Result</Button>
              :
              <Button disabled variant='contained' onClick={handleNextPage} sx={{minWidth:'100%'}}>Calculate Result</Button>
            }
            </Box>
          </Grid>
        
        
        </Grid>
        </Box>
    );
    }

    

    

    