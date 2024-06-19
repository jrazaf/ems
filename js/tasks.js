
// Affichage prenom

let divusr = document.getElementById('idusr');
let prenom = localStorage.getItem('monPrenom');
let html_string = '';
html_string += 'User : ' + prenom + '<br>';
// console.log(html_string)
divusr.innerHTML = html_string;


// Bouton Nouvelle tâche

const btnAjout = document.getElementById('btnnew');
btnAjout.addEventListener('click', function(event) {
    event.preventDefault();
    window.location.href = './ajout.html';

});

// Récupération des tâches

const apiUrl = 'http://localhost:3000/todos'; 
const dataTableBody = document.querySelector('#data-table tbody');

// Fonction pour récupérer les données de l'API
async function fetchData() {
    try {
        const response = await fetch(apiUrl);
        const dataj = await response.json();
        const data = await dataj[0].todolist;
        // console.log(dataj[0].todolist);
        populateTable(data);
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }
}

// Fonction pour remplir le tableau avec les données
function populateTable(data) {
    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.text}</td>
            <td>${new Date(item.created_at).toLocaleDateString()}</td>
            <td>${item.is_complete ? 'Terminé' : 'A faire'}</td>
            <td><a href="item.html?id=${item.id}" class="btn btn-primary">Voir les détails</a></td>
        `;
        dataTableBody.appendChild(row);
    });
}

// Appeler la fonction pour récupérer et afficher les données
fetchData();



