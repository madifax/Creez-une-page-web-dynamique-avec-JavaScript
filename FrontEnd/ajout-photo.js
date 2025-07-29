export function afficherFormulaireAjout() {
  const section = document.querySelector('.modale');
  if (!section) return;

  section.innerHTML = ''; // Vide la modale pour afficher le formulaire

  // Bouton de fermeture
  const closeIcon = document.createElement('i');
  closeIcon.className = 'croix fa-solid fa-xmark';
  closeIcon.addEventListener('click', () => {
    section.remove();
    document.querySelector('.modal-overlay')?.remove();
  });
  section.appendChild(closeIcon);

  // Titre
  const title = document.createElement('h3');
  title.textContent = 'Ajouter une photo';
  section.appendChild(title);

  // Formulaire
  const form = document.createElement('form');
  form.classList.add('form-ajout-photo');
  form.enctype = 'multipart/form-data';

  // Champ image
  const fileLabel = document.createElement('label');
  fileLabel.textContent = 'Image :';
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.name = 'image';
  fileInput.accept = 'image/*';
  fileInput.required = true;

  // Champ titre
  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Titre :';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.required = true;

  // Champ catégorie
  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Catégorie :';
  const categorySelect = document.createElement('select');
  categorySelect.name = 'category';
  categorySelect.required = true;

  // Bouton submit
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Valider';

  // Ajout des champs au formulaire
  form.appendChild(fileLabel);
  form.appendChild(fileInput);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(categoryLabel);
  form.appendChild(categorySelect);
  form.appendChild(submitBtn);
  section.appendChild(form);

  // Chargement des catégories
  fetch('http://localhost:5678/api/categories')
    .then(res => res.json())
    .then(categories => {
      categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
      });
    });

  // Soumission du formulaire
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('token');
    if (!token) {
      alert('Veuillez vous connecter');
      return;
    }

    const formData = new FormData(form);
    try {
      const response = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        alert('Photo ajoutée avec succès.');
        form.reset();
        // Retour à la galerie après ajout
        import('./gallerie-photo.js').then(mod => {
          section.remove();
          document.querySelector('.modal-overlay')?.remove();
          mod.createGalleryModal(); // recharge la galerie
        });
      } else {
        alert('Erreur lors de l’envoi. Vérifiez les champs.');
      }
    } catch (error) {
      alert('Erreur réseau');
      console.error(error);
    }
  });
}


