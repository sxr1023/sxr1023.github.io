function setTagClass(){
  document.body.classList.remove('is-tags', 'is-categories', 'is-posts')
  let path = location.pathname
  // 匹配 /tags/ 以及分页 /tags/page/1/ 等
  if(path.startsWith('/tags/')){
    document.body.classList.add('is-tags')
  }
  if(path.startsWith('/categories/')){
    document.body.classList.add('is-categories')
  }
  if(path.startsWith('/posts/')){
    document.body.classList.add('is-posts')
  }
}
document.addEventListener('DOMContentLoaded',setTagClass)
document.addEventListener('pjax:complete',setTagClass)
