export async function initSub() {
  const APIKey = "ca4cafaaee024ba60d09e4e6";
  const url = `https://v6.exchangerate-api.com/v6/${APIKey}/latest/KRW`;
  const backUrl = "./src/data/exchange.json";
  const localKey = "exchangeData";
  const localTimeKey = "exchangeDataTime";
  const oneHour = 3600000;

  const storageData = localStorage.getItem(localKey);
  const storageTime = localStorage.getItem(localTimeKey);
  const now = Date.now();
  let data;

  if (storageData && storageTime && now - Number(storageTime) < oneHour) {
    data = JSON.parse(storageData);
  } else {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      data = await res.json();

      if (data.result === "success") {
        localStorage.setItem(localKey, JSON.stringify(data));
        localStorage.setItem(localTimeKey, now.toString());
      } else {
        throw new Error("API 응답 실패");
      }
    } catch (e) {
      console.warn("⚠️ API 호출 실패. 로컬 파일을 사용합니다.");
      try {
        const fallbackRes = await fetch(backUrl);
        data = await fallbackRes.json();
      } catch (err) {
        console.error(err);
        return;
      }
    }
  }

  const koInput = document.getElementById("ko");
  const vnInput = document.getElementById("vnd");

  if (data.result === "success" && koInput && vnInput) {
    const ko = data.conversion_rates.KRW;
    const vn = data.conversion_rates.VND;

    koInput.value = 1000;
    const commaV = koInput.value.replace(/,/g, "");

    vnInput.value = (vn * Number(koInput.value))
      .toFixed(0)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    koInput.addEventListener("input", () => {
      vnInput.value = (vn * Number(koInput.value.replace(/,/g, "")))
        .toFixed(0)
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    });

    koInput.value = commaV.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}
