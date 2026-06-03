document.body.classList.add('is-lock');
const alert = document.querySelector('.js-alert');

setTimeout(() => {
    document.body.classList.remove('is-lock');
    alert.classList.add('is-hide');
    alert.addEventListener('transitionend', () => {
        alert.style.display = 'none';
        alert.classList.remove('is-hide');
    }, { once: true });
}, 2000);