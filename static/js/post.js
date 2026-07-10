/**
 * 归档页/分类页年份折叠功能
 * 最新年份默认展开，旧年份默认折叠并显示文章预览
 */
function initYearFold() {
  var containers = document.querySelectorAll('#category .article-sort, #archive .article-sort, #tag .article-sort');
  if (!containers.length) return;

  containers.forEach(function (container) {
    var yearItems = container.querySelectorAll('.article-sort-item.year');
    if (yearItems.length <= 1) return;

    yearItems.forEach(function (yearItem, index) {
      if (yearItem.dataset.foldInit === 'true') return;
      yearItem.dataset.foldInit = 'true';

      // 收集该年份下的所有文章元素
      var articles = [];
      var next = yearItem.nextElementSibling;
      while (next && !next.classList.contains('year')) {
        articles.push(next);
        next = next.nextElementSibling;
      }

      var count = articles.length;
      if (count === 0) return;

      // 提取前几篇文章标题用于预览
      var previewTitles = [];
      var maxPreview = Math.min(4, count);
      for (var i = 0; i < maxPreview; i++) {
        var titleEl = articles[i].querySelector('.article-sort-item-title');
        if (titleEl) {
          var text = titleEl.textContent.trim();
          if (text.length > 12) text = text.substring(0, 12) + '…';
          previewTitles.push(text);
        }
      }
      if (count > maxPreview) {
        previewTitles.push('等 ' + count + ' 篇');
      }

      // 创建预览元素
      var preview = document.createElement('div');
      preview.className = 'year-fold-preview';
      previewTitles.forEach(function (t) {
        var s = document.createElement('span');
        s.textContent = t;
        preview.appendChild(s);
      });

      // 创建包裹容器
      var wrapper = document.createElement('div');
      wrapper.className = 'year-group-posts';
      articles.forEach(function (el) {
        wrapper.appendChild(el);
      });

      // 插入 DOM：年份标题 -> 预览 -> 文章容器
      yearItem.after(preview);
      preview.after(wrapper);

      // 年份标题添加交互
      yearItem.classList.add('year-foldable');

      // 添加右侧信息区域
      var info = document.createElement('span');
      info.className = 'year-fold-info';

      var badge = document.createElement('span');
      badge.className = 'year-fold-badge';
      badge.textContent = count + ' 篇';

      var arrow = document.createElement('i');
      arrow.className = 'fas fa-angle-right year-fold-arrow';

      info.appendChild(badge);
      info.appendChild(arrow);
      yearItem.appendChild(info);

      // 只有第一个年份默认展开
      if (index > 0) {
        wrapper.classList.add('is-collapsed');
        yearItem.classList.add('is-collapsed');
      }

      // 点击切换
      function toggle() {
        var collapsed = wrapper.classList.contains('is-collapsed');
        if (collapsed) {
          wrapper.classList.remove('is-collapsed');
          yearItem.classList.remove('is-collapsed');
        } else {
          wrapper.classList.add('is-collapsed');
          yearItem.classList.add('is-collapsed');
        }
      }

      yearItem.addEventListener('click', toggle);
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initYearFold);
} else {
  initYearFold();
}
document.addEventListener('pjax:complete', initYearFold);

