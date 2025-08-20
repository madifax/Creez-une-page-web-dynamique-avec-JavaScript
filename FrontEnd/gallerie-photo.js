export function createGalleryModal() {
  if (document.querySelector('.modale')) return;

  document.body.classList.add('pagefoncer');

  const backgroundOverlay = document.createElement('div');
  backgroundOverlay.style.position = 'fixed';
  backgroundOverlay.style.top = 0;
  backgroundOverlay.style.left = 0;
  backgroundOverlay.style.width = '100%';
  backgroundOverlay.style.height = '100%';
  backgroundOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.3)';
  backgroundOverlay.style.zIndex = 999;
  backgroundOverlay.style.pointerEvents = 'none';
  document.body.appendChild(backgroundOverlay);

  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.zIndex = 1000;
  document.body.appendChild(overlay);

  const section = document.createElement('section');
  section.classList.add('modale');
  section.style.zIndex = 1001;
  overlay.appendChild(section);

  overlay.addEventListener('click', (e) => {
    if (!section.contains(e.target)) {
      section.remove();
      overlay.remove();
      backgroundOverlay.remove();
      document.body.classList.remove('pagefoncer');
    }
  });

  const closeIcon = document.createElement('i');
  closeIcon.className = 'croix fa-solid fa-xmark';
  closeIcon.addEventListener('click', () => {
    section.remove();
    overlay.remove();
    backgroundOverlay.remove();
    document.body.classList.remove('pagefoncer');
  });
  section.appendChild(closeIcon);

  const title = document.createElement('h3');
  title.textContent = 'Galerie Photo';
  section.appendChild(title);

  const gallery = document.createElement('div');
  gallery.classList.add('gallerymodale');
  section.appendChild(gallery);

  async function loadGallery() {
    gallery.innerHTML = '';

    try {
      const res = await fetch('http://localhost:5678/api/works');
      const works = await res.json();

      works.forEach(item => {
        const figure = document.createElement('figure');

        const img = document.createElement('img');
        img.src = item.imageUrl;
        img.alt = item.title;
        figure.appendChild(img);

        const trash = document.createElement('img');
        trash.src = 'assets/images/poubelle.png';
        trash.alt = 'Supprimer';
        trash.classList.add('trash-icon');
        figure.appendChild(trash);

        gallery.appendChild(figure);

        trash.addEventListener('click', async () => {
          const token = sessionStorage.getItem('token');
          if (!token) {
            alert("Vous n'êtes pas connecté.");
            return;
          }

          // Demande de confirmation simple
          if (!confirm("Voulez-vous vraiment supprimer cette image ?")) {
            return;
          }

          try {
            const response = await fetch(`http://localhost:5678/api/works/${item.id}`, {
              method: 'DELETE',
              headers: {
                Authorization: `Bearer ${token}`
              }
            });

            if (response.ok) {
              await loadGallery();
              const event = new Event('imageSupprimee');
              window.dispatchEvent(event);
              console.log(`Image ID ${item.id} supprimée.`);
            } else {
              const errorText = await response.text();
              alert(`Erreur de suppression (${response.status}) : ${errorText}`);
            }
          } catch (error) {
            console.error('Erreur réseau lors de la suppression :', error);
            alert("Erreur réseau. Impossible de supprimer l'image.");
          }
        });
      });
    } catch (error) {
      console.error("Erreur lors du chargement de la galerie :", error);
    }
  }

  loadGallery();

  const button = document.createElement('input');
  button.classList.add('ajout');
  button.type = 'submit';
  button.value = 'Ajouter une photo';
  section.appendChild(button);

  button.addEventListener('click', async e => {
    e.preventDefault();
    try {
      const module = await import('./ajout-photo.js');
      module.afficherFormulaireAjout();
    } catch (err) {
      console.error('Erreur chargement du module ajout-photo.js :', err);
    }
  });
}
