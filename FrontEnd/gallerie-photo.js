
// gallerie-photo.js
export function createGalleryModal() {
  if (document.querySelector('.modale')) return;

  const overlay = document.createElement('div');
  overlay.classList.add('modal-overlay');
  document.body.appendChild(overlay);

  const section = document.createElement('section');
  section.classList.add('modale');

  const closeIcon = document.createElement('i');
  closeIcon.className = 'croix fa-solid fa-xmark';
  closeIcon.addEventListener('click', () => {
    section.remove();
    overlay.remove();
  });
  section.appendChild(closeIcon);

  const title = document.createElement('h3');
  title.textContent = 'Galerie Photo';
  section.appendChild(title);

  const gallery = document.createElement('div');
  gallery.classList.add('gallerymodale');
  section.appendChild(gallery);

  const button = document.createElement('input');
  button.classList.add('ajout');
  button.type = 'submit';
  button.value = 'Ajouter une photo';
  section.appendChild(button);

  document.querySelector('main').appendChild(section);

  // Charger la galerie
  fetch('http://localhost:5678/api/works')
    .then(res => res.json())
    .then(works => {
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
        trash.addEventListener('click', async () => {
          const token = sessionStorage.getItem('token');
          await fetch(`http://localhost:5678/api/works/${item.id}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          createGalleryModal(); // recharge
        });
        figure.appendChild(trash);
        gallery.appendChild(figure);
      });
    });

  // ✅ Bouton Ajouter une photo
  button.addEventListener('click', async e => {
    e.preventDefault();
    try {
      const module = await import('./ajout-photo.js');
      module.afficherFormulaireAjout(); // appelle la fonction importée
    } catch (err) {
      console.error('Erreur chargement du module ajout-photo.js :', err);
    }
  });
}
