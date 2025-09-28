import { getJsonData } from './common.js';

export async function renderHotel() {
  const hotel = 'hotel.html';
  const data = await getJsonData(hotel);
  console.log(data);

  let hotelList = document.getElementById('hotel_list');
  let imgList = document.querySelector('.img_list');
  let commonPop = document.querySelector('.common_pop');

  data.forEach((hotel) => {
    let hotel_li = document.createElement('li');
    hotel_li.innerHTML = `
                  <div class="hotel_img">
                    <img src="src/img/sub/hotel/${hotel.subImg01}.jpg" alt="">
                  </div>
                  <div class="txtBox">
                    <div class="hotel_name">
                      ${hotel.name}
                    </div>
                    <div class="sub_info">
                        <p><strong>숙소 정보 : </strong>${hotel.info}</p>
                        <p><strong>기타 서비스 : </strong>${hotel.service}</p>
                      </div>
                    </div>
                    <a href="${hotel.site}" target="_blank" title="새 창으로 열림" class="go_site">예약사이트 바로가기</a>
      `;
    if (hotelList) {
      hotelList.appendChild(hotel_li);
    }
    let bigImg = hotel_li.querySelector('.hotel_img');
    bigImg.addEventListener('click', () => {
      commonPop.style.display = 'block';
      document.querySelector('body').style.overflow = 'hidden';
      imgList.innerHTML = '';

      for (let key in hotel) {
        if (key.indexOf('subImg') === 0) {
          imgList.innerHTML += `
            <li>
              <button type="button">
                <img src="src/img/sub/hotel/${hotel[key]}.jpg" alt="">
              </button>
            </li>
              `;
        }
      }
      let lis = document.querySelectorAll('.img_list > li');
      let main_img = document.querySelector('.main_img');
      main_img.innerHTML = lis[0].querySelector('button').innerHTML;
      lis.forEach((el) => {
        el.addEventListener('click', (e) => {
          let target = e.target;
          if (!target) {
            target.classList.remove('on');
          }
          e.target.classList.add('on');
          let clickedBtn = el.querySelector('button');
          let clickedImg = clickedBtn.querySelector('img');
          let imgSrc = clickedImg.getAttribute('src');

          main_img.innerHTML = `<img src="${imgSrc}" alt="">`;
        });
      });
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
renderHotel();
