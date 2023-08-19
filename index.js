const textButton = document.getElementById("add-task-btn");

var taskArray = [];

var editFlag = 0;
var editGlobalId = 0;

const initiateCompleted = () => {
  const checklistImg = document.querySelectorAll(".checklistImgClass");
  console.log("check-1");
  console.log(checklistImg);

  checklistImg.forEach(function (element) {
    element.addEventListener("click", function (event) {
      console.log(event.target);
      var checklistElement = event.target;
      checklistDataId = checklistElement.getAttribute("data-id");
      console.log("check-2");
      console.log(checklistDataId);
      console.log(taskArray[0].id);

      for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id == checklistDataId) {
          taskArray[i].completed = 1;
          let _div = document.getElementById(taskArray[i].id);
          console.log(_div);
          if (_div != null) _div.remove();
        }
      }
      let tasksString = JSON.stringify(taskArray);
      //console.log(tasksString);

      localStorage.setItem("taskId", tasksString);
    });
  });
};

//Element Push Function
function elementPush(functionClass, textInput) {
  let newDiv = document.createElement("div");
  let newDivLeft = document.createElement("div");
  let newDivRight = document.createElement("div");

  let newH1 = document.createElement("h1");

  let imgElement = document.createElement("img");
  let imgElementDelete = document.createElement("img");
  let imgElementEdit = document.createElement("img");

  imgElement.src = "image/checklist.png";
  imgElement.alt = "Image description";
  imgElement.setAttribute("data-id", textInput.id);
  imgElement.classList.add("checklistImgClass");
  imgElement.classList.add("cursor-pointer");

  imgElement.classList.add("w-8");
  imgElement.classList.add("h-8");
  imgElement.classList.add("mt-[1px]");
  imgElement.classList.add("mr-2");
  //console.log("check2");
  //console.log(imgElement);
  imgElementDelete.src = "image/delete.png";
  imgElementDelete.alt = "Image description delete";
  imgElementDelete.setAttribute("data-id-delete", textInput.id);
  imgElementDelete.classList.add("checklistImgDelete");
  imgElementDelete.classList.add("cursor-pointer");
  imgElementDelete.classList.add("w-8");
  imgElementDelete.classList.add("h-8");
  imgElementDelete.classList.add("mt-[1px]");
  imgElementDelete.classList.add("mr-2");
  imgElementDelete.setAttribute("onclick", `deleteTask(${textInput.id})`);

  imgElementEdit.src = "image/edit.png";
  imgElementEdit.alt = "Image description edit";
  imgElementEdit.setAttribute("data-id-edit", textInput.id);
  imgElementEdit.classList.add("checklistImgEdit");
  imgElementEdit.classList.add("cursor-pointer");
  imgElementEdit.classList.add("w-8");
  imgElementEdit.classList.add("h-8");
  imgElementEdit.classList.add("mt-[1px]");
  imgElementEdit.classList.add("mr-2");
  imgElementEdit.setAttribute("onclick", `editTask(${textInput.id})`);

  newDiv.classList.add("flex");
  newDiv.classList.add("rounded-3xl");
  newDiv.classList.add("justify-between");

  // apply id to the div
  newDiv.id = textInput.id;

  newDivLeft.classList.add("flex");

  newDivRight.classList.add("flex");

  newH1.className = " border-gray-400 rounded-sm text-xl text-white";

  newH1.innerText = textInput._value;
  newDivLeft.appendChild(imgElement);
  newDivLeft.appendChild(newH1);
  newDivRight.appendChild(imgElementEdit);
  newDivRight.appendChild(imgElementDelete);

  newDiv.appendChild(newDivLeft);
  newDiv.appendChild(newDivRight);
  document.getElementById(functionClass).appendChild(newDiv);

  initiateCompleted();
}

//textbutton click function
textButton.addEventListener("click", function () {
  const textInput = document.getElementById("task-input");
  if (editFlag == 1) {
    if (textInput.value.length > 0) {
      const taskValue = textInput.value;
      editFlag = 0;
      passID_fun();
    }
  } else {
    if (textInput.value.length > 0) {
      const taskValue = textInput.value;
      textInput.value = "";

      let tempObj = {
        id: Date.now(),
        _value: taskValue,
        completed: 0,
      };

      taskArray.push(tempObj);

      console.log(taskArray);

      let tasksString = JSON.stringify(taskArray);
      //console.log(tasksString);

      localStorage.setItem("taskId", tasksString);
      console.log("stroaged");
      console.log(tempObj);
      elementPush("task", tempObj);
    } else {
      alert("Please write something");
    }
  }
});

//for delete task

const deleteTask = (id) => {
  const _div = document.getElementById(id);
  console.log(_div);
  _div.remove();
  let tasksString = localStorage.getItem("taskId");
  taskArray = JSON.parse(tasksString);
  //taskArray = taskArray.filter((taskArrayId) => taskArrayId.id != id);
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == id) {
      taskArray[i].completed = -1;
    }
  }
  localStorage.setItem("taskId", JSON.stringify(taskArray));
};

//for edit task

const editTask = (id) => {
  editGlobalId = id;
  editFlag = 1;
  const _div = document.getElementById(id);
  let newText = _div.children[0].children[1].innerText;
  console.log("task-edit1", _div.children[0].children[1].innerHTML);
  const textInput = document.getElementById("task-input");
  textInput.value = newText;
};

const passID_fun = () => {
  const _div = document.getElementById(editGlobalId);
  const textInput = document.getElementById("task-input");
  _div.children[0].children[1].innerText = textInput.value;

  console.log("task-edit2", textInput.value);
  let tasksString = localStorage.getItem("taskId");
  taskArray = JSON.parse(tasksString);

  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == editGlobalId) {
      taskArray[i]._value = textInput.value;
    }
  }
  localStorage.setItem("taskId", JSON.stringify(taskArray));
  textInput.value = "";
  //console.log("task-edit", _div.children[0].children[1].innerHTML);
};

//Local Storage load function
window.onload = function () {
  let tasksString = localStorage.getItem("taskId");
  if (tasksString) {
    taskArray = JSON.parse(tasksString);
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].completed == 0) {
        //console.log("task-33", taskArray[i].completed);
        elementPush("task", taskArray[i]);
      }
    }
    //var checklistDataId = 0;
    //Find all elements with class "checklistImgClass" and add click event listener
    initiateCompleted();
  }
};
