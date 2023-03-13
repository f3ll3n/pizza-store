import { CartItem } from '../redux/slices/cartSlice';

export const calcPizzasProps = (items: CartItem[]) => {
    const itemsTotalprice = items.reduce((accum: any, currentValue: any) => {
        console.log(currentValue.price, currentValue.value);
        return accum + currentValue.price;
    }, 0)
    const itemsTotalValue = items.reduce((accum: any, currentValue: any) => {
        return accum + currentValue.value;
    }, 0)
    return {
        itemsTotalprice,
        itemsTotalValue
    }
}