const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDoList");


const TODOS_LS = 'toDos';
let toDos = [];

 
function deleteToDo(event) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id); // toDos의 id가 (이 함수에서 만든, 삭제 버튼이 눌린) li의 id가 아닐 때만 filter 되어서 cleanToDos에 저장됨.
    });
    toDos = cleanToDos; // 바뀐 toDos 목록을 toDos에 넣어줌. 이 때 toDos가 const 형태면 실행이 안 된다.
    saveToDos(); // 그리고 문자열 형태로 저장
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
    // 브라우저의 로컬스토리지에는 데이터를 문자열로만 저장함. 그래서 Object 파일을 제대로 넣지 못 함.
    // 헤결 -> JSON.stringify()는 JS의 object를 string으로 바꿔줌! 
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    delBtn.innerHTML = "❌";
    delBtn.addEventListener("click", deleteToDo)

    span.innerText = text;

    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);

    const toDoObj = {
        text: text,
        id: newId
    }

    toDos.push(toDoObj);
    saveToDos();

}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function(toDo){ // 안에 toDo 들어가는 것은 무슨 의미일까?
            // function 안 인자, 'toDo'는 forEach를 수행하는 객체 자체를 뜻함. console.log(toDo);를 해보면 알 수 있음.
            paintToDo(toDo.text);
        })
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();