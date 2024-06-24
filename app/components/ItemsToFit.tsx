import { Container, Box} from '@mui/system';
import Checkbox from '@mui/material/Checkbox';
import { Item } from '../lib/definitions';
import Typography from '@mui/material/Typography';



export default function ItemsToFit({items, handleChange} : {items : Item[], handleChange : ((id : number) => void)}) {
    

    return(
        <Box width={'60%'} maxHeight={'40vh'} overflow={'scroll'} sx ={{
            '&::-webkit-scrollbar': {
                width: '0.3em'
            },
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
            },
            '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,.1)',
                boxShadow: 'inset 0 0 6px 2px rgba(0, 0, 0, 0.3)',
                borderRadius:'15pt'
            },
            '&::-webkit-scrollbar-corner': { background: 'transparent' }
            }}>
        {items.map((item) => (
            <Box key={item.id} display={'flex'} flexDirection={'row'} justifyContent={'space-evenly'} alignItems={'center'} margin={'5px'}
            >
                <Checkbox
                    checked={item.checked}
                    onChange={()=>handleChange(item.id)}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <Typography>
                    {item.name}
                </Typography>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'}>
                    <Typography>
                        {item.length}
                    </Typography>
                    <Typography fontSize={12}>
                        Length
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'}>
                    <Typography>
                        {item.width}
                    </Typography>
                    <Typography fontSize={12}>
                        Width
                    </Typography>
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'space-evenly'} alignItems={'center'}>
                    <Typography>
                        {item.height}
                    </Typography>
                    <Typography fontSize={12}>
                        Height
                    </Typography>
                </Box>
            </Box>
        ))}
        </Box>
    );
    
}