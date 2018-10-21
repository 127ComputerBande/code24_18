const axios = require('axios');
const xml2js = require('xml2js');

const apiServer = require('../apiServer');

const parseXML = xml =>
  new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });

const get7tv = async () => {
  const res = await axios({ method: 'GET', url: 'https://www.7tv.de/sitemaps/sitemap-videos.xml' });
  const data = await parseXML(res.data);
  const locations = data.sitemapindex.sitemap.map(s => s.loc[0]);

  // for (const loc of locations) {
  const loc = locations[0];
  const resInner = await axios({ method: 'GET', url: loc });
  const innerData = await parseXML(resInner.data);
  const url = innerData.urlset.url;

  debugger;

  await apiServer.sendToBackend(
    url.map(u => ({
      url: u.loc[0],
      source: 'https://www.7tv.de/sitemaps/sitemap-videos.xml',
      duration: Number(u['video:video'][0]['video:duration'][0]),
      priority: 100,
      categories: ['7TV'],
      title: u['video:video'][0]['video:title'][0],
      description: u['video:video'][0]['video:description'][0],
      thumbnail: u['video:video'][0]['video:thumbnail_loc'][0],
    })),
    '7tv',
  );
  // }
};

module.exports = { get7tv };
