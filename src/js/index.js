import '../css/index.scss';
import background from '../images/background-4.png';
// let greeter = require('./../utils/changeDom');
// import greeter from './../utils/changeDom'
class Person {
  age = 18
}
let img = new Image();
img.src = background;
img.style.width = '200px';
var greeter = import('./../utils/changeDom').then(module => {
  resolve(module.default)
});
console.log(greeter)
document.querySelector("#root").appendChild(import('./../utils/changeDom').then(module => {
  module.default()
}));
document.querySelector("#root").appendChild(img);
console.log(process.env.NODE_ENV);