// Esse tipo de comentário que estão antes de todas as funções são chamados de JSdoc,
// experimente passar o mouse sobre o nome das funções e verá que elas possuem descrições!

// const { fetchItem } = require('./helpers/fetchItem');

// const { fetchProducts } = require('./helpers/fetchProducts');

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
const getIdFromProductItem = (product) =>
  product.querySelector('span.id').innerText;

// criando func. requisito 5 revover itens do carrinho 
const cartItemClickListener = (evento) => {
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
    // const item = createProductItemElement(data);
    itens.appendChild(createProductItemElement(data));
    // console.log(item);
  });
};

const itemCard = document.querySelector('.cart__items');

const addItens = async (event) => {
 const idProduct = event.target.parentNode.firstChild.innerText;
 const data = await fetchItem(idProduct);
 itemCard.appendChild(createCartItemElement(data));
//  localStorage.setItem('cartItems', JSON.stringify([]));
const recebeData = JSON.parse(localStorage.getItem('cartItems'));
  recebeData.push(data);
  saveCartItems(JSON.stringify(recebeData)); 
};
// comando remove item localStorage.clear();
// salva o carrinho no local store
const carrHistorico = document.getElementsByClassName('cart__items')[0];
const renderCarrHist = () => {   
 if (!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems', JSON.stringify([]));
  } else {
    const listCarr = JSON.parse(localStorage.getItem('cartItems'));
    const itemCarr = listCarr.length - 1;
    for (let i = 0; i <= itemCarr; i += 1) {
      carrHistorico.appendChild(createCartItemElement(listCarr[i]));    
    }
  }
};

window.onload = async () => {
  await renderResults();
  const button = document.querySelectorAll('.item__add');
  button.forEach((element) => {
    element.addEventListener('click', addItens);
  });
  renderCarrHist();
};
