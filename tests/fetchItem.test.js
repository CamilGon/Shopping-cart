require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it('Teste se fetchItem é uma função', () => {
    expect(typeof fetchItem).toBe('function'); 
   });
   it('Execute a função fetchItem com o argumento do item "MLB1615760527" e teste se fetch foi chamada', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toBeCalled();
   });
   it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', () => {
    fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
   });
   it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint "https://api.mercadolibre.com/items/MLB1615760527"', async () => {
    expect(await fetchItem('MLB1615760527')).toStrictEqual(item);
   });
   it('Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: "You must provide an url".', async () => {
    try {
      await fetchItem();
    } catch (element) {
      expect(element.message).toEqual(new Error('You must provide an url'));
    }
  });
});
