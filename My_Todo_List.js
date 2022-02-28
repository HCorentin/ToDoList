let taskInput = document.getElementById("new-task"); //input Ajouter une tâche
let addButton = document.getElementsByTagName("button")[0]; //Selection du premier bouton
let incompleteTasksHolder = document.getElementById("incomplete-tasks"); //ul A faire
let completedTasksHolder = document.getElementById("completed-tasks"); //ul Finie

//Créer une nouvelle tâche
let createNewTaskElement = function (taskString) {
    let listItem = document.createElement("li");
    let checkBox = document.createElement("input");
    let label = document.createElement("label");
    let editInput = document.createElement("input");
    let editButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    //Lorsqu'on ajoute une nouvelle tâche, on lui ajoute une case à cocher et des boutons edit et delete
    checkBox.type = "checkBox";
    editInput.type = "text";

    editButton.innerText = "Edit";
    editButton.className = "edit";
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    label.innerText = taskString; //ici on "transforme" ce qui est écrit par l'utilisateur en label

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    listItem.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

//Ajouter une nouvelle tâche
let addTask = function () {
    let listItem = createNewTaskElement(taskInput.value); //on récupère ce qui est écrit par l'utilisateur dans l'input

    incompleteTasksHolder.appendChild(listItem); //on ajoute un "li" à l'"ul" "A faire"
    bindTaskEvents(listItem, taskCompleted);
    taskInput.value = "";
}

//éditer une tâche
let editTask = function () {

    let listItem = this.parentNode;

    let editInput = listItem.querySelector("input[type=text]");
    let label = listItem.querySelector("label");

    let containsClass = listItem.classList.contains("editMode");

    //si la class de l'élément parent est ".editMode"
    if (containsClass) {
        label.innerText = editInput.value;
    }else {
        editInput.value = label.innerText;
    }
    listItem.classList.toggle("editMode");
}

//Supprimer une tâche
let deleteTask = function () {

    let listItem = this.parentNode;
    let ul = listItem.parentNode;

    ul.removeChild(listItem);
}

//Marquer une tâche comme complétée
let taskCompleted = function() {

    //Quand la case est cochée on ajoute la tâche à l'"ul" "Finie"
    let listItem = this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}

//Marquer une tâche comme incomplète
let taskIncomplete = function() {

    //Quand la case est cochée on ajoute la tâche à l'"ul" "A faire"
    let listItem = this.parentNode;
    incompleteTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);
}

//Ici on lie la fonction addTask au click sur le bouton "Ajouter"
addButton.addEventListener("click", addTask);

let bindTaskEvents = function(taskListItem, checkBoxEventHandler) {

    // on sélectionne les éléments de la/des tâche(s)
    let checkBox = taskListItem.querySelector('input[type="checkbox"]');
    let editButton = taskListItem.querySelector("button.edit");
    let deleteButton = taskListItem.querySelector("button.delete");
    //on lie la fonction editTask (éditer une tâche) au bouton edit
    editButton.onclick = editTask;
    //on lie la fonction deleteTask (supprimer une tâche) au bouton delete
    deleteButton.onclick = deleteTask;
    //on lie le paramètre "checkBoxEventHandler" au changement de statut de la checkbox
    checkBox.onchange = checkBoxEventHandler;
}
