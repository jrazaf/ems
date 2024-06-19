// Affichage prénom
let divusr = document.getElementById('iditem');
let titleTask = document.getElementById('title-task');
let prenom = localStorage.getItem('monPrenom');
let html_string = '';
html_string += 'User : ' + prenom + '<br>';
console.log(html_string)
divusr.innerHTML = html_string;

// URL de base de l'API 

const apiUrl = 'http://localhost:3000/todos'; 
const dataTableBody = document.querySelector('#data-table tbody');

// Récupérer l'URL actuelle et Obtenir la valeur du paramètre 'taskId'

const urlParams = new URLSearchParams(window.location.search);
const urlId = urlParams.get('id');

// Fonction pour obtenir les détails d'une tâche par ID

async function getTaskById(taskId) {
    try {
        // Création de l'URL complète avec l'ID de la tâche
        const taskUrl = `${apiUrl}/${taskId}`;
        console.log('URL api ;',taskUrl);
        
        // Appel à l'API pour obtenir les détails de la tâche
        const response = await fetch(taskUrl);
        const dataj = await response.json();
        console.log(dataj);

        console.log('Titre tâche :',dataj.text);
        titleTask.innerHTML = dataj.text;

        const rowtitre = document.createElement('tr');
        rowtitre.innerHTML = `
            <td>Titre :</td>
            <td>${dataj.text}</td>
        `;
        dataTableBody.appendChild(rowtitre);
        
        let statutTask = `${dataj.is_complete ? 'Terminé' : 'A faire'}`;
        console.log('Etat tâche :',statutTask);

        const rowetat = document.createElement('tr');
        rowetat.innerHTML = `
            <td>Etat :</td>
            <td>${statutTask}</td>
        `;
        dataTableBody.appendChild(rowetat);
        
        const options = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false // Utiliser un format 24 heures
        };

        let dateTask = `${new Date(dataj.created_at).toLocaleDateString('fr-FR', options)}`;
        console.log('Date tâche :',dateTask);

        const rowdate = document.createElement('tr');
        rowdate.innerHTML = `
            <td>Date :</td>
            <td>${dateTask}</td>
        `;
        dataTableBody.appendChild(rowdate);

        console.log('Tags : ',dataj.Tags[0],',',dataj.Tags[1]);

        const rowtags = document.createElement('tr');
        rowtags.innerHTML = `
            <td>Tags :</td>
            <td>${dataj.Tags[0] + ', ' + dataj.Tags[1]}</td>
        `;
        dataTableBody.appendChild(rowtags);
        
        const rowbtn = document.createElement('tr');
        rowbtn.innerHTML = `
            <td>${dataj.is_complete ? `<button id="btnouv" class="btn btn-primary" type="submit">Ré-ouvrir tâche</button>` : `<button id="btnend" class="btn btn-primary" type="submit">Terminer tâche</button>`}</td>
            <td> <button id="btndel" class="btn btn-primary" type="submit"> Supprimer tâche </button> </td>
        `;
        dataTableBody.appendChild(rowbtn);

        const btnDel = document.getElementById('btndel');
        btnDel.addEventListener('click', function(event) {
            event.preventDefault();
            deleteTask(urlId);
            window.location.href = './tasks.html';
        });

        if (statutTask === 'Terminé') {
            const btnOuv = document.getElementById('btnouv');
            btnOuv.addEventListener('click', function(event) {
                event.preventDefault();
                updateTaskStatus(urlId, false);
                window.location.href = './tasks.html';
            });
        }
        else {
            const btnEnd = document.getElementById('btnend');
            btnEnd.addEventListener('click', function(event) {
                event.preventDefault();
                updateTaskStatus(urlId, true);
                window.location.href = './tasks.html';
            });
        }

        return true;

    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Vérifier si l'ID de la tâche est présent et Appeler la fonction pour obtenir les détails de la tâche
if (urlId) {
    console.log('taskid :',urlId);
    getTaskById(urlId);
} else {
    console.error('Le paramètre "taskId" est manquant dans l\'URL');
}

// Appel de l'API pour modifier l'état de la tâche

async function updateTaskStatus(taskId, newStatus) {
    try {
        const taskUrl = `${apiUrl}/${taskId}`;
        const data = { is_complete: newStatus };
        
        const response = await fetch(taskUrl, {
            method: 'PUT', 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la mise à jour de la tâche : ' + response.statusText);
        }
        
        const updatedTask = await response.json();
        console.log('Tâche mise à jour :', updatedTask);
        return updatedTask;
    } catch (error) {
        console.error('Erreur:', error);
    }
}

// Appel de l'API pour supprimer la tâche

async function deleteTask(taskId) {
    try {
        const taskUrl = `${apiUrl}/${taskId}`;
        
        const response = await fetch(taskUrl, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression de la tâche : ' + response.statusText);
        }
        
        console.log('Tâche supprimée ');
        return true;

    } catch (error) {
        console.error('Erreur:', error);
    }
}


