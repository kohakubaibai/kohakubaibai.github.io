const svgShapes = [
    { d: "M306.635 9.54012L312.672 15.5767L322.214 6.03456L316.177 -0.00199448Z", color: "#83B7DD" },
    { d: "M320.458 50.1928L314.422 56.2294L323.964 65.7715L330.001 59.7349Z",      color: "#F39800" },
    { d: "M19.3774 22.3909L13.3408 28.4275L22.8829 37.9696L28.9195 31.933Z",       color: "#FC5057" },
    { d: "M6.03755 304.58L0.000976562 310.616L9.54309 320.159L15.5797 314.122Z",   color: "#8FC31F" },
    { d: "M320.458 299.953L314.422 305.989L323.964 315.531L330.001 309.495Z",      color: "#83B7DD" },
    { d: "M298.847 188.714L304.884 194.75L314.426 185.208L308.389 179.172Z",       color: "#8FC31F" },
    { d: "M15.5757 193.145L21.6123 199.182L31.1544 189.639L25.1179 183.603Z",      color: "#FC5057" },
    { d: "M15.5748 256.278L21.6113 262.315L31.1534 252.773L25.1169 246.736Z",      color: "#83B7DD" },
    { d: "M312.495 230.993L318.531 237.029L328.073 227.487L322.037 221.45Z",       color: "#FC5057" },
    { d: "M274.364 58.1887L268.327 64.2253L273.775 69.6731L279.812 63.6365Z",      color: "#8FC31F" },
    { d: "M43.7231 81.7194L37.6865 87.756L43.1343 93.2038L49.1709 87.1672Z",       color: "#8FC31F" },
    { d: "M8.08247 117.361L2.0459 123.397L7.4937 128.845L13.5303 122.809Z",        color: "#F39800" },
    { d: "M314.716 121.41L308.68 127.447L314.127 132.895L320.164 126.858Z",        color: "#83B7DD" },
    { d: "M287.635 275.301L281.599 281.338L287.046 286.786L293.083 280.749Z",      color: "#F39800" },
    { d: "M59.7758 275.344L53.7393 281.381L59.1871 286.829L65.2236 280.792Z",      color: "#F39800" },
];

function parsePath(d) {
    const nums = [...d.matchAll(/-?\d+\.?\d*/g)].map(m => parseFloat(m[0]));
    const pts = [];
    for (let i = 0; i < nums.length; i += 2) {
    pts.push([nums[i], nums[i + 1]]);
    }
    const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
    const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
    const local = pts.map(p => [p[0] - cx, p[1] - cy]);
    return { cx, cy, local };
}

const FADE_START = 0.50;
const W = 330;
const H = 321;

const particles = svgShapes.map((s, i) => {
    const { cx, local } = parsePath(s.d);
    const duration = (1.8 + (i % 7) * 0.3) * 1000; // 每顆速度略不同
    const startOffset = (i * 0.41 * 1000) % duration; // 錯開起始
    return { cx, local, color: s.color, duration, t: startOffset };
});

const cv = document.getElementById('cv');
const ctx = cv.getContext('2d');
let last = null;

function draw(ts) {
    if (!last) last = ts;
    const dt = ts - last;
    last = ts;

    ctx.clearRect(0, 0, W, H);

    for (const p of particles) {
    p.t = (p.t + dt) % p.duration;
    const progress = p.t / p.duration;

    const y = -20 + (H + 40) * progress;

    const angle = progress * (420 * Math.PI / 180);

    const opacity = progress >= FADE_START
        ? 1 - (progress - FADE_START) / (1 - FADE_START)
        : 1;

    ctx.save();
    ctx.globalAlpha = opacity;
    ctx.translate(p.cx, y);
    ctx.rotate(angle);
    ctx.fillStyle = p.color;

    ctx.beginPath();
    p.local.forEach(([lx, ly], idx) => {
        idx === 0 ? ctx.moveTo(lx, ly) : ctx.lineTo(lx, ly);
    });
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    }

    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

function showSuccessPopup() {
    document.body.classList.add('is-lock');

    const popup = document.querySelector('.js-popup-success');
    if (!popup) return;

    popup.style.display = 'block';
    popup.classList.remove('is-hide');
}

showSuccessPopup();

function closeSuccessPopup() {

    document.querySelectorAll('.js-closePopup').forEach(el => {
        el.addEventListener('click', () => {
            document.body.classList.remove('is-lock');

            document.querySelectorAll('.js-popup-success').forEach(popup => {
                popup.classList.add('is-hide');
                popup.addEventListener('transitionend', () => {
                    popup.style.display = 'none';
                    popup.classList.remove('is-hide');
                }, { once: true });
            });
        });
    });
}
closeSuccessPopup();

new WOW().init();