const modeEdition = () => {

  const header = document.querySelector('header');
  const editModeHTML = '<p class="top"><i class="fa-regular fa-pen-to-square"></i>Mode édition</p>';
  header.insertAdjacentHTML('afterbegin', editModeHTML);

  const headerSection = document.querySelector('section.header');
  headerSection.classList.add('margin-top-added');

  const h2 = document.getElementById('titre-projets');
  const a = document.createElement('a');
  a.href = '#';
  a.id = 'modifier';
  a.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>modifier';

  h2.appendChild(document.createTextNode(' '));
  h2.appendChild(a);

  document.querySelector('.header').style.marginTop = '80px';

  const categories = document.getElementById("categories");
  categories.style.display = "none";

  document.getElementById("login").querySelector("a").textContent = "lougot";
  document.getElementById("login").querySelector("a").addEventListener("click", function(e) {
    e.preventDefault();
    const script = document.getElementById("edition-script");
    if (script) {
      script.remove();
      console.log("Le script mode-edition.js a été retiré.");
    } else {
      console.log("Le script n'existe pas ou a déjà été retiré.");
    }
  });

 
  document.getElementById("modifier").addEventListener("click", function (e) {
    e.preventDefault();

    
    if (document.getElementById("gallerie-photo-script")) {
      console.log("Le script gallerie-photo.js est déjà chargé.");
      return;
    }

    const script = document.createElement("script");
    script.src = "./gallerie-photo.js"; 
    script.id = "gallerie-photo-script";
    script.type = "module"; 
    document.body.appendChild(script);

    console.log("Script gallerie-photo.js chargé.");
  });

};

export default modeEdition;


