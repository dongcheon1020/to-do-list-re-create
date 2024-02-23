let taskInput = document.querySelector(".task-input");
let taskList = [];
let dateInput = document.getElementById("date-input");
let dateLabel = document.querySelector(".date-label");
let addBt = document.querySelector(".add-bt");
let deleteBt = document.querySelector(".delete");
let taskAreaBt = document.querySelectorAll(".task-area-bt");
let mode = "all";
let filterList = [];

taskAreaBt.forEach((item) => {
  item.addEventListener("click", () => {
    filter(item);

    item.classList.add("active");
    taskAreaBt.forEach((i) => {
      if (item !== i) {
        i.classList.remove("active");
      }
    });
  });
});

addBt.addEventListener("click", addTask);

dateInput.addEventListener("blur", () => {
  if (!dateInput.value) {
    dateLabel.textContent = "날짜 선택";
  } else {
    dateLabel.textContent = dateInput.value;
  }
});

taskInput.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    addTask();
  }
});

// 리스트 아이템에 들어갈 내용 쓰고 enter하면 값 전달
function addTask() {
  if (dateInput.value == "" || taskInput.value == "") {
    return alert("할 일 또는 날짜가 비어있습니다.");
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    taskContentDate: dateInput.value,
    taskEnd: false,
  };

  taskList.push(task);
  taskInput.value = "";
  dateInput.value = "";
  dateLabel.textContent = "날짜 선택";
  console.log(taskList);
  render();
}

// html에 리스트 아이템 추가 함수
function render() {
  let list = [];
  let resultHTML = "";
  if (mode == "all") {
    list = taskList;
  } else if (mode == "ongoing" || mode == "done") {
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].taskEnd == true) {
      resultHTML += `
    <section class="list-item list-done">
    <button onclick="checkTask('${list[i].id}')" class="check">            
    <img src="circle.svg" alt="check on bt" />
    </button>
    <div class="item-texts">
      <span class="item-text">${list[i].taskContent}</span>
      <span class="item-date">${list[i].taskContentDate} 까지</span>
    </div>
    <button onclick="deleteTask('${list[i].id}')" class="delete">            <span>Delete</span>
    </button>
  </section>
    `;
    } else {
      resultHTML += `
        <section class="list-item">
        <button onclick="checkTask('${list[i].id}')" class="check">
        <img src="Vector.svg" alt="check bt" />
        </button>
        <div class="item-texts">
          <span class="item-text">${list[i].taskContent}</span>
          <span class="item-date">${list[i].taskContentDate} 까지</span>
        </div>
        <button onclick="deleteTask('${list[i].id}')" class="delete">            <span>Delete</span>
        </button>
      </section>
        `;
    }
  }
  document.querySelector(".list").innerHTML = resultHTML;
}

// filter
const filter = (item) => {
  filterList = [];
  if (item) {
    mode = item.id;
  }

  if (mode == "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].taskEnd === false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode == "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].taskEnd === true) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
};

function checkTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].taskEnd = !taskList[i].taskEnd;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter();
}

// 랜덤 아이디 생성 함수
function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// addbtEvent
let addBoxOn = false;
let addListBt = document.querySelector(".plus-list-item");
let headerCenter = document.querySelector("header");
let headerCenterHeight = headerCenter.offsetHeight;
let inputContainerHeight =
  document.querySelector(".input-cotainer").offsetHeight;

console.log(headerCenterHeight);
addListBt.addEventListener("click", () => {
  addBoxOn = !addBoxOn;
  addBoxOnheight(addBoxOn);
});
const addBoxOnheight = (b) => {
  if (b == false) {
    headerCenter.style = `height: ${headerCenterHeight}px`;
    addListBt.style = "  transform: rotate(0deg)";
  } else {
    headerCenter.style = `height: ${
      headerCenterHeight + inputContainerHeight
    }px`;
    addListBt.style = "  transform: rotate(45deg)";
  }
};
