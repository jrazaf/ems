let divusr = document.getElementById('idajout');

let prenom = localStorage.getItem('monPrenom');
let html_string = '';
html_string += 'User : ' + prenom + '<br>';
console.log(html_string)
divusr.innerHTML = html_string;

const apiUrl = 'http://localhost:3000/todos'; 

const taskInput = document.getElementById('idtitre');
const tagsInput = document.getElementById('tags');
const btnAjout = document.getElementById('btnajout');

btnAjout.addEventListener('click', function(event) {

    event.preventDefault();
    const taskValue = taskInput.value;
    const tagsValue = tagsInput.value;
    console.log(taskValue);
    console.log(tagsValue);
    if (taskValue === "") {
        alert("Veuillez saisir un titre");
        taskInput.focus();
    }
    else {
        if (tagsValue === "") {
            alert("Veuillez saisir les tags ");
            tagsInput.focus();
        }
        else {
            createTask(taskValue, tagsValue);
            window.location.href = './tasks.html';
        }
    }

});

// Fonction pour créer une nouvelle tâche
async function createTask(taskTitle, tagsText) {
    try {
        // Corps de la requête avec les données de la nouvelle tâche
        const data = {
            text: taskTitle,
            Tags: tagsText.split(',').map(tag => tag.trim()),
            is_complete: false // ou true selon l'état initial de la tâche
        };
        
        // Appel à l'API pour créer la nouvelle tâche
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        // Vérification si la réponse est correcte
        if (!response.ok) {
            throw new Error('Erreur lors de la création de la tâche : ' + response.statusText);
        }
        
        // Conversion de la réponse en JSON
        const newTask = await response.json();
        
        // Affichage des détails de la nouvelle tâche dans la console
        console.log('Nouvelle tâche créée :', newTask);
        
        return newTask;

    } catch (error) {
        console.error('Erreur:', error);
    }
}
