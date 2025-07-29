import modeEdition from './mode-edition.js';

const getApi = async (url) => {
  try {
    const response = await fetch(url);
    const works = await response.json();
    return works;
  } catch (error) {
    console.error('Erreur lors du fetch :', error);
    return [];
  }
};

const getCategories = () => getApi('http://localhost:5678/api/categories');
const getGallery = () => getApi('http://localhost:5678/api/works'); 


const displayGallery = (galleryItems) => {
  const galleryContainer = document.querySelector('.gallery'); 
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
  if (token !== null){
    modeEdition();
  }
}

const displayCategories = async () => {
  const categoriesul = document.getElementById('categories');
  const categories = await getCategories();

  // Bouton Tous
  const allButton = document.createElement('li');
  allButton.textContent = 'Tous';
  allButton.value = 0;
  categoriesul.appendChild(allButton);

  categories.forEach(category => {
    const itemli = document.createElement('li');
    itemli.textContent = category.name;
    itemli.value = category.id;
    categoriesul.appendChild(itemli);
  });
};



document.getElementById('categories').addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    const categoryId = parseInt(e.target.value);
    const allGalleryItems = await getGallery();

    let filteredGallery;
if (categoryId === 0) {
  filteredGallery = allGalleryItems;
} else {
  filteredGallery = allGalleryItems.filter(item => item.categoryId === categoryId);
}

    displayGallery(filteredGallery);
  }
});

document.getElementById('logout')?.addEventListener('click', function (e) {
  e.preventDefault();

  // Supprimer le token de sessionStorage
  sessionStorage.removeItem('token');
  console.log("🔓 Token supprimé. Utilisateur déconnecté.");

  // Si une fonction exitModeEdition existe, l'appeler pour nettoyer le DOM
  if (typeof exitModeEdition === "function") {
    exitModeEdition();
    console.log("🧹 modeEdition désactivé.");
  }

  // Rediriger vers la page de connexion
  window.location.href = './login.html'; // ou autre page selon ton app
});

const displayGallerymodale = (gallerymodaleItems) => {
  const gallerymodaleContainer = document.querySelector('.gallerymodale'); 
  gallerymodaleContainer.innerHTML = ''; 

  gallerymodaleItems.forEach(item => {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');

    img.src = item.imageUrl;
    img.alt = item.title;
    figcaption.textContent = item.title;

    figure.appendChild(img);
    figure.appendChild(figcaption);
    gallerymodaleContainer.appendChild(figure);
  });
    checkToken();
};


(async () => {
  await displayCategories();
  const allGalleryItems = await getGallery();
  displayGallery(allGalleryItems);
})();


