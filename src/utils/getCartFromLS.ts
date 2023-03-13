import { calcPizzasProps } from "./calcPizzasProps";

export const getCartFromLS = () => {
    const data = localStorage.getItem('cart');
    const items = data ? JSON.parse(data) : [];
    const pizzaProps = calcPizzasProps(items);

        return {
            items,
            totalPrice: pizzaProps.itemsTotalprice,
            totalValue: pizzaProps.itemsTotalValue,
        }
}