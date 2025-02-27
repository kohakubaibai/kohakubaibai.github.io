//MBTI
const mbtiData = {
  mbti: [
    {
      class: "mbti1",
      imgSrc: "assets/images/mbti-ENTJ.jpg",
      chinese: "指揮官",
      en: "ENTJ",
      point1: "老師是否具備產業經驗，能夠傳授實用的知識和技能，特別是與決策、領導和執行相關的經驗？",
      point2: "學校是否有強大校友網絡提供實習機會，讓我能鍛鍊領導技能？",
      point3: "課程是否有針對情緒管理與溝通的訓練，幫助我練習表達自己的感受且有效與人溝通？"
    },
    {
      class: "mbti2",
      imgSrc: "assets/images/mbti-ENFJ.jpg",
      chinese: "主人公",
      en: "ENFJ",
      point1: "學校是否提供心理健康資源，幫助我理解自己的情緒？",
      point2: "學校是否提供國際化的學習環境，讓我能夠拓展視野並提升跨文化領導能力？",
      point3: "學校是否連結創業家資源，讓我能向最優秀的領導人才學習？"
    },
    {
      class: "mbti3",
      imgSrc: "assets/images/mbti-ESFJ.jpg",
      chinese: "執政官",
      en: "ESFJ",
      point1: "學校是否提供反饋機制或輔導資源，讓我學會處理衝突而非迴避？",
      point2: "是否有機會參與領導角色，鍛煉我的組織與協調能力？",
      point3: "學校是否有多樣的公益性質活動，讓我發揮助人的特質？"
    },
    {
      class: "mbti3",
      imgSrc: "assets/images/mbti-ESTJ.jpg",
      chinese: "總經理",
      en: "ESTJ",
      point1: "課程是否包含專案管理、資源分配或目標設計的實際操作訓練？",
      point2: "學校的管理是否規範良好且制度化？",
      point3: "是否有課程挑戰我的既有觀念，幫助我學習不同的做事方式和文化？"
    },
    {
      class: "mbti1",
      imgSrc: "assets/images/mbti-ENTP.jpg",
      chinese: "辯論家",
      en: "ENTP",
      point1: "學校是否提供解決真實世界難題的機會（例如ESG專案）？",
      point2: "該學科的是否鼓勵我挑戰傳統思維，或接納不同觀點的可能性？",
      point3: "學校是否注重軟實力訓練，例如溝通技巧？"
    },
    {
      class: "mbti2",
      imgSrc: "assets/images/mbti-ENFP.jpg",
      chinese: "競選者",
      en: "ENFP",
      point1: "課程設計是否包含領導團隊或主導專案的機會？",
      point2: "是否有專注於溝通、談判或情商等軟實力的課程或工作坊？",
      point3: "學校是否有導師機制可以諮詢並給予反饋，幫助聚焦我的探索？"
    },
    {
      class: "mbti4",
      imgSrc: "assets/images/mbti-ESFP.jpg",
      chinese: "表演者",
      en: "ESFP",
      point1: "老師是否採取翻轉式教學，讓我在學習過程中充滿樂趣？",
      point2: "校是否提供讓我發揮才華的舞台，例如表演、競賽或社團？",
      point3: "學分採計是否有彈性制度，讓我能兼顧課外實習與成績？"
    },
    {
      class: "mbti4",
      imgSrc: "assets/images/mbti-ESTP.jpg",
      chinese: "企業家",
      en: "ESTP",
      point1: "學校是否位於充滿活力與流行事物的都市？",
      point2: "在該科系是否有機會直接參與解決現實世界的問題，例如創業、行銷活動或產品開發？",
      point3: "課程是否有高度的互動性，如團隊專案、角色扮演或模擬經營活動？"
    },
    {
      class: "mbti1",
      imgSrc: "assets/images/mbti-INTP.jpg",
      chinese: "邏輯學家",
      en: "INTP",
      point1: "學校是否有充足的研究資源（如圖書館、研究室或資料庫）滿足我對於知識的追求？",
      point2: "是否有開放的研究環境，有機會與教授討論研究方向？",
      point3: "學校是否有小型且專注於特定領域的社團讓我參與？"
    },
    {
      class: "mbti2",
      imgSrc: "assets/images/mbti-INFP.jpg",
      chinese: "調停者",
      en: "INFP",
      point1: "老師的教學方式是否讓我感受到我的專業對社會有正面的影響？",
      point2: "這個學科是否能讓我充滿熱情，並不斷追求新的可能性？",
      point3: "我是否有機會參與跨學科的專案或研究，提出創新的想法？"
    },
    {
      class: "mbti4",
      imgSrc: "assets/images/mbti-ISFP.jpg",
      chinese: "探險家",
      en: "ISFP",
      point1: "這個學科是否鼓勵我從美學或情感的角度，發掘世界中的美麗？",
      point2: "學校的環境是否美觀、生機蓬勃，能激發我的靈感？",
      point3: "是否有指導或反饋機制，能幫助我保持自信、免於懷疑自己？"
    },
    {
      class: "mbti4",
      imgSrc: "assets/images/mbti-ISTP.jpg",
      chinese: "冒險家",
      en: "ISTP",
      point1: "學校是否有跨領域措施，例如先探索不同領域、再決定主修方向？",
      point2: "是否有讓我鍛煉批判性思考和問題解決力的課程或專案？",
      point3: "課程設計是否有足夠的彈性，讓我以自己的步調學習？"
    },
    {
      class: "mbti1",
      imgSrc: "assets/images/mbti-INTJ.jpg",
      chinese: "建築師",
      en: "INTJ",
      point1: "學校的學術聲譽如何？是否能提供高水準的資源？",
      point2: "在此科系是否能學習如何規劃大型專案、讓我有機會領導跨領域團隊？",
      point3: "是否有需要協作的課程，讓我學習如何與不同的人溝通，有效達成目標？"
    },
    {
      class: "mbti3",
      imgSrc: "assets/images/mbti-ISTJ.jpg",
      chinese: "物流師",
      en: "ISTJ",
      point1: "這個科系是否有清楚的課程地圖，讓我能依此制定選課計畫？",
      point2: "科系是否有課程著重於分析數據、解決複雜問題？",
      point3: "學習過程中是否有實習或專案，能讓我負責並展現執行力？"
    },
    {
      class: "mbti3",
      imgSrc: "assets/images/mbti-ISFJ.jpg",
      chinese: "守衛者",
      en: "ISFJ",
      point1: "這個領域的研究是否需要很多創新？我是否能接受可能與我所熟悉的或習慣的價值觀有衝突？",
      point2: "學校是否提供我有興趣的志願服務或人文關懷活動？",
      point3: "我能否在學科中感受到對他人或社會有正面影響？"
    },
    {
      class: "mbti2",
      imgSrc: "assets/images/mbti-INFJ.jpg",
      chinese: "提倡者",
      en: "INFJ",
      point1: "這個科系是否能讓我引導或啟發他人？例如研究人類行為或心理。",
      point2: "這個學科是否有需要溝通或公開表達的課程或活動？",
      point3: "我能否在此學習到更多關於人際互動或文化的知識？"
    },
  ]
};

function generateContentItems(mbti) {
  const container = document.querySelector(`.mbtiSwiper .swiper-wrapper`);
  mbtiData[mbti].forEach((item) => {
    const newItem = document.createElement("div");
    newItem.classList.add("swiper-slide");
    newItem.innerHTML = `
      <div class="mbtiCard">
        <div class="mbtiCard__image">
          <div class="imgWrap">
            <div class="imgWrapper">
              <img src="${item.imgSrc}" alt="${item.en}">
            </div>
          </div>
          <div class="mbtiName ${item.class}">
              <div class="chinese">${item.chinese}</div>
              <div class="en">${item.en}</div>
          </div>
        </div>
        <div class="mbtiCard__point">
          <div class="title">選志願時，你可以思考：</div>
          <ul class="list">
            <li>${item.point1}</li>
            <li>${item.point2}</li>
            <li>${item.point3}</li>
          </ul>
        </div>
      </div>
    `;
    container.appendChild(newItem);
  });
}

// 廣編學校_調用函數生成對應內容
generateContentItems("mbti");