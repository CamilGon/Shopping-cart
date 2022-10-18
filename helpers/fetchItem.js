const fetchItem = async (itemID) => {
  try {
    if (!itemID) throw new Error('You must provide an url');
    const url = `https://api.mercadolibre.com/items/${itemID}`;
    const response = await fetch(url);
    const itemId = await response.json();
    return itemId;
  } catch (error) {
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
