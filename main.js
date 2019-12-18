var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function tempalteHTML(title, list, body, control){
    return `<!doctype html>
    <html>
    <head>
    <title>WEB - ${title}</title>
    <meta charset="utf-8">
    </head>
    <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
    </body>
    </html>
    `;
}

function templateList(filelist){
    var list = '<ul>';
    var i = 0;
    while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        i= i+1;
    }
    list = list + '</ul>';

    return list
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var fs = require('fs');
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    //queryData를 통하여 주소값 불러오기
    var title = queryData.id;
    
    //정보를 반드시 찍어보기.
    //console.log(url.parse(_url, true));
    console.log(pathname)
    if(pathname == '/'){
        //id가 없을 때
        if(queryData.id === undefined){
            fs.readdir('./data', function(err, filelist){
                //console.log(filelist);
                var title = 'Welcome';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = tempalteHTML(title,list,
                    `<h2>${title}</h2>${description}`,
                    `<a href="/create">create</a>`,
                    );
                response.writeHead(200);
                response.end(template);
            });

                        
        //id가 존재할때  
        }else{
            fs.readdir('./data', function(err, filelist){
                //console.log(filelist); 
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                    var list = templateList(filelist);
                    var template = tempalteHTML(title,list,
                        `<h2>${title}</h2>${description}`,
                        `<a href="/create">create</a> 
                        <a href="/update?id=${title}">update</a> 
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                        </form>
                        `,
                        );
                    response.writeHead(200);
                    response.end(template);
                });
            });
        } 
    } else if(pathname === '/create'){
        
            fs.readdir('./data', function(err, filelist){
                //console.log(filelist);
                var title = 'Web - Create';
                var description = 'Hello, Node.js';
                var list = templateList(filelist);
                var template = tempalteHTML(title,list,
                    `<form action="/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p><textarea name="description" placeholder="content"></textarea>
                    </p>
                    <p><input type="submit"></p>
                    </form>`,
                    '');
                response.writeHead(200);
                response.end(template);
            });
    } else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        //정보수신이 끝남
        request.on('end', function(){
            //querystring 모듈불러오기
            var post = qs.parse(body);
            console.log(post);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                //다른페이지로 넘겨버리기(리다이렉션)
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end('success');
            });
            console.log(title);
            console.log(description);
        });

        
    }
    else if(pathname==='/update'){
        fs.readdir('./data', function(err, filelist){
            //console.log(filelist); 
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
                var list = templateList(filelist);
                var template = tempalteHTML(title,list,
                    `<form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                    <p><textarea name="description" placeholder="description">${description}</textarea>
                    </p>
                    <p><input type="submit"></p>
                    </form>
                    `,
                    `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`,
                    );
                response.writeHead(200);
                response.end(template);
            });
        });
    }

    else if(pathname==='/update_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        //정보수신이 끝남
        request.on('end', function(){
            //querystring 모듈불러오기
            var post = qs.parse(body);
            var id = post.id
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`,`data/${title}`,function(error){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    //다른페이지로 넘겨버리기(리다이렉션)
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end('success');
                });
            })
            console.log(post);
        });
    }
    else if(pathname === '/delete_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, function(error){
              response.writeHead(302, {Location: `/`});
              response.end();
              console.log(post)
            })
        });
      } 

    else {
        // 페이지 찾을 수 없음.
        response.writeHead(404);
        response.end('Not found');
    }
    
    
});
app.listen(3000);