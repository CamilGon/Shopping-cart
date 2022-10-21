// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// Fique a vontade para modificar o código já escrito e criar suas próprias funções!
/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createProductImageElement(thumbnail));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
// remove itens do carrinho 
const cartItemClickListener = (evento) => {
const id = evento.target.innerText.split(' ')[1];
const cart = JSON.parse(getSavedCartItems('cartItems')) || [];
const newcart = cart.filter((item) => item.id !== id);
localStorage.setItem('cartItems', JSON.stringify(newcart));
evento.target.remove();
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */

const createCartItemElement = ({ id, title, price }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: $${price}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}; 
// renderisa o retorno da api
const renderResults = async () => {
  const datas = await fetchProducts('computador');
  const itens = document.querySelector('.items');
  datas.results.forEach((data) => {
    itens.appendChild(createProductItemElement(data));
  });
};
// adiciona no localStorage
const addLocalStorage = (data) => {
  const cart = JSON.parse(getSavedCartItems('cartItems')) || [];
  console.log(cart);
  saveCartItems('cartItems', data, cart);
};
// adiciona item ao carrinho 
const itemCard = document.querySelector('.cart__items');
const addItemCarrinho = async (evento) => {
const eventoCarr = evento.target.parentElement.firstChild.innerText;
const data = await fetchItem(eventoCarr);
console.log(data);
addLocalStorage(data);
const item = createCartItemElement(data);
itemCard.appendChild(item);
};
// limpa carrinho
const clearCart = (event) => {
const carList = document.querySelector('.cart__items');
carList.innerText = '';
event.target.remove();
localStorage.clear();
};
window.onload = async () => {
  await renderResults();
  const button = document.querySelectorAll('.item__add');
  button.forEach((element) => element.addEventListener('click', addItemCarrinho));
  const cart = JSON.parse(getSavedCartItems('cartItems')) || [];
  cart.forEach((item) => {
    const itemElement = createCartItemElement(item);
    itemCard.appendChild(itemElement);
  });
  const buttonLimpar = document.querySelectorAll('.empty-cart');
  buttonLimpar.forEach((element) => element.addEventListener('click', clearCart));
};
