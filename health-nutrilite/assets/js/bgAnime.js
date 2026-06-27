const stage = document.getElementById("blueStage");

// 圓圈設定
const ORB_SIZE = 620; // px，對應 CSS .orb 的寬高
const ORB_COUNT = 3; // 初始顆數
const BASE_SPEED = 0.6; // 基礎速度（px/frame）

let orbs = [];

function createOrb() {
  const el = document.createElement("div");
  el.className = "orb";

  const img = document.createElement("img");
  img.src = "../assets/images/dot-blue.svg"; // ← 替換成你的實際路徑
  img.alt = "";
  el.appendChild(img);
  stage.insertBefore(el, stage.querySelector(".wrapper"));

  const sw = stage.clientWidth;
  const sh = stage.clientHeight;
  const angle = Math.random() * Math.PI * 2;
  const speed = BASE_SPEED + Math.random() * 0.4;

  // 嘗試找不與現有圓圈重疊的初始位置
  let x,
    y,
    attempts = 0;
  do {
    x = Math.random() * (sw - ORB_SIZE);
    y = Math.random() * (sh - ORB_SIZE);
    const overlapping = orbs.some((o) => {
      const dx = o.x + ORB_SIZE / 2 - (x + ORB_SIZE / 2);
      const dy = o.y + ORB_SIZE / 2 - (y + ORB_SIZE / 2);
      return Math.sqrt(dx * dx + dy * dy) < ORB_SIZE;
    });
    if (!overlapping) break;
  } while (++attempts < 50);

  orbs.push({
    el,
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    rot: Math.random() * 360,
    rotSpeed: (Math.random() - 0.5) * 0.2,
  });
}

function tick() {
  const sw = stage.clientWidth;
  const sh = stage.clientHeight;
  const R = ORB_SIZE / 2; // 圓的半徑（以圓心計算碰撞）
  const COLLISION_D = ORB_SIZE; // 兩圓心距離 < 直徑即視為碰撞

  // 移動
  for (const o of orbs) {
    o.x += o.vx;
    o.y += o.vy;
    o.rot += o.rotSpeed;

    // 邊界反彈
    if (o.x <= 0) {
      o.x = 0;
      o.vx = Math.abs(o.vx);
    }
    if (o.x + ORB_SIZE >= sw) {
      o.x = sw - ORB_SIZE;
      o.vx = -Math.abs(o.vx);
    }
    if (o.y <= 0) {
      o.y = 0;
      o.vy = Math.abs(o.vy);
    }
    if (o.y + ORB_SIZE >= sh) {
      o.y = sh - ORB_SIZE;
      o.vy = -Math.abs(o.vy);
    }
  }

  // 圓圈互相碰撞偵測
  for (let i = 0; i < orbs.length; i++) {
    for (let j = i + 1; j < orbs.length; j++) {
      const a = orbs[i],
        b = orbs[j];
      const ax = a.x + R,
        ay = a.y + R; // 圓心
      const bx = b.x + R,
        by = b.y + R;
      const dx = bx - ax,
        dy = by - ay;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < COLLISION_D && dist > 0) {
        // 沿碰撞法向量交換速度分量
        const nx = dx / dist,
          ny = dy / dist;
        const dvx = a.vx - b.vx,
          dvy = a.vy - b.vy;
        const dot = dvx * nx + dvy * ny;

        // 只在兩球靠近時才處理（避免黏在一起）
        if (dot > 0) {
          a.vx -= dot * nx;
          a.vy -= dot * ny;
          b.vx += dot * nx;
          b.vy += dot * ny;
        }

        // 把重疊的部分推開
        const overlap = COLLISION_D - dist;
        a.x -= (nx * overlap) / 2;
        a.y -= (ny * overlap) / 2;
        b.x += (nx * overlap) / 2;
        b.y += (ny * overlap) / 2;
      }
    }
  }

  // 套用位置
  for (const o of orbs) {
    o.el.style.transform = `translate(${o.x}px, ${o.y}px) rotate(${o.rot}deg)`;
  }

  requestAnimationFrame(tick);
}

// 初始化
for (let i = 0; i < ORB_COUNT; i++) createOrb();
tick();
