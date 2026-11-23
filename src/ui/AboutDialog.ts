import { t as translateUI } from '../i18n';

export function mountAboutDialog(dialog: HTMLDialogElement): () => void {
  dialog.id = 'about-panel';
  dialog.className = 'pixel-dialog about-dialog cv-dialog';
  dialog.setAttribute('aria-labelledby', 'about-title');
  dialog.innerHTML = translateUI(`
    <header class="cv-header">
      <span class="cv-mark" aria-hidden="true"><i></i><i></i><i></i></span>
      <div><span class="cv-eyebrow">DEMO PROFILE</span><h2 id="about-title">关于 bubble</h2></div>
      <button type="button" class="cv-close" aria-label="关闭个人介绍">×</button>
    </header>
    <nav class="cv-chapters" aria-label="个人介绍章节">
      <button type="button" aria-controls="cv-personal">个人资料</button>
      <button type="button" aria-controls="cv-experience">示例经历</button>
    </nav>
    <div class="cv-reading-area">
      <section id="cv-personal" class="cv-page cv-personal" aria-label="个人资料" tabindex="-1">
        <div class="cv-introduction">
          <div class="cv-identity"><div><span class="cv-section-label">ABOUT ME</span>
          <h3>bubble</h3></div><img class="cv-portrait" src="${import.meta.env.BASE_URL}assets/optimized/display-portrait-open-ring-transparent-adfb62f334.webp" width="1254" height="1254" alt="宇航狗导览员" /></div>
          <p class="cv-position">视觉设计 · 互动体验</p>
          <p class="cv-summary">bubble 是 Pixel Space 的虚构设计师，围绕品牌、主视觉和网页互动创作概念案例。</p>
        </div>
      </section>
      <section id="cv-experience" class="cv-page cv-career" aria-label="示例经历" tabindex="-1">
        <section class="cv-career-job">
          <div class="cv-job-heading"><span class="cv-section-label">CONCEPT STUDIO</span><h3>微光设计室</h3><p>视觉设计师</p></div>
          <div class="cv-job-copy"><h4>设计方向</h4><p>为虚构的活动与品牌探索标识、海报和互动页面，展示同一视觉概念在不同媒介上的应用。</p></div>
        </section>
      </section>
    </div>
    <footer class="cv-footer">
      <button type="button" class="cv-return" data-gamepad-confirm>返回宇宙</button>
    </footer>`);

  const sections = [...dialog.querySelectorAll<HTMLElement>('.cv-page')];
  const chapters = [...dialog.querySelectorAll<HTMLButtonElement>('.cv-chapters button')];
  const readingArea = dialog.querySelector<HTMLElement>('.cv-reading-area')!;
  const returnButton = dialog.querySelector<HTMLButtonElement>('.cv-return')!;
  let active = -1;
  function highlight(index: number): void {
    if (active === index) return;
    active = index;
    chapters.forEach((button, i) => {
      button.setAttribute('aria-pressed', String(i === index));
      if(i === index) button.setAttribute('aria-current', 'location');
      else button.removeAttribute('aria-current');
    });
  }
  function sectionTop(index: number): number { return sections[index].offsetTop - sections[0].offsetTop; }
  chapters.forEach((button, index) => button.addEventListener('click', () => {
    readingArea.scrollTo({ top: sectionTop(index), behavior: 'auto' });
    highlight(index);
    sections[index].focus({ preventScroll: true });
  }));
  readingArea.addEventListener('scroll', () => {
    const last = sections.length - 1;
    if (readingArea.scrollTop > 0 && readingArea.scrollTop + readingArea.clientHeight >= readingArea.scrollHeight - 2) { highlight(last); return; }
    let index = 0;
    for (let i = 1; i < sections.length; i++) if (sectionTop(i) <= readingArea.scrollTop + 16) index = i;
    highlight(index);
  }, { passive: true });
  dialog.querySelector('.cv-close')!.addEventListener('click', () => dialog.close());
  returnButton.addEventListener('click', () => dialog.close());
  return () => { dialog.showModal(); readingArea.scrollTop = 0; highlight(0); sections[0].focus({ preventScroll: true }); };
}
