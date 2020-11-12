var MAX_SPARSE_ARRAY_SIZE = 1999999;

var t1 = new Array(MAX_SPARSE_ARRAY_SIZE);
console.time('t1');
for (var i = 0; i < MAX_SPARSE_ARRAY_SIZE; ++i) {
  t1.push(i);
}
console.timeEnd('t1');

var t2 = new Array(MAX_SPARSE_ARRAY_SIZE);
console.time('t2');
for (var i = 0; i < MAX_SPARSE_ARRAY_SIZE; ++i) {
  t2[i] = i;
}
console.timeEnd('t2');

var t3 = [];
console.time('t3');
for (var i = 0; i < MAX_SPARSE_ARRAY_SIZE; ++i) {
  t3.push(i);
}
console.timeEnd('t3');

var t4 = [];
console.time('t4');
for (var i = 0; i < MAX_SPARSE_ARRAY_SIZE; ++i) {
  t4[i] = i;
}
console.timeEnd('t4');

var t5 = [];
console.time('t5');
for (var i = 0; i < MAX_SPARSE_ARRAY_SIZE; ++i) {
  t5[i] = Object.create(null);
}
console.timeEnd('t5');

