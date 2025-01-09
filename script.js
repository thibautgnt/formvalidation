// Stockage des données du formulaire
const formData = {
    firstName: null,
    lastName: null,
    email: null,
    password: null,
    confirmPassword: null
};

// Liste des domaines d'email courants
const emailDomains = [
    '@gmail.com',
    '@hotmail.com',
    '@hotmail.fr',
    '@yahoo.com',
    '@yahoo.fr',
    '@outlook.com',
    '@outlook.fr',
    '@orange.fr',
    '@sfr.fr',
    '@free.fr',
    '@aol.com',
    '@live.fr',
    '@icloud.com'
];

// Récupération des éléments du DOM
const first_name = document.getElementById('first_name');
const last_name = document.getElementById('last_name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm_password');
const emailSuggestions = document.getElementById('email-suggestions');
const mon_form = document.getElementById('mon_form');
const error_name = document.getElementById('error_name');
const error_lastname = document.getElementById('error_lastname');
const error_email = document.getElementById('error_email');
const error_password = document.getElementById('error_password');
const error_confirm_password = document.getElementById('error_confirm_password');
const strengthBar = document.querySelector('.strength-bar');

let selectedSuggestionIndex = -1;

// Fonction pour vérifier la force du mot de passe
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;

    strengthBar.className = 'strength-bar';
    if (strength >= 4) {
        strengthBar.classList.add('strong');
        return true;
    } else if (strength >= 2) {
        strengthBar.classList.add('medium');
        return false;
    } else {
        strengthBar.classList.add('weak');
        return false;
    }
}

// Fonction pour afficher un message d'erreur
function showError(element, errorElement, message) {
    element.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('visible');
}

// Fonction pour cacher un message d'erreur
function hideError(element, errorElement) {
    element.classList.remove('error');
    errorElement.classList.remove('visible');
}

// Fonction pour générer les suggestions d'email
function generateEmailSuggestions(value) {
    if (!value || value.includes('@')) {
        emailSuggestions.style.display = 'none';
        return;
    }

    const suggestions = emailDomains.map(domain => `${value}${domain}`);
    emailSuggestions.innerHTML = suggestions
        .map((suggestion, index) => `
            <div class="email-suggestion ${index === selectedSuggestionIndex ? 'selected' : ''}" 
                 data-suggestion="${suggestion}">
                ${suggestion}
            </div>
        `)
        .join('');

    emailSuggestions.style.display = 'block';
}

// Fonction pour sélectionner une suggestion
function selectSuggestion(suggestion) {
    email.value = suggestion;
    formData.email = suggestion;
    emailSuggestions.style.display = 'none';
    selectedSuggestionIndex = -1;
}

// Écouteurs d'événements pour la saisie
first_name.addEventListener("input", (e) => {
    formData.firstName = e.target.value;
    if (e.target.value.length >= 3) {
        hideError(first_name, error_name);
    }
});

last_name.addEventListener("input", (e) => {
    formData.lastName = e.target.value;
    if (e.target.value.length >= 3) {
        hideError(last_name, error_lastname);
    }
});

email.addEventListener("input", (e) => {
    formData.email = e.target.value;
    hideError(email, error_email);
    generateEmailSuggestions(e.target.value);
});

password.addEventListener("input", (e) => {
    formData.password = e.target.value;
    const isStrong = checkPasswordStrength(e.target.value);
    if (isStrong) {
        hideError(password, error_password);
    }
    if (confirm_password.value) {
        if (e.target.value === confirm_password.value) {
            hideError(confirm_password, error_confirm_password);
        } else {
            showError(confirm_password, error_confirm_password, "Les mots de passe ne correspondent pas");
        }
    }
});

confirm_password.addEventListener("input", (e) => {
    formData.confirmPassword = e.target.value;
    if (e.target.value === password.value) {
        hideError(confirm_password, error_confirm_password);
    }
});

// Gestion des clics sur les suggestions
emailSuggestions.addEventListener('click', (e) => {
    const suggestion = e.target.closest('.email-suggestion');
    if (suggestion) {
        selectSuggestion(suggestion.dataset.suggestion);
    }
});

// Gestion de la navigation au clavier dans les suggestions
email.addEventListener('keydown', (e) => {
    const suggestions = document.querySelectorAll('.email-suggestion');
    
    if (emailSuggestions.style.display === 'none') return;

    switch (e.key) {
        case 'ArrowDown':
            e.preventDefault();
            selectedSuggestionIndex = Math.min(selectedSuggestionIndex + 1, suggestions.length - 1);
            break;
        case 'ArrowUp':
            e.preventDefault();
            selectedSuggestionIndex = Math.max(selectedSuggestionIndex - 1, 0);
            break;
        case 'Enter':
            e.preventDefault();
            if (selectedSuggestionIndex >= 0) {
                selectSuggestion(suggestions[selectedSuggestionIndex].dataset.suggestion);
            }
            return;
        case 'Escape':
            emailSuggestions.style.display = 'none';
            selectedSuggestionIndex = -1;
            return;
        default:
            return;
    }

    suggestions.forEach((s, index) => {
        s.classList.toggle('selected', index === selectedSuggestionIndex);
    });
});

// Cacher les suggestions quand on clique ailleurs
document.addEventListener('click', (e) => {
    if (!e.target.closest('.email-input-container')) {
        emailSuggestions.style.display = 'none';
        selectedSuggestionIndex = -1;
    }
});

// Gestion de la soumission du formulaire
mon_form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Validation du prénom
    if (!formData.firstName || formData.firstName.length < 3) {
        showError(first_name, error_name, "Le prénom doit contenir au moins 3 caractères");
        isValid = false;
    }

    // Validation du nom
    if (!formData.lastName || formData.lastName.length < 3) {
        showError(last_name, error_lastname, "Le nom doit contenir au moins 3 caractères");
        isValid = false;
    }

    // Validation de l'email
    if (!formData.email) {
        showError(email, error_email, "L'adresse email est obligatoire");
        isValid = false;
    } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showError(email, error_email, "Veuillez entrer une adresse email valide");
            isValid = false;
        }
    }

    // Validation du mot de passe
    if (!formData.password || formData.password.length < 8) {
        showError(password, error_password, "Le mot de passe doit contenir au moins 8 caractères");
        isValid = false;
    } else if (!checkPasswordStrength(formData.password)) {
        showError(password, error_password, "Le mot de passe n'est pas assez fort");
        isValid = false;
    }

    // Validation de la confirmation du mot de passe
    if (!formData.confirmPassword || formData.confirmPassword !== formData.password) {
        showError(confirm_password, error_confirm_password, "Les mots de passe ne correspondent pas");
        isValid = false;
    }

    // Si le formulaire est valide
    if (isValid) {
        // Création d'une div pour le message de succès
        const successMessage = document.createElement('div');
        successMessage.textContent = "Compte créé avec succès !";
        successMessage.style.cssText = `
            background-color: #f0fff4;
            color: #2f855a;
            padding: 1rem;
            border-radius: 8px;
            border: 1px solid #9ae6b4;
            margin-top: 1rem;
            text-align: center;
            animation: slideDown 0.3s ease-out;
        `;
        
        // Ajout du message après le formulaire
        mon_form.appendChild(successMessage);
        
        // Suppression du message après 3 secondes
        setTimeout(() => {
            successMessage.remove();
            mon_form.reset();
            formData.firstName = null;
            formData.lastName = null;
            formData.email = null;
            formData.password = null;
            formData.confirmPassword = null;
            strengthBar.className = 'strength-bar';
        }, 3000);
    }
});
