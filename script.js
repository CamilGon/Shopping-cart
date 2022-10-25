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
// calcular preço de produtos 
const totalPrice = async () => {
const htmlPrice = document.querySelector('.total-price');
const listItens = document.querySelectorAll('.cart__item');
let total = 0;
listItens.forEach((item) => { total += Number(item.innerText.split('$')[1]); });
htmlPrice.innerText = `R$ ${total.toFixed(2)}`;
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
totalPrice();
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
addLocalStorage(data);
const item = createCartItemElement(data);
itemCard.appendChild(item);
totalPrice();
};
// limpa carrinho
const clearCart = (event) => {
const carList = document.querySelector('.cart__items');
carList.innerText = '';
event.target.remove();
localStorage.clear();
totalPrice();
};
// função add mensagem de carregamento na pagina
const load = () => {
  const mensagem = document.createElement('h1');
  mensagem.innerText = 'Carregando...';
  mensagem.className = '.loading';
  mensagem.style.margin = 'auto auto';
  hHeader = document.querySelector('body');
  hHeader.appendChild(mensagem);
};
// remove mensagem de carregamento
function removeLoad() {
  body = document.querySelector('body');
  body.removeChild(document.querySelector('.loading'));
}

window.onload = async () => {
  load();
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
  removeLoad();
  totalPrice();
};
