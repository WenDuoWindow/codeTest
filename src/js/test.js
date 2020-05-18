
import '../css/test.scss'
let greeter = require('./../utils/changeDom')
// import { greeter } from './../utils/changeDom'
document.querySelector("#test").appendChild(greeter());

