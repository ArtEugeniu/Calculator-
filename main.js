let a = '';
let b = '';
let sign = '';
let finish = false;
const numbersArr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const signArr = ['+', '-', '*', '/'];
const out = document.querySelector('.infoPannel');
const buttonBox = document.querySelector('.buttonBox');
const activeButtons = document.querySelectorAll('.simbol');

function clear() {
  a = '';
  b = '';
  sign = '';
  out.textContent = '0';
  activeButtons.forEach(item => item.classList.remove('active'));
}

function click(event) {
  let current = event.target.textContent;

  if (event.target.classList.contains('ac')) clear();
  if (!event.target.classList.contains('btn')) return;

  if (numbersArr.includes(current)) {
    if (b == '' && sign == '') {
      if (current == '.' && a.includes('.')) return;
      a += current;
      out.textContent = a;
    } else if (a !== '' && b !== '' && finish) {
      b = current;
      finish = false;
      out.textContent = b;
    }
    else {
      if (current == '.' && b.includes('.')) return;
      b += current;
      out.textContent = b;
    }
  }

  if (signArr.includes(current)) {
    if (a !== '' && b !== '' && !finish) {
      calculate(sign);
      sign = current;
      out.textContent = a;
    }
    sign = current;
    activeButtons.forEach(item => item.classList.remove('active'));
    event.target.classList.add('active')
  }

  if (current == '=') {
    if (a !== '' && b == '') b = a;
    calculate(sign);
    activeButtons.forEach(item => item.classList.remove('active'));
  }

  if (current == '=' && a == '' && b == '') {
    out.textContent = '0';
  }
}

function calculate(sign) {
  switch (sign) {
    case '+':
      a = (+a) + (+b);
      break;
    case '-':
      a = (+a) - (+b);
      break;
    case '*':
      a = (+a) * (+b);
      break;
    case '/':
      if (b === '0') {
        out.textContent = 'Err';
        a = '';
        sign = '';
        return;
      };
      a = (+a) / (+b);
      break;
  }
  out.textContent = Math.round(+a * 1000000) / 1000000;
  finish = true;
}


buttonBox.addEventListener('click', click);
