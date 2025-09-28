import { initSub } from './exchange.js';
import { renderHotel } from './hotel.js';
import { renderRestaurant } from './restaurant.js';
import { renderWeather } from './weather.js';

// 수정코드
const links = document.querySelectorAll('.pages');

// 페이지별 JS 실행
function connectScript(a) {
  const script = document.createElement('script');
  const page = a.slice(0, -5);
  script.src = `./src/js/${page}.js`;
  script.setAttribute('data-dynamic', 'true');
  script.type = 'module';
  document.body.appendChild(script);
}

async function changePages(page) {
  try {
    console.log('page:', page);

    const res = await fetch(`./src/html/${page}`);
    const data = await res.text();

    const app = document.getElementById('container');
    app.innerHTML = await data;

    // 기존 동적 스크립트 제거
    document
      .querySelectorAll('script[data-dynamic]')
      .forEach((s) => s.remove());

    // 새 스크립트 연결
    connectScript(page);
  } catch (e) {
    console.error('페이지 로드 실패:', e);
  }
}
export async function getJsonData(page) {
  const fileName = page.slice(0, -5); // fileName: hotel, restaurant...
  const res = await fetch(`./src/data/${fileName}.json`);
  const data = await res.json();
  return data;
}
links.forEach((link) =>
  link.addEventListener('click', async () => {
    const page = link.getAttribute('data-page');
    await changePages(page);

    console.log(page); // page: hotel.html, restaurant.html
    if (page === 'hotel.html') renderHotel();
    if (page === 'restaurant.html') renderRestaurant();
    if (page === 'weather.html') renderWeather();
    if (page === 'exchange.html') initSub();
  })
);

// 헤더
let hamberger = document.querySelector('.ham_bar button');
let body = document.querySelector('body');
let nav = document.querySelector('nav');
hamberger.addEventListener('click', () => {
  hamberger.classList.toggle('on');
  if (hamberger.classList.contains('on')) {
    body.style.overflow = 'hidden';
    nav.classList.add('active');
  } else {
    body.style.overflow = 'auto';
    nav.classList.remove('active');
  }
});

// 헤더 반응형
function resizeW() {
  let bodyW = body.clientWidth;
  if (bodyW > 1024) {
    hamberger.classList.remove('on');
    body.style.overflow = 'auto';
    nav.classList.remove('active');
  }
}
window.addEventListener('resize', resizeW);
