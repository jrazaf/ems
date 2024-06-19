
// Affichage prénom

let divusr = document.getElementById('divstat');
let prenom = localStorage.getItem('monPrenom');
let html_string = '';
html_string += 'User : ' + prenom + '<br>';
// console.log(html_string)
divusr.innerHTML = html_string;

// URL API

const apiUrl = 'http://localhost:3000/todos'; 
const dataTableBody = document.querySelector('#data-table tbody');

// Fonction pour obtenir et compter les tâches 

async function countTasks() {
    try {
        const response = await fetch(apiUrl);
        const dataj = await response.json();
        const data = await dataj[0].todolist;
        // console.log(dataj[0].todolist);

        const taskCount = data.length;
    
        // console.log('Nombre de tâches :', taskCount);

        // Filtrer les tâches pour obtenir seulement celles qui sont terminées
        const completedTasks = data.filter(task => task.is_complete);
    
        // Comptage du nombre de tâches terminées
        const taskCompleted = completedTasks.length;
        
        // Affichage du nombre de tâches terminées dans la console
        // console.log('Nombre de tâches terminées :', taskCompleted);

        // Comptage du nombre de tâches à faire
        const taskEnCours = taskCount - taskCompleted;

        // Affichage du nombre de tâches à faire dans la console
        // console.log('Nombre de tâches à faire :', taskEnCours);

        // Remplissage de la row
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${taskCount}</td>
            <td>${taskEnCours}</td>
            <td>${taskCompleted}</td>
        `;
        dataTableBody.appendChild(row);

        return taskCount;
        
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
    }

}


// Appel de la fonction
countTasks();



