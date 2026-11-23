import { t as translateUI } from '../i18n';

export function mountAboutDialog(dialog: HTMLDialogElement): () => void {
  dialog.id = 'about-panel';
  dialog.className = 'pixel-dialog about-dialog cv-dialog';
  dialog.setAttribute('aria-labelledby', 'about-title');
  dialog.innerHTML = translateUI(`
    <header class="cv-header">
      <div><h2 id="about-title">关于 bubble</h2></div>
      <button type="button" class="cv-close" aria-label="关闭个人介绍">×</button>
    </header>
    <div class="cv-reading-area"><p>我是bubble，ai黑奴</p></div>
    <footer class="cv-footer">
      <button type="button" class="cv-return" data-gamepad-confirm>返回宇宙</button>
    </footer>`);

  dialog.querySelector('.cv-close')!.addEventListener('click', () => dialog.close());
  dialog.querySelector('.cv-return')!.addEventListener('click', () => dialog.close());
  return () => dialog.showModal();
}
