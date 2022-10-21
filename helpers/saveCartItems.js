const saveCartItems = (key, value, cart) => {
  const carrinho = [...cart, value];
  localStorage.setItem(key, JSON.stringify(carrinho));
};
if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
