
/********标签外挂的代码块折叠问题 */
/***切换分栏重新判断代码是否需要折叠 */
document.addEventListener('pjax:complete', initTabCodeFold);
document.addEventListener('DOMContentLoaded', initTabCodeFold);
// 监听Pjax完成跳转后重新初始化（关键修复点）
document.addEventListener('pjax:complete', initTabCodeFold);

function initTabCodeFold() {
  // 挂载重建方法
  window.rebuildCodeHighlight = function () {
    if (!window.refreshFn) return;
    // 全局清空旧按钮，防止堆叠边框
    document.querySelectorAll('figure.highlight').forEach(fig => {
      fig.querySelector('.highlight-tools')?.remove()
      fig.querySelector('.code-expand-btn')?.remove()
    })
    window.refreshFn()
  }

  document.querySelectorAll('.tab').forEach(btn => {
    // 先移除旧监听，防止多次绑定堆积
    btn.removeEventListener('click', handleTabClick)
    btn.addEventListener('click', handleTabClick)
  })
}

// 抽离点击处理函数，避免重复绑定
function handleTabClick() {
  setTimeout(window.rebuildCodeHighlight, 220)
}


/***********搜索框的文字修改 */
// 监听DocSearch弹窗渲染完成
function syncDocSearchStrongStyle() {
  const titleDom = document.querySelector('.DocSearch-Title');
  if (!titleDom) return;

  const strongDom = titleDom.querySelector('strong');
  if (!strongDom) return;

  // 抓取strong真实渲染样式
  const strongStyle = getComputedStyle(strongDom);
  const searchText = strongDom.textContent.trim();

  // 需要同步的样式列表（DocSearch关键词常用样式）
  const copyStyleList = [
    'color',
    'fontSize',
    'fontWeight',
    'opacity',
    'letterSpacing'
  ];

  // 拼接css字符串
  let pseudoCss = '';
  copyStyleList.forEach(key => {
    pseudoCss += `${key}: ${strongStyle[key]};`;
  });

  // 组装最终样式：整体居中 + 中文前缀 + 关键词文本
  const styleContent = `
    .DocSearch-Title::before {
      content: "找不到你查询的内容：${searchText}";
      position: absolute;
      left: 50%;
      top: 0;
      transform: translateX(-50%);
      text-indent: 0;
      white-space: nowrap;
      ${pseudoCss}
    }
  `;

  // 注入style标签，避免重复创建
  let customStyle = document.getElementById('docsearch-custom-pseudo');
  if (!customStyle) {
    customStyle = document.createElement('style');
    customStyle.id = 'docsearch-custom-pseudo';
    document.head.appendChild(customStyle);
  }
  customStyle.textContent = styleContent;
}

// 监听弹窗打开（DocSearch点击才会渲染DOM，需要延时/监听）
document.addEventListener('click', (e) => {
  if (e.target.closest('.DocSearch-Button')) {
    setTimeout(syncDocSearchStrongStyle, 150);
  }
});

// 监听弹窗内部DOM变化（切换无结果界面时刷新样式）
const observer = new MutationObserver(() => {
  syncDocSearchStrongStyle();
});
observer.observe(document.body, { childList: true, subtree: true });