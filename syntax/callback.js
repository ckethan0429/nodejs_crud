// function a(){
//     console.log('A');
// }

//함수는 값이다.
var a = function(){
    console.log('A');
}

a();

//함수기능이 끝나고 함수실행한 곳에 그다음일을 하세요
function slowfunc(callback){
    callback();
}

//slowfunc의 기능이 실행되고 나서 a를 실행함
slowfunc(a);