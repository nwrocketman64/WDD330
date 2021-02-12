// Create the constants for the program.
const checkboxEmpty = "img/checkbox-empty.png";
const checkboxMarked = "img/checkbox.png";
const deleteButton = "img/xbutton.png";

// Create the object that will hold the list.
let list = [
    {
        id: "2021",
        content: "This is a task.",
        completed: false
    },
    {
        id: "2021",
        content: "This task is done.",
        completed: true
    }
];

// Create the variables that will store the DOM for the page.
let inputText = document.getElementById("main-text");
let pageList = document.getElementById("list");
let taskDisplay = document.getElementById("task");
let allButton = document.getElementById("all");
let activeButton = document.getElementById("active");
let completedButton = document.getElementById("completed");
const addButton = document.getElementById("add-button");

// Create the variable for the program.
let setting = 2; // 1 = Completed; 2 = All; 3 = Active;
 
// Add the needed events listeners.
// The evenlistener for the all button.
allButton.addEventListener("click", () => {
    setting = 2;
    printList();
    resetButtons();
    allButton.setAttribute("class", "selected");
}, false);

// The evenlistener for the active button.
activeButton.addEventListener("click", () => {
    setting = 3;
    printList();
    resetButtons();
    activeButton.setAttribute("class", "selected");
}, false);

// The evenlistener for the completed button.
completedButton.addEventListener("click", () => {
    setting = 1;
    printList();
    resetButtons();
    completedButton.setAttribute("class", "selected");
}, false);

// The evenlistener for the add button.
addButton.addEventListener("click", () => { addItem(); }, false);

// The function resets the list on the page.
function resetList(){
    pageList.innerHTML = "";
};

// The function prints the current list to the page.
function printList(){
    // First step is to clear the list on the page.
    resetList();
    
    // Create the counters.
    let totalTasks = 0;
    let completedCount = 0;

    // Next step is to loop through all the items in the list array.
    for (let i = 0; i < list.length; i++) {
        // Create the elements for the items.
        let item = document.createElement("div");
        let checkbox = document.createElement("img");
        let xbutton = document.createElement("img");
        let text = document.createElement("span");

        // If the task is finished.
        if (list[i].completed && setting <= 2) {
            // Set the source and alt for the delete button.
            xbutton.setAttribute("src", deleteButton);
            xbutton.setAttribute("alt", "Delete");
            xbutton.setAttribute("onclick", ("removeItem(" + i +")"));

            // Set the checkbox image.
            checkbox.setAttribute("src", checkboxMarked);
            checkbox.setAttribute("alt", "Done");
            checkbox.setAttribute("onclick", ("unmarkItem(" + i +")"));

            // Set the text.
            text.textContent = list[i].content;

            // Then append the elements to the item.
            item.appendChild(checkbox);
            item.appendChild(text);
            item.appendChild(xbutton);

            // Set the div container.
            item.setAttribute("class", "done-item");

            // Add to the task list counter.
            totalTasks = totalTasks + 1;
            
        } else if (list[i].completed != true && setting >= 2) {
            // If the task is not done.

            // Set the source and alt for the delete button.
            xbutton.setAttribute("src", deleteButton);
            xbutton.setAttribute("alt", "Delete");
            xbutton.setAttribute("onclick", ("removeItem(" + i +")"));
            
            // Set the checkbox image.
            checkbox.setAttribute("src", checkboxEmpty);
            checkbox.setAttribute("alt", "Todo");
            checkbox.setAttribute("onclick", ("markItem(" + i +")"));

            // Set the text.
            text.textContent = list[i].content;

            // Set the div contanter.
            item.setAttribute("class", "todo-item");

            // Then append the elements to the item.
            item.appendChild(checkbox);
            item.appendChild(text);
            item.appendChild(xbutton);

            // Add to the completedCount.
            completedCount = completedCount + 1;

            // Add to the task list counter.
            totalTasks = totalTasks + 1;
        };

        // Then append the item to the list.
        pageList.appendChild(item);
    };

    // If there are no tasks to display, then display a message.
    if (totalTasks == 0) {
        let message = document.createElement("div");
        message.setAttribute("class", "message");
        message.textContent = "No tasks to display.";
        pageList.appendChild(message);
    }

    // Update the counter on the screen.
    taskDisplay.textContent = completedCount + " tasks left";
};

// The function resets all the buttons on screen.
function resetButtons() {
    allButton.setAttribute("class", "");
    activeButton.setAttribute("class", "");
    completedButton.setAttribute("class", "");
};

// The function marks an item.
function markItem(item) {
    // First check off the item.
    list[item].completed = true;

    // Then reprint the screen.
    printList();
    
    // Then save the list.
    saveList(list);
};

// The function marks an item.
function unmarkItem(item) {
    // First check off the item.
    list[item].completed = false;

    // Then reprint the screen.
    printList();
    
    // Then save the list.
    saveList(list);
};

// The function removes the item.
function removeItem(item){
    // Remove the item from the list.
    list.splice(item, 1);

    // Display the list.
    printList();

    // Save the list.
    saveList(list);
};

// The function adds an item.
function addItem(){
    // Check to see if there is a value in the input textbox.
    if (inputText.value == ""){
        // If so, exit the function.
        return;
    }

    // If there is an input, add it to the list.
    // Create a date object.
    let timeStamp = new Date();

    // Make a new task object.
    let newTask = {id: timeStamp, content: inputText.value, completed: false};

    // Append the object to the array.
    list.push(newTask);

    // Print the list again.
    printList();

    // Remove the text from the textbox.
    inputText.value = "";

    // Save the list to local storage.
    saveList(list);
};

// The function loads the list from local storage.
function loadList(){
    let list = [];
    // Load the item from localStorage.
    let newList = localStorage.getItem("list");

    // Check to see if the item returned null
    if (newList == null || newList == undefined){
        // If it did, save a new list.
        saveList();
        return list;
    } else {
        // If it didn't, parse the JSON string and save it to list.
        list = JSON.parse(newList);
        return list;
    }
};

// The function saves the list to local storage.
function saveList(list){
    // Give the key value of "list" and save it as a JSON string.
    localStorage.setItem("list", JSON.stringify(list));
};

// This function starts when the page loads.
window.addEventListener('load', (event)=>{
    // Load the list.
    list = loadList();
    
    // Set the allButton to on.
    allButton.setAttribute("class", "selected");

    // Print the list
    printList();
});