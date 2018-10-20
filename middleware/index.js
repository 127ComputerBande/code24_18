const sportSource = require('./sources/sport');
const youtubeSource = require('./sources/youtube');

const main = async () => {
  await sportSource.getPage(sportSource.SPORT_DEUTSCHLAND_API);
  await sportSource.getPage(sportSource.YOU_SPORT_API);
  await youtubeSource.getVideos();
};

main();
