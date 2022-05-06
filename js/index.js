const list = document.querySelector('.slider-box');
const items = document.querySelectorAll('.visual');
const btnPrev = document.querySelector('.bx-prev');
const btnNext = document.querySelector('.bx-next');
const paginations = document.querySelector('.paginations');
const lastIndex = items.length - 1;
let selected = 0;
let interval;


const setTransition = (value) => {
  list.style.transition = value;
};

const setTranslate = ({ index, reset }) => {
  if (reset) {
    list.style.transform = `translate(-${list.clientWidth}px, 0)`;
  }
  else {
    list.style.transform = `translate(-${(index + 1) * list.clientWidth}px, 0)`;
  }  
};

const activePagination = (index) => {
  [...paginations.children].forEach((pagination) => {
    pagination.classList.remove('active');
  });
  paginations.children[index].classList.add('active');
};

const handlePagination = (e) => {
  if (e.target.dataset.num) {
    selected = parseInt(e.target.dataset.num);
    setTransition('all 0.3s linear');
    setTranslate({ index: selected });
    activePagination(selected);
  }
};

const makePagination = () => {
  if (items.length > 1) {
    for (let i = 0; i < items.length; i++) {
      const button = document.createElement('li');
      button.dataset.num = i;
      button.classList.add('pagination');
      if (i === 0) {
        button.classList.add('active');
      }
      paginations.appendChild(button);
      paginations.addEventListener('click', handlePagination);
    }
  }
};


const handlePrev = () => {
  selected -= 1;
  setTransition('transform 0.3s linear');
  setTranslate({ index: selected });
  if (selected < 0) {
    selected = lastIndex;
    setTimeout(() => {
      setTransition('');
      setTranslate({ index: selected });
    }, 300);
  }
  if (selected >= 0) activePagination(selected);
};

const handleNext = () => {
  console.log(selected);
  selected += 1;
  setTransition('transform 0.3s linear');
  setTranslate({ index: selected });
  if (selected > lastIndex) {
    selected = 0;
    setTimeout(() => {
      setTransition('');
      setTranslate({ index: selected });
    }, 300);
  }
  if (selected <= lastIndex) activePagination(selected);
};

const clickButton = () => {
  if (items.length > 1) {
    btnPrev.addEventListener('click', handlePrev);
    btnNext.addEventListener('click', handleNext);
  }
};


const cloneElement = () => {
  list.prepend(items[lastIndex].cloneNode(true));
  list.append(items[0].cloneNode(true));
  setTranslate({ reset: true });
};


const autoplayIterator = () => {
  selected += 1;
  setTransition('all 0.3s linear');
  setTranslate({ index: selected });
  if (selected > lastIndex) {
    activePagination(0);
    clearInterval(interval);
    setTimeout(() => {
      selected = 0;
      setTransition('');
      setTranslate({ reset: true });
      autoplay({ duration: 2500 });
    }, 300);
  }
  if (selected <= lastIndex) activePagination(selected);
};

const autoplay = ({ duration }) => {
  interval = setInterval(autoplayIterator, duration);
};
    
const render = () => {
  clickButton();
  makePagination();
  cloneElement();
  autoplay({ duration: 2500 });
};
render();