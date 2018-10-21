const axios = require('axios');
const cheerio = require('cheerio');
const moment = require('moment');

const apiServer = require('../apiServer');

const parseTime = timeString => {
  const timeItems = timeString
    .replace('min', '')
    .trim()
    .split(':');

  return moment.duration({ seconds: Number(timeItems[1]), minutes: Number(timeItems[0]) }).asSeconds();
};

const parseLinks = links => apiServer.sendToBackend(links.map(l => ({ ...l, duration: parseTime(l.duration) })));

const getGalieo = async () => {
  for (let i = 1998; i < 2014; i++) {
    const res = await axios({
      method: 'GET',
      url: `https://www.prosieben.de/tv/galileo/videos/archiv/${i}`,
    });

    const $ = cheerio.load(res.data);

    const links = $('section.element a.clickable-box-link')
      .map(function(i, el) {
        return {
          url: `https://www.prosieben.de/${$(this).attr('href')}`,
          title: $(this)
            .find('.teaser-headline')
            .text(),
          description: $(this)
            .find('.teaser-description')
            .text(),
          duration: $(this)
            .find('.teaser-lineB')
            .text(),
          categories: ['Wissen', 'Information', 'Galileo'],
        };
      })
      .get();

    await parseLinks(links);
  }
};

module.exports = { getGalieo };
