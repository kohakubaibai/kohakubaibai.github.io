//企業最愛TOP30
const schoolTop30 = [
  {
    title: "成功大學",
  },
  {
    title: "臺灣大學",
  },
  {
    title: "清華大學",
  },
  {
    title: "陽明交通大學",
  },
  {
    title: "政治大學",
  },
  {
    title: "臺北科技大學",
  },
  {
    title: "臺灣科技大學",
  },
  {
    title: "中山大學",
  },
  {
    title: "中央大學",
  },
  {
    title: "淡江大學",
  },
  {
    title: "輔仁大學",
  },
  {
    title: "逢甲大學",
  },
  {
    title: "中正大學",
  },
  {
    title: "中興大學",
  },
  {
    title: "高雄科技大學",
  },
  {
    title: "中原大學",
  },
  {
    title: "臺北大學",
  },
  {
    title: "雲林科技大學",
  },
  {
    title: "虎尾科技大學",
  },
  {
    title: "東吳大學",
  },
  {
    title: "東海大學",
  },
  {
    title: "元智大學",
  },
  {
    title: "中國文化大學",
  },
  {
    title: "臺灣師範大學",
  },
  {
    title: "龍華科技大學",
  },
  {
    title: "南臺科技大學",
  },
  {
    title: "臺灣海洋大學",
  },
  {
    title: "銘傳大學",
  },
  {
    title: "高雄大學",
  },
  {
    title: "屏東科技大學",
  },
];

// top30表格
const tbody = document.querySelector(".rg-table tbody");
let rank = 1; //定義排名用

schoolTop30.forEach((data) => {
  const row = document.createElement("tr");

  // 對應的表格cell
  const rankCell = document.createElement("td");
  rankCell.textContent = rank++;
  rankCell.classList.add("t-number");
  row.appendChild(rankCell);

  const universityCell = document.createElement("td");
  universityCell.textContent = data.title;
  universityCell.classList.add("text");
  row.appendChild(universityCell);

  // 將row加到tbody內
  tbody.appendChild(row);
});

//特色大學
const contentData = {
  // 產學新典範
  cate1: [
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102774",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-659f4bd027166.jpg",
      label: "航空",
      title: "國立臺北科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102876",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202402/article-65c1d2af5065a.jpg",
      label: "航空",
      title: "致理科技大學",
    },

    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102865",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b2115982416.jpg",
      label: "航空",
      title: "景文科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102867",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b229fa93876.jpg",
      label: "航空",
      title: "元智大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102828",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65af2c9cc735e.jpg",
      label: "航空",
      title: "國立聯合大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102822",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65af3ae22720e.jpg",
      label: "航空",
      title: "國立勤益科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102912",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202402/article-65d5871eef0e2.jpg",
      label: "航空",
      title: "大葉大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102858",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b718715faad.jpg",
      label: "航空",
      title: "崑山科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102857",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65ba244d90440.jpg",
      label: "航空",
      title: "遠東科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102863",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b8e0c37db46.jpg",
      label: "航空",
      title: "中信金融管理學院",
    },
  ],
  //   AI新思維
  cate2: [
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102819",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65afb1e19e11f.jpg",
      label: "航空",
      title: "世新大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102829",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b72b77277ee.jpg",
      label: "航空",
      title: "淡江大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102862",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b381a247fa9.jpg",
      label: "航空",
      title: "華梵大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102798",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65aa3a62116f5.jpg",
      label: "航空",
      title: "明新科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102866",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65af88ea64d60.jpg",
      label: "航空",
      title: "慈濟大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102847",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202402/article-65d07c0adfe09.jpg",
      label: "航空",
      title: "朝陽科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102827",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65afb1ba567c0.jpg",
      label: "航空",
      title: "東海大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102830",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b7149d9911d.jpg",
      label: "航空",
      title: "國立雲林科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102860",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b77a00bfcf8.jpg",
      label: "航空",
      title: "正修科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102890",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202402/article-65c1d67fb38a4.jpg",
      label: "航空",
      title: "義守大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102919",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202402/article-65d5870d69ba7.jpg",
      label: "航空",
      title: "亞洲大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102930",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202402/article-65dfd9fa33582.jpg",
      label: "航空",
      title: "南臺科技大學",
    },
  ],
  //   推薦新亮點
  cate3: [
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102824",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65afb1cd666d7.jpg",
      label: "航空",
      title: "銘傳大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102805",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65ae14af1f710.jpg",
      label: "航空",
      title: "長庚大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102868",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b12a134f3a4.jpg",
      label: "航空",
      title: "玄奘大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102895",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202402/article-65d016ed197a6.jpg",
      label: "航空",
      title: "靜宜大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102856",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65afb1f377ae4.jpg",
      label: "航空",
      title: "南華大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102861",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b12a2c9ea5a.jpg",
      label: "航空",
      title: "國立嘉義大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102823",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b21d5c79236.jpg",
      label: "航空",
      title: "長榮大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102859",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65b74597e42bf.jpg",
      label: "航空",
      title: "國立成功大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5102864",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202401/article-65ba1a3e08f36.jpg",
      label: "航空",
      title: "台南應用科技大學",
    },
  ],
};

// 廣編學校_定義生成內容的code
function generateContentItems(category) {
  const container = document.querySelector(`#${category}-pane .row`);
  contentData[category].forEach((item) => {
    const newItem = document.createElement("div");
    newItem.classList.add("p-adlist__item", "col-md-3", "col-11");
    newItem.innerHTML = `
      <a href="${item.href}" target="_blank" rel="noreferrer noopener">
          <div class="imgWrap">
              <img src="${item.imgSrc}" alt="${item.title}">
          </div>
          <div class="txtWrap">
            <h4 class="p-adlist__label">${item.label}</h4>
            <h3 class="p-adlist__title">${item.title}</h3>
          </div>
      </a>
    `;
    container.appendChild(newItem);
  });
}

// 廣編學校_調用函數生成對應內容
// generateContentItems("cate1");
// generateContentItems("cate2");
// generateContentItems("cate3");