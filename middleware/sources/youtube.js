const { google } = require('googleapis');
const moment = require('moment');

const apiServer = require('../apiServer');

const service = google.youtube('v3');
const API_KEY = '';

let count = 0;
const limit = 1000;

const getVideos = async pageToken => {
  const res = await service.videos.list({
    auth: API_KEY,
    part: 'snippet,contentDetails',
    regionCode: 'DE',
    chart: 'mostPopular',
    videoCategoryId: '',
    maxResults: 50,
    pageToken: pageToken,
  });

  await apiServer.sendToBackend(
    res.data.items.map(i => ({
      url: `https://www.youtube.com/watch?v=${i.id}`,
      duration: moment.duration(i.contentDetails.duration).asSeconds(),
      priority: 0,
      source: 'YouTube',
      categories: i.snippet.tags,
      title: i.snippet.title,
      description: i.snippet.description,
      thumbnail: i.snippet.thumbnails.high.url,
    })),
    'YOUTUBE',
  );

  count += res.data.items.length;

  // TODO: Remove!!
  if (count <= limit && res.data.nextPageToken) await getVideos(res.data.nextPageToken);
};

module.exports = { getVideos };
