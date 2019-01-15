function deepClone(o) {
  let clonedObject = Array.isArray(o) ? [] : {};

  for (let key in o) {

    if (typeof o[key] === 'object'){
      clonedObject[key] = deepClone(o[key]);
    }else{
      clonedObject[key] = o[key];
    }
  }
  return clonedObject;
}


let o = {
  hello: function(){console.log('hello');},
  age: 18,
  classes: [1,2,3],
  foods:{
    morning: ['A','B'],
    moon:'meat'
  }
}

let b = deepClone(o);

o.hello = function(){console.log('hello,new')};
o.classes = [4,5,6];

b.foods.morning = 'h';
b.hello();

console.log(b);
console.log(o);