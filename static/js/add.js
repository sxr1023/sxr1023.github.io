function setTagClass(){
  document.body.classList.remove('is-tags', 'is-categories', 'is-posts', 'is-banner_img')
  let path = location.pathname
  // 匹配 /tags/ 以及分页 /tags/page/1/ 等
  if(path.startsWith('/tags/')){
    document.body.classList.add('is-tags')
    document.body.classList.add('is-banner_img')
  }
  if(path.startsWith('/categories/')){
    document.body.classList.add('is-categories')
    document.body.classList.add('is-banner_img')
  }
  if(path.startsWith('/essay/')){
    document.body.classList.add('is-banner_img')
  }
  if(path.startsWith('/posts/')){
    document.body.classList.add('is-posts')
  }
  if(path.startsWith('/todo/')) {
    document.body.classList.add('is-banner_img')
  }
  if(path.startsWith('/charts/')) {
    document.body.classList.add('is-banner_img')
  }
}

document.addEventListener('DOMContentLoaded',setTagClass)
document.addEventListener('pjax:complete',setTagClass)

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