const https = require("http");
const colors = require("colors");
const interval = 1000 * 60 * 3;

const endpoints = [
  "http://entertrain.127computerban.de/api/get-videos/500",
  "http://entertrain.127computerban.de/api/get-videos/3dd40040-d509-11e8-8038-062de916a6a6/3dfadae6-d509-11e8-8038-062de916a6a6/3e345bcd-d509-11e8-8038-062de916a6a6"
];

const fetchUrl = async urls => {
  urls.map(url => {
    https.get(url, resp => {
      const now = new Date();
      let nowText = (datetext = now.toTimeString());
      nowText = nowText.split(" ")[0];

      // A chunk of data has been recieved.
      if (resp.statusCode == 200) {
        console.log(
          `${nowText} - [${resp.statusMessage}] [${resp.statusCode}]`.green,
          url
        );
      } else {
        console.log(
          `${nowText} - [${resp.statusMessage}] [${resp.statusCode}]`.red,
          url
        );
      }
    });
  });
};

setInterval(() => {
  console.clear();

  fetchUrl(endpoints);
}, interval);

fetchUrl(endpoints);
