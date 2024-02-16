let taskInput = document.querySelector(".task-input");
let taskList = [];

taskInput.addEventListener("blur", addTask);
taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addTask();
  }
});

function addTask() {
  let task = taskInput.value;
  let task1 = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
  };
  taskList.push(task);
  render();
}

function render() {
  let resultHTML = "";

  for (let i = 0; i < taskList.length; i++) {
    resultHTML += `
    <section class="list-item">
    <button class="check">0</button>
    <div class="item-texts">
      <span class="item-text">ㅇㄴㄹㄴㄹㄴㅁㄹㄴㅁㄹㄴㅁㄹ</span>
      <span class="item-date">2024년 10월 22일</span>
    </div>
    <button class="delete">X</button>
  </section>
    `;
  }
  document.querySelector(".list").innerHTML = resultHTML;
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}
