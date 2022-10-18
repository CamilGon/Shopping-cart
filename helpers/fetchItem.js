const fetchItem = async (itemID) => {
  // seu código aqui
  try {
    const fullUrl = `https://api.mercadolibre.com/items/${itemID}`;
    const response = await fetch(fullUrl);
    const idItem = await response.json();
    return idItem;
  } catch (error) {
    throw new Error('You must provide an url');
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
