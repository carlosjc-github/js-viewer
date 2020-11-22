const connect = require('connect'),
    fileSystem = require('fs'),
    url = require('url');

function echo(request, response) {
    if (request.url.startsWith('/directory-files')) {
        const directoryPath = url.parse(request.url, true).query.path;
        fileSystem.readdir(directoryPath, function (err, files) {
            if (err) {
                response.write('Unable to scan directory: ' + err);
                response.end();
            }
            else {
                list = files.length === 0 ? '' : files.reduce((result, file) => `${result},${file}`);
                response.write(list);
                response.end();
            }
        });
    }
    else {
        response.statusCode = 404;
        response.write(`${request.url} not found.`);
        response.end();
    }
}

connect()
    .use('/rest', echo)
    .use('/public', (request, response) => {
        const htmlStream = fileSystem.createReadStream(`src/webapp/${request.url}`);
        htmlStream.pipe(response);
    })
    .use((request, response) => {
        if (request.url === '/') {
            const htmlStream = fileSystem.createReadStream('src/webapp/index.html');
            htmlStream.pipe(response);
        }
        else {
            response.statusCode = 404;
            response.end();
        }
    })
    .listen(3000);
