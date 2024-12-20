const mainTodoElem = document.querySelector(".todo-list-elem");
const inputValue = document.getElementById("inputValue");

const getTodoList = () => {
    // get original format array use json parse
    return JSON.parse(localStorage.getItem('todoListApp'));
};

const updateTodoLocalStorage = (localTodoList) => {
    return localStorage.setItem("todoListApp", JSON.stringify(localTodoList));
};

// if gettodolist not have value than empty array
let localTodoList = getTodoList() || [];

const addTodoDynamicElement = (currElem) => {
    const divElem = document.createElement("div");
    divElem.classList.add("main_todo_div");
    divElem.innerHTML = `<li>${currElem}</li> <button class="deleteBtn">Delete</button>`;
    mainTodoElem.append(divElem);
}

const addTodoList = (e) => {
    e.preventDefault();
    // console.log(inputValue.value);
    // console.log(e);

    // Get the trimmed value from the input field
    const todoListValue = inputValue.value.trim().toLowerCase();
    inputValue.value = "";
    // check input value already or not
    if (todoListValue != "" && !localTodoList.includes(todoListValue)) {
        // Add the value to the localTodoList array
        localTodoList.push(todoListValue);

        // Ensure unique values in the todo list
        // Using `new Set()` removes duplicates because a Set only stores unique values
        // Initially, the array can take duplicates, but we need to convert it to a Set for uniqueness
        // Note: Converting the Set directly back to an array using spread operator
        // makes it easier to maintain a simple array structure

        // localTodoList = new Set(todoListValue);
        // localTodoList = [new Set(todoListValue)];
        localTodoList = [...new Set(localTodoList)];
        console.log(localTodoList);
        // only string accept local storage
        localStorage.setItem('todoListApp', JSON.stringify(localTodoList));
        addTodoDynamicElement(todoListValue);
    };
};

const showTodoList = () => {
    console.log(localTodoList);
    localTodoList.forEach((currElem) => {
        addTodoDynamicElement(currElem);
    });
};

showTodoList();

const removeTodoElem = (e) => {
    const todoRemove = e.target;
    let todoListContent = todoRemove.previousElementSibling.innerText;
    // console.log(todoRemove);
    parentElem = todoRemove.parentElement;

    localTodoList = localTodoList.filter((currTodo) => {
        // console.log(currTodo);
        // console.log(todoListContent);
        return currTodo != todoListContent.toLowerCase();
    });
    updateTodoLocalStorage(localTodoList);
    parentElem.remove();
    // console.log(localTodoList);
};

mainTodoElem.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log(e.target.classList.contains("deleteBtn"));
    if (e.target.classList.contains("deleteBtn")) {
        removeTodoElem(e);
    };
});

document.querySelector(".btn").addEventListener("click", (e) => {
    addTodoList(e);
});