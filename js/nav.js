document.addEventListener("pjax:complete", tonav);
document.addEventListener("DOMContentLoaded", tonav);

function tonav() {
  const navDom = document.querySelector("#nav");
  const headerDom = document.getElementById("page-header");
  const nameContainer = document.querySelector("#name-container");
  const menuItems = document.querySelector("#nav .menus_items");
  const menuTitleBox = document.querySelector("#menuTitleBox");

  function up() {
    nameContainer.style.transform = "translate(-50%, 60px)";
    menuItems.style.transform = "translateY(0)";
    menuTitleBox.style.zIndex = "-1";
  }

  function scrollToTop() {
    btf.scrollToDest(0, 500);
  }

  function updatePageName() {
    const pageNameElement = document.getElementById("page-name");
    if (pageNameElement) {
      pageNameElement.innerText = document.title.split(" | sxr1023's Blog")[0];
    } else {
      const observer = new MutationObserver((mutations, observer) => {
        const pageNameElement = document.getElementById("page-name");
        if (pageNameElement) {
          pageNameElement.innerText = document.title.split(" | sxr1023's Blog")[0];
          observer.disconnect();
        }
      });
      observer.observe(document.body, { childList: true, subtree: true });
    }
  }

  up();
  let position = window.scrollY;

  // 初始化判断页面是否在最顶部
  function setNavTransparentState() {
    if (window.scrollY === 0) {
      headerDom.classList.add("is-top");
    } else {
      headerDom.classList.remove("is-top");
    }
  }
  setNavTransparentState();

  window.addEventListener("scroll", function () {
    let scroll = window.scrollY;
    // 更新顶部标记类
    setNavTransparentState();

    // 原有上下滑隐藏菜单逻辑不变
    if (scroll > position) {
      nameContainer.style.transform = "translate(-50%, 0)";
      menuItems.style.transform = "translateY(-60px)";
      menuTitleBox.style.zIndex = "1";
    } else {
      up();
    }
    position = scroll;
  });

  nameContainer.addEventListener("click", scrollToTop);
  updatePageName();
}