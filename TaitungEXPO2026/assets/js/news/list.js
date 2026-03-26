class NewsFilter {
  constructor() {
    this.currentFilter = 'all';
    this.currentPage = 1;
    this.cardsPerPage = 9;
    this.cards = document.querySelectorAll('.cardItem--news');
    this.init();
  }

  init() {
    this.bindEvents();
    this.render();
  }

  bindEvents() {
    const filterOptions = document.querySelectorAll('.js-filterOption-item');
    filterOptions.forEach(option => {
      option.addEventListener('click', (e) => {
        filterOptions.forEach(opt => opt.classList.remove('is-active'));
        e.currentTarget.classList.add('is-active');
        this.currentFilter = e.currentTarget.dataset.filterId;
        this.currentPage = 1;
        this.render();
      });
    });
  }

  getFilteredCards() {
    return Array.from(this.cards).filter(card => {
      if (this.currentFilter === 'all') return true;
      return card.dataset.filterTarget === this.currentFilter;
    });
  }

  render() {
    this.renderCards();
    this.renderPagination();
  }

  renderCards() {
    const filtered = this.getFilteredCards();
    const start = (this.currentPage - 1) * this.cardsPerPage;
    const pageCards = filtered.slice(start, start + this.cardsPerPage);

    this.cards.forEach(card => card.style.display = 'none');
    pageCards.forEach(card => card.style.display = '');
  }

  renderPagination() {
    const totalPages = Math.ceil(this.getFilteredCards().length / this.cardsPerPage);
    const pagination = document.querySelector('.pagination');
    if (!pagination) return;

    pagination.querySelectorAll('.pagination__item--num, .pagination__item--ellipsis').forEach(el => el.remove());

    const prevItem = pagination.querySelector('.pagination__item--prev');
    const nextItem = pagination.querySelector('.pagination__item--next');

    this.buildPageItems(totalPages).forEach(item => {
      nextItem.insertAdjacentElement('beforebegin', item);
    });

    this.updatePrevNext(prevItem, nextItem, totalPages);
  }

  buildPageItems(totalPages) {
    return this.calcPageRange(totalPages).map(p =>
      p === '...' ? this.createEllipsis() : this.createPageItem(p, p === this.currentPage)
    );
  }

  calcPageRange(totalPages) {
    if (totalPages <= 4) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [1];
    let start = Math.max(2, this.currentPage - 1);
    let end = Math.min(totalPages - 1, this.currentPage + 1);

    if (this.currentPage <= 3) { start = 2; end = Math.min(4, totalPages - 1); }
    if (this.currentPage >= totalPages - 2) { start = Math.max(2, totalPages - 3); end = totalPages - 1; }

    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);

    return pages;
  }

  createPageItem(num, isActive) {
    const li = document.createElement('li');
    li.className = 'pagination__item pagination__item--num' + (isActive ? ' is-current' : '');
    if (isActive) {
      li.innerHTML = `<span class="text">${num}</span>`;
    } else {
      li.innerHTML = `<a href="#" class="text">${num}</a>`;
      li.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        this.goToPage(num);
      });
    }
    return li;
  }

  createEllipsis() {
    const li = document.createElement('li');
    li.className = 'pagination__item pagination__item--ellipsis';
    li.innerHTML = '<span class="text"></span>';
    return li;
  }

  updatePrevNext(prevItem, nextItem, totalPages) {
    if (this.currentPage <= 1) {
      prevItem.classList.add('is-disabled');
      prevItem.innerHTML = '<span class="text">PREV</span>';
    } else {
      prevItem.classList.remove('is-disabled');
      prevItem.innerHTML = '<a href="#" class="text">PREV</a>';
      prevItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        this.goToPage(this.currentPage - 1);
      });
    }

    if (this.currentPage >= totalPages) {
      nextItem.classList.add('is-disabled');
      nextItem.innerHTML = '<span class="text">NEXT</span>';
    } else {
      nextItem.classList.remove('is-disabled');
      nextItem.innerHTML = '<a href="#" class="text">NEXT</a>';
      nextItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        this.goToPage(this.currentPage + 1);
      });
    }
  }

  goToPage(page) {
    this.currentPage = page;
    this.render();
    this.scrollToList();
  }

  scrollToList() {
    const headerHeight = window.innerWidth >= 1280 ? 88 : 70;
    const listTop = document.querySelector('.js-filterGroup-content').getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: listTop - headerHeight, behavior: 'smooth' });
    }
}

new NewsFilter();