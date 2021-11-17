const $todoList = document.querySelector('.todoList');
const $todoInput = document.getElementById('todo_input');
const $createButton = document.getElementById('create_button');
const $todoNum = document.getElementById('todo_Num');
$createButton.addEventListener('click', handleClick);
init();

const $removeIconList = document.querySelectorAll('.remove.iconWrap');
for (const $removeIcon of $removeIconList) {
    $removeIcon.addEventListener('click', deleteTodo);
}

const $updateIconList = document.querySelectorAll('.update.iconWrap');
for (const $updateIcon of $updateIconList) {
    $updateIcon.addEventListener('click', updateTodo);
}

function init() {
    let todoData = JSON.parse(data);
    todoData.forEach((item) => addTodo(item.todo));
}

function handleClick(event) {
    addTodo($todoInput.value);
    $todoInput.value = '';
}

function addTodo(text) {
    const $li = document.createElement('li');

    const $descriptionSpan = document.createElement('span');
    $descriptionSpan.innerHTML = text;
    $descriptionSpan.className = 'description';

    $li.append($descriptionSpan);
    createIconWrap($li, 'update', 'fas fa-exchange-alt');
    createIconWrap($li, 'remove', 'fas fa-trash');

    $todoList.append($li);
    $todoNum.innerText = $todoList.children.length;
}

function createIconWrap(parent, feature, iconName) {
    const $IconWrap = document.createElement('span');
    $IconWrap.className = feature + ' ' + 'iconWrap';
    const $i = document.createElement('i');
    $i.className = iconName;
    $IconWrap.append($i);
    parent.append($IconWrap);
}

function deleteTodo(event) {
    const currentTarget = event.currentTarget;
    if (currentTarget.className === 'remove iconWrap') {
        const $todo = currentTarget.parentElement;
        $todoList.removeChild($todo);
        $todoNum.innerText = $todoList.children.length;
    }
}

function updateTodo(event) {
    const currentTarget = event.currentTarget;
    if (currentTarget.className === 'update iconWrap') {
        const $todo = currentTarget.parentElement;
        console.log($todo);
        if (hasUpdateInput($todo) === false) {
            const $updateInput = document.createElement('input');
            $updateInput.id = 'update_input';
            $todo.append($updateInput);
            $updateInput.addEventListener('keydown', updateTodoInput);
        }
    }
}

function hasUpdateInput($todo) {
    for (const $child of $todo.children) {
        if ($child.id === 'update_input') {
            return true;
        }
    }
    return false;
}

function updateTodoInput(event) {
    if (event.key === 'Enter') {
        const target = event.target;
        const $todo = target.parentElement;
        const $description = $todo.querySelector('.description');
        $description.innerText = target.value;
        $todo.removeChild(target);
    }
}
