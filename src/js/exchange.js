export async function initSub() {
  const APIKYE = 'ca4cafaaee024ba60d09e4e6';
  // 429에러 – 너무많은요청
  // const url = `https://v6.exchangerate-api.com/v6/${APIKYE}/latest/KRW`;

  // 테스트용
  const url = './src/data/exchange.json';
  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    let koInput = document.getElementById('ko');
    let vnInput = document.getElementById('vnd');
    if (data.result === 'success') {
      let ko = data.conversion_rates.KRW;
      let vn = data.conversion_rates.VND;

      if (koInput && vnInput) {
        // 초기값
        koInput.value = 1000;
        let commaV = koInput.value.replace(/,/g, '');

        vnInput.value = (vn * Number(koInput.value))
          .toFixed(0)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        koInput.addEventListener('input', () => {
          vnInput.value = (vn * Number(koInput.value))
            .toFixed(0)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        });
        koInput.value = commaV.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      }
    }
  } catch (e) {
    console.error(e);
  }
}
