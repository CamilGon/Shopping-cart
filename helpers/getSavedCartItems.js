const getSavedCartItems = async (cartItem) => localStorage.getItem(cartItem);

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
