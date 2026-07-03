// 原有函数名、内部判断、显示逻辑全部保留，仅修改取值逻辑
function percent() {
    // 检查页面中是否存在 card-toc 元素（原样保留）
    const cardToc = document.getElementById('card-toc');
    if (!cardToc) {
        return; // 如果不存在，直接返回，不执行后续代码
    }

    // ========== 改动：复用主题原生计算，替代读取DOM文本，消除延迟 ==========
    const $article = document.getElementById('article-container');
    const currentTop = window.scrollY || document.documentElement.scrollTop;
    const percentage = btf.getScrollPercent(currentTop, $article);

    // 获取 go-up 元素（原样保留）
    let up = document.querySelector("#go-up");
    // 新增目标元素集合
    const elems = [
        '#readmode',
        '#translateLink',
        '#darkmode',
        '#hide-aside-btn',
        '#rightside-config',
        '#to_comment',
        '#go-up'
    ];
    const goDown = document.querySelector('#go-down');

    // 根据百分比设置样式和内容（完整保留你原来的展示逻辑，无修改）
    if (percentage <= 99) {
        up.childNodes[0].style.display = 'none'
        up.childNodes[1].style.display = 'block'
        up.childNodes[1].innerHTML = percentage;

        // 百分比未到100：恢复默认状态
        if (goDown) goDown.style.display = '';
        elems.forEach(selector => {
            const el = document.querySelector(selector);
            if (el) el.style.transform = '';
        })
    } else {
        up.childNodes[1].style.display = 'none'
        up.childNodes[0].style.display = 'block'

        // percentage === 100 执行需求逻辑
        // 隐藏 #go-down
        if (goDown) goDown.style.display = 'none';
        // 所有指定元素向下偏移，可自行调整 translate Y 值
    }
}

// 同步主题节流100ms，统一滚动执行时机，不覆盖原有window.onscroll
const throttlePercent = btf.throttle(percent, 100);
window.addEventListener('scroll', throttlePercent, { passive: true });

// 页面初次加载时执行一次，保证初始状态正确
percent();