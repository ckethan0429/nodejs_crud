var members = ['egoing', 1];
console.log(members[1])

var roles = {
    'programmer': 'egoing',
    'designer' : 'k8805',
    'manager' : 'hoya'
}

console.log(roles.programmer)
console.log(roles['programmer'])

for(var name in roles){
    console.log(name,": ", roles[name]);
}

//함수는 자체가 값이 될수 있다.
// 연관된 데이터를 그룹핑하는 객체가 될수 있다.
var f = function(){
    console.log("객체지향");
}
var a = [f];
a[0]();

var o = {
    func : f
}

o.func();