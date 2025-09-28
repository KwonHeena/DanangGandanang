import { getJsonData } from './common.js';

// 맛집리스트 랜더링 함수 (수정된 코드)
async function renderRestaurList() {
  const restaurant = 'restaurant.html';
  const data = await getJsonData(restaurant);

  const ul = document.querySelector('.recommend_wrap > ul');
  data.forEach((item) => {
    let li = document.createElement('li');
    if (item.thema === '카페') {
      li.classList.add('cafe');
    }
    li.innerHTML = `
            <div class="img_wrap">
              <img src="./src/img/sub/restaurant/${item.img}" alt="${item.title}">

            </div>
            <div class="txt_wrap">
              <span class="tag">${item.thema}</span>
              <p class="name">${item.title}</p>
              <div class="txt02">
                <p><span>추천 메뉴 : </span>${item.menu}</p>
                 <p><span>평균 가격 : </span>${item.price}</p>
              </div>
            </div>
      `;
    ul.appendChild(li);
  });

  let lis = ul.querySelectorAll('li');
  ul.style.width = `${lis.length * 350}px`;
  drag();
}
renderRestaurList();

const wrap = document.querySelector('.recommend_wrap');

//드래그 슬라이드
function drag() {
  let ul = document.querySelector('.recommend_wrap > ul');
  let max = ul.offsetWidth - wrap.offsetWidth;

  let isDown = false;
  let sx = 0;
  let dx = 0;
  let tx = 0;

  ul.addEventListener('mousedown', (e) => {
    isDown = true;
    ul.style.cursor = 'grabbing';
    sx = e.clientX;
  });
  document.addEventListener('mouseup', () => {
    if (!isDown) return;
    isDown = false;
    ul.style.cursor = 'grab';
  });
  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    dx = e.clientX - sx;
    sx = e.clientX;
    tx += dx;

    if (tx > 0) {
      tx = 0;
    }
    if (tx < -max) {
      tx = -max;
    }

    ul.style.transform = `translateX(${tx}px)`;
  });

  // 터치 이벤트 (모바일용)
  ul.addEventListener('touchstart', (e) => {
    isDown = true;
    sx = e.touches[0].clientX;
  });
  ul.addEventListener('touchend', () => {
    isDown = false;
  });
  ul.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    dx = e.touches[0].clientX - sx;
    sx = e.touches[0].clientX;
    tx += dx;

    if (tx > 0) tx = 0;
    if (tx < -max) tx = -max;

    ul.style.transform = `translateX(${tx}px)`;
  });
}

function dragEffect() {
  let ul = document.querySelector('.recommend_wrap > ul');
  let effect = document.createElement('div');
  effect.innerText = 'Drag';
  effect.id = 'drag';

  document.querySelector('body').appendChild(effect);

  ul.addEventListener('mouseenter', () => {
    effect.style.transform = 'scale(1)';
  });
  ul.addEventListener('mouseleave', () => {
    effect.style.transform = 'scale(0)';
  });
  ul.addEventListener('mousemove', (e) => {
    effect.style.left = e.pageX + 'px';
    effect.style.top = e.pageY + 'px';
  });
}

window.addEventListener('load', () => {
  drag();
  dragEffect();
});

let mainSlide;
let slide_li;
let totalImg;
let index;
let step;
let originalCount;
let count = document.querySelector('.count');

function mainS() {
  mainSlide = document.querySelector('.main_slide ul');
  slide_li = document.querySelectorAll('.main_slide li');
  slide_li.forEach((item) => {
    let txt = document.createElement('div');
    txt.classList.add('txt');
    txt.innerHTML = `<p class="tit">여행이 필요한 순간, 다낭</p>
                    <p class="sub">푸른 바다, 맛있는 음식, 그리고 여유<br>지금 가장 완벽한 휴식을 만날 시간</p>
                  `;

    item.appendChild(txt);
  });

  originalCount = slide_li.length;

  // 첫번째 이미지, 마지막 이미지 복사
  let firstClone = slide_li[0].cloneNode(true);
  let lastClone = slide_li[slide_li.length - 1].cloneNode(true);

  mainSlide.insertBefore(lastClone, mainSlide.firstChild); // mainSlide는 DOM 구조라 unshift 안됨
  mainSlide.appendChild(firstClone);

  totalImg = originalCount + 2;
  step = 100 / totalImg;
  mainSlide.style.width = `${totalImg * 100}%`;
  index = 1;
  mainSlide.style.transform = `translateX(-${step * index}%)`;
  mainSlide.style.transition = 'transform 0.9s ease';
  count.innerHTML = `${index} / ${originalCount}`;
}
mainS();

function nextB() {
  index++;
  moveSlide();
}
function prevB() {
  index--;
  moveSlide();
}
// 슬라이드 온클릭에러 -> 지우고 이벤트 추가됨
const prevBtn = document.querySelector('.arrow_btns .prev');
const nextBtn = document.querySelector('.arrow_btns .next');
if (prevBtn) prevBtn.addEventListener('click', prevB);
if (nextBtn) nextBtn.addEventListener('click', nextB);

mainSlide.addEventListener('transitionend', () => {
  count.innerHTML = `${index} / ${originalCount}`;
  if (index === 0) {
    // 마지막 이미지로 순간이동
    mainSlide.style.transition = 'none';
    index = totalImg - 2;
    count.innerHTML = `${index} / ${originalCount}`;
    mainSlide.style.transform = `translateX(-${step * index}%)`;
    mainSlide.offsetWidth;
    mainSlide.style.transition = 'transform 0.9s ease';
  }
  if (index === totalImg - 1) {
    mainSlide.style.transition = 'none';
    index = 1;
    count.innerHTML = `${index} / ${originalCount}`;
    mainSlide.style.transform = `translateX(-${step * index}%)`;
    mainSlide.offsetWidth;
    mainSlide.style.transition = 'transform 0.9s ease';
  }
});

function moveSlide() {
  mainSlide.style.transform = `translateX(-${step * index}%)`;
}

// 자동 슬라이드
let slideStart = setInterval(nextB, 4000);

// 숙소리스트 랜더링 함수 (수정된 코드)
async function renderHotelList() {
  const hotel = 'hotel.html';
  const data = await getJsonData(hotel);

  let hotel_li = document.querySelectorAll('.hotel_info ul li');
  hotel_li.forEach((item, idx) => {
    let hotel_img = item.querySelector('.img');
    let hotel_name = item.querySelector('.text');
    hotel_img.innerHTML = `<img src="./src/img/sub/hotel/${data[idx].subImg01}.jpg">`;
    hotel_name.innerHTML = `<p>${data[idx].name}</p>`;
  });
}
renderHotelList();

// 스크롤 이벤트
window.addEventListener('scroll', () => {
  let sections = document.querySelectorAll('section');
  sections.forEach((item) => {
    let offsetTop = item.offsetTop - 160;
    let windowSet = window.scrollY;
    if (windowSet >= offsetTop) {
      sections.forEach((el) => {
        el.classList.remove('on');
      });
      item.classList.add('on');
    }
  });
});

window.addEventListener('load', () => {
  document.querySelector('.section01').classList.add('on');
});
