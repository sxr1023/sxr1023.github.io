/*
 * 默哀模式修复版 | 解决加载时机不生效、重复弹窗、样式挂载失败
 */
(function () {
  const memorialDays = [
    { month: 5, day: 12, title: '汶川大地震纪念日', subtitle: '愿逝者安息' },
    { month: 7, day: 7, title: '七七事变纪念日', subtitle: '铭记历史' },
    { month: 9, day: 18, title: '九一八事变纪念日', subtitle: '勿忘国耻' },
    { month: 12, day: 13, title: '南京大屠杀死难者国家公祭日', subtitle: '铭记历史，珍爱和平' }
  ];

  const now = new Date();
  const curMonth = now.getMonth() + 1;
  const curDay = now.getDate();
  const target = memorialDays.find(item => item.month === curMonth && item.day === curDay);

  // 非纪念日直接终止
  if (!target) return;

  // ========== 强制全局灰度，加 !important 防止被其他样式覆盖 ==========
  const grayStyle = document.createElement('style');
  grayStyle.id = 'memorial-gray-style';
  grayStyle.innerHTML = `
    html {
      filter: grayscale(100%) !important;
      -webkit-filter: grayscale(100%) !important;
    }
    ::-webkit-scrollbar-thumb{background:#999 !important;}
    ::-webkit-scrollbar-track{background:#ddd !important;}
    *{scrollbar-color:#999 #ddd !important;}
  `;
  document.head.appendChild(grayStyle);

  const storageKey = `mem_${curMonth}_${curDay}`;
  // 本次会话已弹过直接退出
  if (sessionStorage.getItem(storageKey)) return;
  sessionStorage.setItem(storageKey, '1');

  // 封装弹窗，页面无论加载到哪一步都能插入
  function createModal(info) {
    if (document.getElementById('memorial-notice')) return;

    const modalCSS = document.createElement('style');
    modalCSS.innerHTML = `
      #memorial-notice{
        position:fixed;top:0;left:0;width:100vw;height:100vh;
        background:rgba(0,0,0,0.6);z-index:999999;
        display:flex;align-items:center;justify-content:center;
        opacity:0;transition:opacity 0.4s ease;
        backdrop-filter:blur(4px);pointer-events:none;
      }
      #memorial-notice.show{opacity:1;}
      #memorial-notice .memorial-box{
        pointer-events:auto;
        background:rgba(255,255,255,0.08);
        border:1px solid rgba(255,255,255,0.12);
        border-radius:20px;padding:48px 40px 40px;
        text-align:center;max-width:400px;width:88%;
        box-shadow:0 8px 32px rgba(0,0,0,0.2);
        backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);
        transform:translateY(20px);transition:transform 0.4s ease;
      }
      #memorial-notice.show .memorial-box{transform:translateY(0);}
      #memorial-notice .memorial-candle{
        width:56px;height:56px;margin:0 auto 28px;
        display:flex;align-items:center;justify-content:center;
        border-radius:50%;background:rgba(255,180,50,0.1);
        box-shadow:0 0 24px rgba(255,180,50,0.15);
        animation:memorial-glow 2s ease-in-out infinite alternate;
      }
      @keyframes memorial-glow{
        from{box-shadow:0 0 24px rgba(255,180,50,0.15)}
        to{box-shadow:0 0 36px rgba(255,180,50,0.3)}
      }
      #memorial-notice .memorial-candle span{font-size:32px;line-height:1;}
      #memorial-notice .memorial-divider{
        width:40px;height:1px;margin:0 auto 24px;
        background:rgba(255,255,255,0.15);
      }
      #memorial-notice .memorial-title{
        font-size:20px;font-weight:600;color:#e0e0e0;
        margin:0 0 12px;letter-spacing:1px;
      }
      #memorial-notice .memorial-subtitle{
        font-size:15px;color:#999;margin:0 0 32px;letter-spacing:0.5px;
      }
      #memorial-notice .memorial-btn{
        background:transparent;color:#aaa;
        border:1px solid rgba(255,255,255,0.15);
        padding:10px 32px;border-radius:24px;
        font-size:14px;cursor:pointer;
        transition:all 0.25s ease;letter-spacing:0.5px;
      }
      #memorial-notice .memorial-btn:hover{
        color:#fff;border-color:rgba(255,255,255,0.4);
        background:rgba(255,255,255,0.05);
      }
    `;
    document.head.appendChild(modalCSS);

    const wrap = document.createElement('div');
    wrap.id = 'memorial-notice';
    wrap.innerHTML = `
      <div class="memorial-box">
        <div class="memorial-candle"><span>🕯️</span></div>
        <div class="memorial-divider"></div>
        <p class="memorial-title">${info.title}</p>
        <p class="memorial-subtitle">${info.subtitle}</p>
        <button class="memorial-btn">进入网站</button>
      </div>
    `;
    document.body.appendChild(wrap);

    // 关闭按钮逻辑
    wrap.querySelector('.memorial-btn').onclick = () => {
      wrap.classList.remove('show');
      setTimeout(() => {
        wrap.remove();
        modalCSS.remove();
      }, 400);
    };

    // 动画入场
    requestAnimationFrame(() => wrap.classList.add('show'));
  }

  // 兼容两种页面状态，必定执行弹窗
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => createModal(target));
  } else {
    createModal(target);
  }
})();