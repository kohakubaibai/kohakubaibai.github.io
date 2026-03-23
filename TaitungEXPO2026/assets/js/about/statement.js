import { popupData } from './data.js';

class PopupManager {
    constructor() {
        this.data = popupData;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.querySelectorAll('.js-curatingBtn').forEach(el => {
            el.addEventListener('click', () => {
                const sectionKey = el.getAttribute('data-section');
                if (this.data[sectionKey]) {
                    this.renderAndShow(sectionKey);
                }
            });
        });

        const closeBtn = document.querySelector('.btn--closePopup');
        const overlay = document.querySelector('.popup__overlay');

        if (closeBtn) closeBtn.addEventListener('click', () => this.hide());
        if (overlay) overlay.addEventListener('click', () => this.hide());
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.hide(); });
    }

    renderAndShow(key) {
        const item = this.data[key];
        const container = document.getElementById('popupDynamicContent');
        if (!container) return;

        const previewHtml = item.previews.map(text => `<p class="f-h5">${text}</p>`).join('');

        container.innerHTML = `
            <div class="popupBox__content" style="display:block">
                <div class="flexBox">
                    <div class="image"><img src="/assets/images/about/curating/${item.id}.svg"></div>
                    <div class="text">
                        <div class="text__title f-h4">${item.title}</div>
                        <div class="text__desc f-p">${item.desc}</div>
                        <dl class="text__tags">
                            <dt class="f-h5">策展議題</dt>
                            <dd class="f-h5">${item.tags}</dd>
                        </dl>
                        <div class="text__preview">
                            <div class="previewTitle f-h5">亮點預告</div>
                            <div class="previewContent">${previewHtml}</div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.getElementById('popup').classList.add('active');
        document.body.classList.add('openPopup');
    }

    hide() {
        document.getElementById('popup').classList.remove('active');
        document.body.classList.remove('openPopup');
    }
}

new PopupManager();