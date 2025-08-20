import modeEdition from './mode-edition.js';

const getApi = async (url) => {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors du fetch :', error);
    return [];
  }
};

const getCategories = () => getApi('http://localhost:5678/api/categories');
export const getGallery = () => getApi('http://localhost:5678/api/works');

export const displayGallery = (galleryItems) => {
  const galleryContainer = document.querySelector('.gallery');
  if (!galleryContainer) return;

  galleryContainer.innerHTML = '';
  galleryItems.forEach(item => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    galleryContainer.appendChild(figure);
  });

  checkToken();
};

const checkToken = () => {
  const token = sessionStorage.getItem('token');
  if (token) {
    modeEdition();
  }
};

const displayCategories = async () => {
  const categoriesul = document.getElementById('categories');
  if (!categoriesul) return;

  const categories = await getCategories();

  const allButton = document.createElement('li');
  allButton.textContent = 'Tous';
  allButton.value = 0;
  categoriesul.appendChild(allButton);

  categories.forEach(category => {
    const li = document.createElement('li');
    li.textContent = category.name;
    li.value = category.id;
    categoriesul.appendChild(li);
  });
};

document.getElementById('categories')?.addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    const categoryId = parseInt(e.target.value);
    const allGalleryItems = await getGallery();

    const filteredGallery = categoryId === 0
      ? allGalleryItems
      : allGalleryItems.filter(item => item.categoryId === categoryId);

    displayGallery(filteredGallery);
  }
});

document.getElementById('logout')?.addEventListener('click', (e) => {
  e.preventDefault();
  sessionStorage.removeItem('token');
  console.log("🔓 Token supprimé. Utilisateur déconnecté.");
  window.location.href = './login.html';
});

window.addEventListener('imageSupprimee', async () => {
  const allGalleryItems = await getGallery();
  displayGallery(allGalleryItems);
});

(async () => {
  await displayCategories();
  const allGalleryItems = await getGallery();
  displayGallery(allGalleryItems);
})();
