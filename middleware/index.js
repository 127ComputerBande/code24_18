const Promise = require('bluebird');
const sportSource = require('./sources/sport');
const youtubeSource = require('./sources/youtube');
const galileoSource = require('./sources/galileo');

const main = async () => {
  await Promise.all([
    sportSource.getPage(sportSource.SPORT_DEUTSCHLAND_API),
    sportSource.getPage(sportSource.YOU_SPORT_API),
    youtubeSource.getVideos(),
    galileoSource.getGalieo(),
  ]);
};

main();
