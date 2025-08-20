const modeEdition = () => {
  const header = document.querySelector('header');

  
  if (!document.querySelector('.top')) {
    const editModeHTML = '<p class="top"><i class="fa-regular fa-pen-to-square"></i>Mode édition</p>';
    header.insertAdjacentHTML('afterbegin', editModeHTML);
  }

  const headerSection = document.querySelector('section.header');
  headerSection.classList.add('margin-top-added');

  const h2 = document.getElementById('titre-projets');

  if (!document.getElementById('modifier')) {
    const a = document.createElement('a');
    a.href = '#';
    a.id = 'modifier';
    a.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier';

    h2.appendChild(document.createTextNode(' '));
    h2.appendChild(a);

    a.addEventListener("click", async function (e) {
      e.preventDefault();

      if (!window.galleryModalLoaded) {
        const module = await import('./gallerie-photo.js');
        window.createGalleryModal = module.createGalleryModal;
        window.galleryModalLoaded = true;
      }

      window.createGalleryModal();
    });
  }

  document.querySelector('.header').style.marginTop = '80px';

  const categories = document.getElementById("categories");
  categories.style.display = "none";

  const loginLink = document.getElementById("login").querySelector("a");
  loginLink.textContent = "lougot";
  loginLink.addEventListener("click", function(e) {
    e.preventDefault();
    const script = document.getElementById("edition-script");
    if (script) {
      script.remove();
      console.log("Le script mode-edition.js a été retiré.");
    } else {
      console.log("Le script n'existe pas ou a déjà été retiré.");
    }
  });
};

export default modeEdition;

