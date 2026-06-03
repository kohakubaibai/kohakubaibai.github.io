const machine = document.getElementById("machineWrap");
const knob = document.getElementById("knob");
const input = document.getElementById("codeInput");
const submitBtn = document.getElementById("submitBtn");
const statusBar = document.getElementById("statusBar");

const T_KNOB = 600;
const T_BALLS = 2000;
const T_CAPSULE = 800;

const GCX = 40,
    GCY = 45.84,
    GR = 40,
    BALL_R = 8;
const MAX_FROM_CENTER = GR - BALL_R - 1.5;

const MAX_UP_FROM_ORIGIN = 6;

const BALLS = [
    { id: "ball-1", cx: 18.67, cy: 44.59 },
    { id: "ball-2", cx: 32.35, cy: 67.4 },
    { id: "ball-3", cx: 47.65, cy: 51.39 },
    { id: "ball-4", cx: 18.67, cy: 59.57 },
    { id: "ball-5", cx: 61.33, cy: 44.59 },
    { id: "ball-6", cx: 61.33, cy: 60.07 },
    { id: "ball-7", cx: 47.65, cy: 36.4 },
    { id: "ball-8", cx: 32.35, cy: 52.41 },
    { id: "ball-9", cx: 47.65, cy: 67.4 },
    { id: "ball-10", cx: 32.35, cy: 37.18 },
];

let states = [];
let rafId = null;
let running = false;

function initStates() {
    states = BALLS.map((b) => {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.2 + Math.random() * 0.2;
        return {
            el: document.getElementById(b.id),
            ox: b.cx,
            oy: b.cy,
            px: b.cx,
            py: b.cy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            rot: 0,
            rotSpeed:
                (Math.random() > 0.5 ? 1 : -1) * (1 + Math.random() * 1.5),
        };
    });
}

function tick() {
    if (!running) return;
    states.forEach((s) => {
        s.px += s.vx;
        s.py += s.vy;

        const fx = s.px - GCX,
            fy = s.py - GCY;
        const dist = Math.sqrt(fx * fx + fy * fy);
        if (dist > MAX_FROM_CENTER) {
            const nx = fx / dist,
                ny = fy / dist;
            const dot = s.vx * nx + s.vy * ny;
            s.vx -= 2 * dot * nx;
            s.vy -= 2 * dot * ny;
            s.px = GCX + nx * (MAX_FROM_CENTER - 0.5);
            s.py = GCY + ny * (MAX_FROM_CENTER - 0.5);
        }

        const Y_TOP = 29;
        if (s.py < Y_TOP) {
            s.py = Y_TOP;
            if (s.vy < 0) s.vy *= -1;
        }

        s.rot += s.rotSpeed;

        const dx = s.px - s.ox,
            dy = s.py - s.oy;
        s.el.setAttribute(
            "transform",
            `translate(${dx.toFixed(2)} ${dy.toFixed(2)}) ` +
                `rotate(${s.rot.toFixed(1)} ${s.ox.toFixed(2)} ${s.oy.toFixed(
                    2
                )})`
        );
    });
    rafId = requestAnimationFrame(tick);
}

function runLoop() {
    setTimeout(() => {
        initStates();
        running = true;
        rafId = requestAnimationFrame(tick);
    }, T_KNOB);
}

runLoop();