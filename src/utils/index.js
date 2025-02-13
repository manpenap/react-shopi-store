/**
 * this function calculates total price of a new order
 * @param {Array} listProducts cartProduct: Array of Objets
 * @returns {number} Total price
 */
export const totalPrice = (listProducts) => {
    const totalPrice = listProducts.reduce((acc,product)=>acc + product.price ,0)
    return totalPrice
}

