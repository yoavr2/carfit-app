import { Item } from "./definitions";

export default function fit(length : number, width: number, height: number, cc: number, items: Item[]){
    let remainingSpaceDim = (length * width * height)/1000;
    let remainingSpaceDimcc = cc * 1000;
    let remainingSpace = remainingSpaceDimcc;
    if (remainingSpaceDim >= remainingSpaceDimcc){
        remainingSpace = remainingSpaceDim;
    }
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
}
