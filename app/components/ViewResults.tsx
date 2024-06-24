import { Container, Box} from '@mui/system';
import Typography from '@mui/material/Typography';
import {Item, Specs} from '../lib/definitions';


export default function ViewResults({items, specs} : {items : Item[], specs : Specs | null}) {
    let length = parseInt(specs ? specs.min_length : "0");
    let width = parseInt(specs ? specs.min_width : "0");
    let height = parseInt(specs ? specs.height : "0");
    // console.log(height);

    const filterItemsToFit = (items: Item[], length : number, width: number, height: number) => {
        let remainingLength = length;
        let remainingWidth = width;
        let remainingHeight = height;

    
        const fit = items.filter((item) => {
            let currLength = parseInt(item.length);
            let currWidth = parseInt(item.width);
            let currHeight = parseInt(item.height);
    
            if (currLength <= remainingLength && currWidth <= remainingWidth && currHeight <= remainingHeight) {
                remainingLength -= currLength;
                remainingWidth -= currWidth;
                remainingHeight -= currHeight;
                return true;
            }
            return false;
        });
    
        return fit;
    };

    const calculateFit = (items: Item[], length : number, width: number, height: number) => {
        let remainingSpace = length * width * height;
        const fit = items.filter((item) => {
            let currLength = parseInt(item.length);
            let currWidth = parseInt(item.width);
            let currHeight = parseInt(item.height);
            let currSpace = currLength * currWidth * currHeight;
    
            if (currSpace <= remainingSpace) {
                remainingSpace -= currSpace;
                return true;
            }
            return false;
        });
    
        return fit;
    };

    const fittingItems = calculateFit(items, length, width, height);
    // console.log(fittingItems);

    return(
        <Box maxHeight={'40vh'} overflow={'scroll'} sx ={{
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
            {fittingItems.map((item) => (
                <Box key={item.id} margin={2}> {item.name}</Box>
            ))}
        </Box>
    );
}
