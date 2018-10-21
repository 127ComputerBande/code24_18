const axios = require('axios');
const Promise = require('bluebird');

const API_BASE = 'http://entertrain.127computerban.de/api';

const getCategories = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: API_BASE + '/categories',
    });

    return res.data['hydra:member'].map(cat => ({ id: cat['@id'], name: cat.name }));
  } catch (error) {
    console.error(error);
    return [];
  }
};

const transformCategories = (serverCategories = [], itemCategories = []) =>
  serverCategories
    .filter(cat => itemCategories.findIndex(innerCat => innerCat.name.toLowerCase() === cat.name.toLowerCase()))
    .map(cat => cat.id);

const sendToBackend = async (items, caller) => {
  const categories = await getCategories();

  console.log(caller, 'number of items', items.length);

  await Promise.map(items, async item => {
    const toServerItem = { ...item, categories: transformCategories(categories, item.categories) };

    try {
      const res = await axios({
        method: 'POST',
        url: API_BASE + '/videos',
        data: toServerItem,
      });

      console.log(res.status);
    } catch (error) {
      console.log(error.response ? error.response.status : error);
    }
  });
};

module.exports = { sendToBackend, getCategories };
