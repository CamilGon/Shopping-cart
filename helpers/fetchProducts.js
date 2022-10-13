const fetchProducts = async (produto) => {
  try {
    const fullUrl = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
    const response = await fetch(fullUrl);
    const dataBase = await response.json();
    return dataBase;
  } catch (error) {
    throw new Error('You must provide an url');
  } 
};

if (typeof module !== 'undefined') { 
  module.exports = {
    fetchProducts,
  };
}
