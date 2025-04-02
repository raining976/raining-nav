export default function (req, res) {
    let prefix = "/hitokoto-api"
    if (!req.url.startsWith(prefix)) {
        return;
    }
    let target = "https://v1.hitokoto.cn"+ req.url.substring(prefix.length);


    var options = {
        'method': 'GET',
        'url': target,
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(response.body);
        res.end();
    });
}