import { getJsonData } from './common.js';

// 수정코드
export async function renderRestaurant() {
  const restaurant = 'restaurant.html';
  const data = await getJsonData(restaurant);
  console.log(data);

  let recoList = document.getElementById('recoList');
  let commonPop = document.querySelector('.common_pop');
  data.forEach((res) => {
    let recoli = document.createElement('li');
    recoli.innerHTML = `
      <button type="button" class="reco_ck_btn">
                <div class="res_box">
                  <div class="img_wrap">
                    <img src="./src/img/sub/restaurant/${res.img}" alt="${res.title}">
                  </div>
                  <div class="inform_wrap">
                    <ul>
                      <li><span>상호 : </span>${res.title}</li>
                      <li><span>영업시간 : </span>${res.time}</li>
                      <li><span>평균 가격 :</span>${res.price}</li>
                      <li><span>추천 메뉴 : </span>${res.menu}</li>
                      <li><span>가게 정보 : </span>${res.info}</li>
                    </ul>
                  </div>
                </div>
              </button>
            `;
    if (recoList) {
      recoList.appendChild(recoli);
    }

    recoli.addEventListener('click', () => {
      commonPop.style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
      let mapBox = document.querySelector('.res_pop .map');
      let mapTit = document.querySelector('.common_pop .tit_wrap p');

      for (let key in res) {
        if (key.indexOf('ads') === 0) {
          mapBox.innerHTML = '';
          mapTit.textContent = data.title;
          mapBox.innerHTML += `
            <p>${res.map}</p>
            <iframe src="${res[key]}">
              `;
        }
      }
    });
    let closeBtn = document.getElementById('close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        commonPop.style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
      });
    }
    let pop_close = document.getElementById('btn_close');
    if (pop_close) {
      pop_close.addEventListener('click', () => {
        commonPop.style.display = 'none';
        document.querySelector('body').style.overflow = 'auto';
      });
    }
  });
}
renderRestaurant();
