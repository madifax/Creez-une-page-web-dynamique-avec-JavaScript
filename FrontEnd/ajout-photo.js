export function afficherFormulaireAjout() {
  const section = document.querySelector('.modale');
  if (!section) return;

  section.innerHTML = '';

  const retourBtn = document.createElement('i');
  retourBtn.className = 'fleche-retour fa-solid fa-arrow-left';
  retourBtn.style.cursor = 'pointer';
  retourBtn.style.position = 'absolute';
  retourBtn.style.top = '20px';
  retourBtn.style.left = '20px';
  retourBtn.style.fontSize = '1.2rem';
  retourBtn.addEventListener('click', async () => {
    section.remove();
    document.querySelector('.modal-overlay')?.remove();
    document.querySelector('div[style*="rgba(0, 0, 0, 0.3)"]')?.remove();
    document.body.classList.remove('pagefoncer');

    const mod = await import('./gallerie-photo.js');
    mod.createGalleryModal();
  });
  section.appendChild(retourBtn);

  const closeIcon = document.createElement('i');
  closeIcon.className = 'croix fa-solid fa-xmark';
  closeIcon.addEventListener('click', () => {
    section.remove();
    document.querySelector('.modal-overlay')?.remove();
    document.querySelector('div[style*="rgba(0, 0, 0, 0.3)"]')?.remove();
    document.body.classList.remove('pagefoncer');
  });
  section.appendChild(closeIcon);

  const title = document.createElement('h3');
  title.textContent = 'Ajouter une photo';
  section.appendChild(title);

  const form = document.createElement('form');
  form.classList.add('form-ajout-photo');
  form.enctype = 'multipart/form-data';

  const imageDropZone = document.createElement('div');
  imageDropZone.classList.add('image-drop-zone');

  const dropText = document.createElement('span');
  dropText.textContent = '+ Ajouter photo';
  dropText.classList.add('drop-text');
  imageDropZone.appendChild(dropText);

  const infoText = document.createElement('p');
  infoText.classList.add('image-info');
  infoText.textContent = 'jpg, png : 4mo max';
  imageDropZone.appendChild(infoText);

  const imagePreview = document.createElement('img');
  imagePreview.classList.add('image-preview');
  imagePreview.style.display = 'none';
  imageDropZone.appendChild(imagePreview);

  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.name = 'image';
  fileInput.accept = 'image/*';
  fileInput.required = true;
  fileInput.style.display = 'none';

  imageDropZone.addEventListener('click', () => {
    fileInput.click();
  });

  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) {

      if (file.size > 4 * 1024 * 1024) {
        alert('Le fichier est trop volumineux (max 4 Mo).');
        fileInput.value = '';
        return;
      }

      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        alert('Seuls les fichiers JPG et PNG sont autorisés.');
        fileInput.value = '';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        imagePreview.src = reader.result;
        imagePreview.style.display = 'block';
        imageDropZone.classList.add('has-image');

        imageDropZone.innerHTML = '';
        imageDropZone.appendChild(imagePreview);
        imageDropZone.appendChild(infoText);

        checkFormValidity();
      };
      reader.readAsDataURL(file);
    } else {
      checkFormValidity();
    }
  });

  const titleLabel = document.createElement('label');
  titleLabel.textContent = 'Titre ';
  const titleInput = document.createElement('input');
  titleInput.type = 'text';
  titleInput.name = 'title';
  titleInput.required = true;

  titleInput.addEventListener('input', checkFormValidity);

  const categoryLabel = document.createElement('label');
  categoryLabel.textContent = 'Catégorie ';
  const categorySelect = document.createElement('select');
  categorySelect.name = 'category';
  categorySelect.required = true;

  categorySelect.addEventListener('change', checkFormValidity);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Valider';
  submitBtn.disabled = true;
  submitBtn.style.backgroundColor = '#A7A7A7';
  submitBtn.style.cursor = 'not-allowed';

  function checkFormValidity() {
    const hasImage = fileInput.files.length > 0;
    const hasTitle = titleInput.value.trim() !== '';
    const hasCategory = categorySelect.value !== '';

    const isValid = hasImage && hasTitle && hasCategory;

    submitBtn.disabled = !isValid;
    submitBtn.style.backgroundColor = isValid ? '#1D6154' : '#A7A7A7';
    submitBtn.style.cursor = isValid ? 'pointer' : 'not-allowed';
  }

  form.appendChild(imageDropZone);
  form.appendChild(fileInput);
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  form.appendChild(categoryLabel);
  form.appendChild(categorySelect);
  form.appendChild(submitBtn);
  section.appendChild(form);

  fetch('http://localhost:5678/api/categories')
    .then(res => res.json())
    .then(categories => {
      const defaultOption = document.createElement('option');
      defaultOption.value = '';
      defaultOption.textContent = '-- Choisir une catégorie --';
      defaultOption.disabled = true;
      defaultOption.selected = true;
      categorySelect.appendChild(defaultOption);

      categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.name;
        categorySelect.appendChild(option);
      });

      checkFormValidity();
    });

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
        window.location.reload()
      } else {
        alert('Erreur lors de l’envoi. Vérifiez les champs.');
      }
    } catch (error) {
      alert('Erreur réseau');
      console.error(error);
    }
  });
}
