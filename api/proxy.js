const request = require('request');

module.exports = (req, res) => {
  let target = req.url

  var options = {
    'method': 'GET',
    'url': target,
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    res.writeHead(200, {"Content-Type": "application/json"});
    res.write(response.body);
    res.end();
  });
}