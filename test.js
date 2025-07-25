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

const getWorks = () => getApi('http://localhost:5678/api/works');
const getCategories = () => getApi('http://localhost:5678/api/categories');



const displayCategories = async () => {
  const categoriesul = document.getElementById('categories');
  const categories = await getCategories(); // ← ici on attend la donnée

  categories.forEach(category => {
    const itemli = document.createElement('li');

    itemli.textContent = category.name;
    itemli.value = category.id;

    categoriesul.appendChild(itemli);
  });
}



const displayGallery = async () => {
  const galleryDiv = document.querySelector('.gallery');
  const works = await getWorks(); // ← ici on attend la donnée

  works.forEach(item => {
    const itemDiv = document.createElement('figure');

    const img = document.createElement('img');
    img.src = item.imageUrl;
    img.alt = item.title;

    const texte = document.createElement('figcaption');
    texte.textContent = item.title;

    itemDiv.appendChild(img);
    itemDiv.appendChild(texte);
    galleryDiv.appendChild(itemDiv);
  });
   checkToken(); // Vérifie le token après l'affichage de la galerie
};

const checkToken = () => { 
  const token = sessionStorage.getItem('token');
  if (token !== null){
    modeEdition();
  }
}



document.getElementById('categories').addEventListener('click', async (e) => {
  if (e.target.tagName === 'LI') {
    const categoryId = parseInt(e.target.value);
    console.log(`Vous avez cliqué sur : ${categoryId}`);

    const allProjects = await getGallery();
    const filteredProjects = categoryId === 0
      ? allProjects
      : allProjects.filter(project => project.categoryId === categoryId);

    displayProjects(filteredProjects);
  }
});


displayCategories();
displayGallery();
displayGalleryphoto();




//lougot


document.getElementById("login").querySelector("a").textContent = "lougot";
  document.getElementById("login").querySelector("a").addEventListener("click", function(e) {
      e.preventDefault(); // Empêche le lien d’agir normalement
      const script = document.getElementById("edition-script");
      if (script) {
        script.remove(); // Supprime le script de la page
        console.log("Le script mode-edition.js a été retiré.");
      } else {
        console.log("Le script n'existe pas ou a déjà été retiré.");
      }
    });