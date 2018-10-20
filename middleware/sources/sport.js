const axios = require('axios');

const apiServer = require('../apiServer');

const SPORT_DEUTSCHLAND_API = { url: 'https://sicher.sportdeutschland.tv', name: 'Sport Deutschland' };
const YOU_SPORT_API = { url: 'https://backend.yousport.de', name: 'YouSport' };

const perPage = 100;

const getPage = async (api, page = 1) => {
  try {
    const res = await axios({
      method: 'GET',
      url: api.url + '/api/assets',
      headers: {
        Accept: 'application/vnd.vidibus.v4.raw+json',
      },
      params: {
        page,
        per_page: perPage,
      },
    });

    await apiServer.sendToBackend(
      res.data.items.filter(i => i.seconds > 0).map(i => ({
        url: i.player,
        source: api.name,
        duration: i.seconds,
        priority: 100,
        categories: ['Sport'],
        title: i.title,
        description: i.teaser,
        thumbnail: i.images[0],
      })),
    );

    // TODO: Remove!!
    // if (res.headers['api-total'] > page * perPage) await getPage(api, page + 1)
  } catch (error) {
    console.error(error);
    process.exit(-1);
  }
};

module.exports = {
  SPORT_DEUTSCHLAND_API,
  YOU_SPORT_API,
  getPage,
};
