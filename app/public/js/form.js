/* eslint-disable strict */
const input = document.querySelectorAll('input');

input.forEach(ele => {
  ele.oninput = function() {
    document.querySelector('.err').innerHTML = '';
  };
});
