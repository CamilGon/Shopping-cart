const saveCartItems = (cardItem) => localStorage.setItem('cartItems', cardItem);

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
