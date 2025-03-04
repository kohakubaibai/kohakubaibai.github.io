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
      href: "https://www.cheers.com.tw/article/article.action?id=5104119",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a5bcf85ef8b.jpg",
      title: "徐有庠基金會",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104113",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a45756b265a.jpg",
      title: "元智大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104183",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67bbf0e3af77a.jpg",
      title: "國立宜蘭大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104081",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202501/article-6790b3041ded6.jpg",
      title: "亞東科技大學",
    }
  ],
  // AI新思維
  cate2: [
    {
      href: "https://www.cheers.com.tw/talent/article.action?id=5104135",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67ab0c377d882.jpg",
      title: "長榮大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104114",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a4595b24ae6.jpg",
      title: "國立臺灣海洋大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104115",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a467fdaf86c.jpg",
      title: "國立臺北大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104134",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67ab06c6e6dba.jpg",
      title: "輔仁大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104124",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a6d12ebb7bc.jpg",
      title: "長庚科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104149",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67aea529c3ece.jpg",
      title: "東海大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104142",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67ad5b4b6b2ea.jpg",
      title: "國立雲林科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104116",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a4852ff251a.jpg",
      title: "國立臺南大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104060",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202501/article-678e108043e1d.jpg",
      title: "明新科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104184",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67bc1b076d06c.jpg",
      title: "亞洲大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104042",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202501/article-67870c1d2fd09.jpg",
      title: "正修科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104159",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67b45520cb8d3.jpg",
      title: "東吳大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104160",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67b444f0c6299.jpg",
      title: "淡江大學",
    }
  ],
  // 亮點新趨勢
  cate3: [
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104123",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a6c1cfb29e1.jpg",
      title: "朝陽科技大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104047",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202501/article-6788854b0ef21.jpg",
      title: "玄奘大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104186",
      imgSrc:
        "https://storage.googleapis.com/dev-www-cheers-com-tw/article/202502/article-67aaee8b85304.jpg",
      title: "致理大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104164",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67b56d59b9700.jpg",
      title: "高雄醫學大學口腔系",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104158",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67b408bb3b82f.jpg",
      title: "高雄醫學大學運動醫學系",
    }
  ],
  // 培育新視角
  cate4: [
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104128",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a99ef455a0d.jpg",
      title: "南華大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104131",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67aaa82b023db.jpg",
      title: "明志大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104122",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67a6b6fd4b31d.jpg",
      title: "長庚大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104053",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202501/article-678a110b53a0e.jpg",
      title: "臺北醫學大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104052",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202501/article-67909d1ee055f.jpg",
      title: "銘傳大學",
    },
    {
      href: "https://www.cheers.com.tw/article/article.action?id=5104161",
      imgSrc:
        "https://storage.googleapis.com/www-cheers-com-tw/article/202502/article-67b45491bc72f.jpg",
      title: "慈濟大學",
    }
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
            <h3 class="p-adlist__title">${item.title}</h3>
          </div>
      </a>
    `;
    container.appendChild(newItem);
  });
}

// 廣編學校_調用函數生成對應內容
generateContentItems("cate1");
generateContentItems("cate2");
generateContentItems("cate3");
generateContentItems("cate4");