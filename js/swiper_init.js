(() => {
    let swiperInstance = null;

    const initSwiper = () => {
        const container = document.querySelector('.blog-slider');
        if (!container) return;

        // 确保轮播容器排在 #recent-posts 最前面（magnet 插件会 afterbegin 注入分类卡片）
        const wrapper = container.closest('.recent-post-item');
        const parent = wrapper && wrapper.parentElement;
        if (wrapper && parent && parent.firstElementChild !== wrapper) {
            parent.insertBefore(wrapper, parent.firstElementChild);
        }

        // PJAX 回来时先销毁旧实例，避免重复初始化导致箭头异常
        if (swiperInstance && typeof swiperInstance.destroy === 'function') {
            swiperInstance.destroy(true, true);
            swiperInstance = null;
        }

        swiperInstance = new Swiper('.blog-slider', {
            passiveListeners: true,
            spaceBetween: 30,
            effect: 'fade',
            loop: true,
            autoplay: {
                disableOnInteraction: false,
                delay: 3000
            },
            mousewheel: true,
            pagination: {
                el: '.blog-slider__pagination',
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });

        if (swiperInstance.autoplay) {
            container.onmouseenter = () => swiperInstance.autoplay.stop();
            container.onmouseleave = () => swiperInstance.autoplay.start();
        }

        // 阻止导航箭头和分页圆点的点击冒泡到 slide（避免触发跳转）
        container.querySelectorAll('.swiper-button-prev, .swiper-button-next, .blog-slider__pagination').forEach(el => {
            el.addEventListener('click', e => e.stopPropagation());
        });
    };

    document.addEventListener('DOMContentLoaded', initSwiper);
    document.addEventListener('pjax:complete', initSwiper);
})();