document.addEventListener('DOMContentLoaded', function() {
  // 检查屏幕宽度是否大于某个值（例如768px，通常认为是平板/手机与桌面设备的分界点）
  if (window.matchMedia("(min-width: 768px)").matches) {
    var searchButton = document.getElementById('search-button');
    var menusItems = document.querySelectorAll('.menus_items');

    if (searchButton && menusItems.length > 0) {
      // 获取 menusItems 的克隆节点
      var menusItemsClone = menusItems[0].cloneNode(true);

      // 将克隆节点插入到 searchButton 之前
      searchButton.parentNode.insertBefore(menusItemsClone, searchButton);

      // 删除所有的 menusItems 元素
      menusItems.forEach(function(item) {
        item.parentNode.removeChild(item);
      });
    }
  }
});


// 给body加post-page类，方便CSS只在文章页生效
if(location.pathname.startsWith('/posts/')){
  document.body.classList.add('post-page')
}else{
  document.body.classList.remove('post-page')
}






