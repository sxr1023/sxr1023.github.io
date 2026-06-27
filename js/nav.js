document.addEventListener("pjax:complete", tonav);
document.addEventListener("DOMContentLoaded", tonav);
// 响应pjax
function tonav() {
  // document.getElementById("name-container").setAttribute("style", "display:none");

  let position = $(window).scrollTop();

  $(window).scroll(function () {
    let scroll = $(window).scrollTop();

    if (scroll > position) {
      document
        .getElementById("name-container")
        .setAttribute("style", "top: 0 !important;");
      // document.getElementById("name-container").classList.add('titleShow');
      document
        .getElementsByClassName("menus_items")[1]
        .setAttribute("style", "top: -60px !important");
    }
 else {
      document
        .getElementsByClassName("menus_items")[1]
        .setAttribute("style", "");
      document.getElementById("name-container").setAttribute("style", "");
      // document.getElementById("name-container").classList.remove('titleShow');
    }

    position = scroll;
  });
  function scrollToTop() {
    document
      .getElementsByClassName("menus_items")[1]
      .setAttribute("style", "");
    document.getElementById("name-container").setAttribute("style", "");
    btf.scrollToDest(0, 500);
  }
  // 修复没有弄右键菜单的童鞋无法回顶部的问题
  document.getElementById("page-name").innerText
    = document.title.split(" | 鹊楠の小窝")[0];
  document
    .getElementById("page-name")
    .addEventListener("click", scrollToTop);
}
