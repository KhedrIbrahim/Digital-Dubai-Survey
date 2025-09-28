var swiper = new Swiper('.swiper-container', {
    direction: 'vertical',
    navigation: {
      nextEl: '.swip-nxt',
      prevEl: '.swip-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: false,
    },
    spaceBetween: 24,
    slidesPerView: 1,
    allowTouchMove: false,
});