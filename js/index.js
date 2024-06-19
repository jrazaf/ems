
const btn = document.getElementById('btnList');

// Bouton liste des tâches
btn.addEventListener("click", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();

    // On fait la vérification de la saisie du prénom
    let balisePrenom = document.getElementById('prenom');
    const valeurPrenom = balisePrenom.value;
    if (valeurPrenom === "") {
        console.log('Le champ prénom est vide');
        localStorage.setItem("monPrenom", valeurPrenom);
        alert("Veuillez saisir le prénom SVP");
        balisePrenom.focus();
    } else {
        localStorage.setItem("monPrenom", valeurPrenom);
        window.location.href = './tasks.html';
    }
});


