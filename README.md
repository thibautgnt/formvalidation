# Validation de Formulaire Frontend

## Démo
🚀 [Voir la démo en ligne](https://thibautgnt.github.io/formvalidation/)

## Description
Ce projet démontre la mise en œuvre d'une validation de formulaire côté client (frontend) en utilisant HTML, CSS et JavaScript vanilla. Il illustre les bonnes pratiques de validation des données utilisateur en temps réel, avec un design moderne et une expérience utilisateur optimisée.

## Fonctionnalités

### Validation en Temps Réel
- Vérification instantanée des champs lors de la saisie
- Messages d'erreur contextuels et visuellement intégrés
- Indicateur de force du mot de passe en temps réel

### Champs du Formulaire
- **Prénom et Nom** :
  - Minimum 3 caractères requis
  - Validation instantanée
  - Icônes distinctives

- **Email** :
  - Validation du format
  - Suggestions de domaines d'email populaires
  - Navigation dans les suggestions avec le clavier
  - Auto-complétion intelligente

- **Mot de passe** :
  - Minimum 8 caractères
  - Indicateur de force dynamique
  - Critères de validation :
    - Lettres majuscules et minuscules
    - Chiffres
    - Caractères spéciaux
  - Confirmation du mot de passe avec vérification en temps réel

### Design et Interface
- Interface moderne et responsive
- Animations fluides et retours visuels
- Icônes intuitives pour chaque champ
- Messages d'erreur et de succès stylisés
- Thème cohérent et professionnel

## Technologies Utilisées
- HTML5
- CSS3 (Flexbox, Animations)
- JavaScript (ES6+)
- Font Awesome (Icônes)

## Structure du Projet
```
Form Validation/
│
├── index.html      # Structure du formulaire
├── styles.css      # Styles et animations
└── script.js       # Logique de validation
```

## Installation et Utilisation
1. Clonez ce dépôt
2. Ouvrez `index.html` dans votre navigateur
3. Testez le formulaire avec différentes entrées :
   - Essayez d'entrer moins de 3 caractères dans le prénom/nom
   - Testez différents formats d'email
   - Observez l'indicateur de force du mot de passe
   - Vérifiez la correspondance des mots de passe

## Validation Implémentée
- **Prénom** : Minimum 3 caractères
- **Nom** : Minimum 3 caractères
- **Email** : Format valide et suggestions
- **Mot de passe** : Force minimale requise et confirmation