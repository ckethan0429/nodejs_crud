var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var fs = require('fs');
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    //queryData를 통하여 주소값 불러오기
    var title = queryData.id;
    
    //정보를 반드시 찍어보기.
    //console.log(url.parse(_url, true));
    
    if(pathname == '/'){
        //id가 없을 때
        if(queryData.id === undefined){
            fs.readdir('./data', function(err, filelist){
                //console.log(filelist);
                var title = 'Welcome';
                var description = 'Hello, Node.js';

                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i= i+1;
                }
                list = list + '</ul>';

                var template = `<!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                ${description}
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);

            });

                        
        //id가 존재할때  
        }else{
            fs.readdir('./data', function(err, filelist){
                //console.log(filelist);
                var title = 'Welcome';
                var description = 'Hello, Node.js';

                var list = '<ul>';
                var i = 0;
                while(i < filelist.length){
                    list = list + `<li><a href="?id=${filelist[i]}">${filelist[i]}</a></li>`;
                    i= i+1;
                }
                list = list + '</ul>';
            

            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                
                var template = `<!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                ${list}
                <h2>${title}</h2>
                ${description}
                </body>
                </html>
                `;
                response.writeHead(200);
                response.end(template);
            });
        });
        }
    } else {
        // 페이지 찾을 수 없음.
        response.writeHead(404);
        response.end('Not found');
    }
    
    
});
app.listen(3000);