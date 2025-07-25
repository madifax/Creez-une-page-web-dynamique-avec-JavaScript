

document.body.classList.add('pagefoncer');

  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'; // 50% opacité noire
  overlay.style.zIndex = 999;
  overlay.style.pointerEvents = 'none'; // pour ne pas bloquer les interactions

  document.body.appendChild(overlay);

