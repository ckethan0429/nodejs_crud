
//함수는 값이다
//객체는 데이터를 저장하는 그릇
//연관된 데이터 기능을 그룹핑함으로써 코드의 복잡성을 획기정으로 낮출수 있음.

var o = {
    v1: 'v1',
    v2: 'v2',
    f1: function(){
        console.log(this.v1);
    },
    f2: function(){
        console.log(this.v2);
    }
}

o.f1();
o.f2();