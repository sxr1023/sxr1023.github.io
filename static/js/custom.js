window.rmf = {
  searchinThisPage: function () {
    console.log("[rmf-search] 开始执行DocSearch搜索函数");
    const rightMenu = document.getElementById('rightMenu');
    if (rightMenu) rightMenu.style.display = 'none';

    const keyword = window.getSelection().toString().trim();
    console.log("[rmf-search] 选中关键词：", keyword);

    if (typeof btf?.openSearch !== "function") {
      console.error("[rmf-search] btf.openSearch 无效");
      return;
    }
    btf.openSearch();

    let times = 0;
    const timer = setInterval(() => {
      const inputDom = document.querySelector('.DocSearch-Input');
      times++;
      if (inputDom) {
        clearInterval(timer);
        inputDom.value = keyword;
        inputDom.dispatchEvent(new Event('input', { bubbles: true }));
        inputDom.focus();
        console.log("[rmf-search] 成功填入搜索词并触发检索");
      }
      // 最长等待2秒终止轮询
      if (times > 20) clearInterval(timer);
    }, 100);
  }
};
console.log("rmf 脚本加载完毕", window.rmf);