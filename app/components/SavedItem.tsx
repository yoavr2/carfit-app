'use client';

import { Container, Box} from '@mui/system';
import TextField from '@mui/material/TextField';
import ItemBracket from './ItemBracket';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Item } from '../lib/definitions';
import { Delete } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';

export default function SavedItem({item, onItemDelete} : {item : Item, onItemDelete : (id : number) => void}) {

    return(
        <Box display={'flex'} flexDirection={'row'} sx={{background:'white', justifyContent:'space-evenly', alignItems:'center'}} p={1} width={'20vw'} margin={'1vh'}>
            <Typography>{item.name}</Typography>
            <Typography>length: {item.length} </Typography>
            <Typography>width: {item.width}</Typography>
            <Typography>height: {item.height}</Typography>
            <IconButton onClick={()=>{onItemDelete(item.id)}}>
                <Delete></Delete>
            </IconButton>
        </Box>
    );
}

export function ItemDesc({item, onItemChange} : {item : Item, onItemChange : (event: React.ChangeEvent<HTMLInputElement>, id : number, property : string) => void}) {
    return(
        <>
        <Container sx={{position:'relative'}}>
                <TextField
                disabled
                margin='normal'
                id="outlined-length"
                label="Length"
                defaultValue="0"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    onItemChange(event, item.id, "l");
                }}
                />
            </Container>
            <Box sx={{position:'relative'}}>
                <TextField
                disabled
                margin='normal'
                id="outlined-width"
                label="Width"
                defaultValue="0"
                />
            </Box>
            <Box sx={{position:'relative'}}>
                <TextField
                disabled
                margin='normal'
                id="outlined-height"
                label="Height"
                defaultValue="0"
                />
            </Box>
        </>
    );
}