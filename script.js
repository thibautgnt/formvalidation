// Stockage des données du formulaire
const formData = {
    firstName: null,
    lastName: null,
    email: null,
};

// Récupération des éléments du DOM
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const mon_form = document.getElementById('mon_form');
const error_name = document.getElementById('error_name');

// Écouteurs d'événements pour la saisie
first_name.addEventListener("input", (e) => {
    formData.firstName = e.target.value;
    // Réinitialiser les styles d'erreur lors de la saisie
    error_name.style.display = "none";
    first_name.classList.remove("error");
});

last_name.addEventListener("input", (e) => {
    formData.lastName = e.target.value;
});

email.addEventListener("input", (e) => {
    formData.email = e.target.value;
});

// Gestion de la soumission du formulaire
mon_form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Données du formulaire:", formData);

    // Validation du prénom
    if (!formData.firstName) {
        error_name.style.display = "block";
        first_name.classList.add("error");
        error_name.innerText = "Le prénom est obligatoire";
        return;
    }

    // Validation du nom
    if (!formData.lastName) {
        alert("Le nom est obligatoire");
        return;
    }

    // Validation de l'email
    if (!formData.email) {
        alert("L'adresse email est obligatoire");
        return;
    }

    // Validation du format de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        alert("Veuillez entrer une adresse email valide");
        return;
    }

    // Si toutes les validations sont passées
    alert("Formulaire envoyé avec succès !");
});
