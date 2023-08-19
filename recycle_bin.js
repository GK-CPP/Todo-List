var taskArray = [];

//Element Push Function
function elementPush(functionClass, textInput) {
  let newDiv = document.createElement("div");
  let newDivLeft = document.createElement("div");
  let newDivRight = document.createElement("div");

  let newH1 = document.createElement("h1");
  let imgElementDelete = document.createElement("img");
  let imgElementReload = document.createElement("img");

  imgElementDelete.src = "image/recycle-bin.png";
  imgElementDelete.alt = "Image description";
  imgElementDelete.setAttribute("data-id-delete", textInput.id);
  imgElementDelete.classList.add("recycleImgClass");
  imgElementDelete.classList.add("w-8");
  imgElementDelete.classList.add("h-8");
  imgElementDelete.classList.add("mt-[1px]");
  imgElementDelete.classList.add("mr-2");
  imgElementDelete.classList.add("cursor-pointer");
  imgElementDelete.setAttribute("onclick", `permanentDelete(${textInput.id})`);

  imgElementReload.src = "image/reload.png";
  imgElementReload.alt = "Image description";
  imgElementReload.setAttribute("data-id-reload", textInput.id);
  imgElementReload.classList.add("recycleImgClass");
  imgElementReload.classList.add("w-8");
  imgElementReload.classList.add("h-8");
  imgElementReload.classList.add("mt-[1px]");
  imgElementReload.classList.add("mr-2");
  imgElementReload.classList.add("cursor-pointer");
  imgElementReload.setAttribute("onclick", `reload(${textInput.id})`);

  newDiv.id = textInput.id;
  newDiv.classList.add("flex");
  newDiv.classList.add("rounded-3xl");
  newDiv.classList.add("justify-between");

  newDivLeft.classList.add("flex");
  newDivRight.classList.add("flex");

  newH1.className = "border-gray-400 rounded-sm text-xl text-white";

  newH1.innerText = textInput._value;
  newDivLeft.appendChild(imgElementDelete);
  newDivLeft.appendChild(newH1);
  newDivRight.appendChild(imgElementReload);

  newDiv.appendChild(newDivLeft);
  newDiv.appendChild(newDivRight);
  document.getElementById(functionClass).appendChild(newDiv);
}

//Local Storage permanent delete function

const permanentDelete = (id) => {
  const _div = document.getElementById(id);
  console.log(_div);
  _div.remove();
  let tasksString = localStorage.getItem("taskId");
  taskArray = JSON.parse(tasksString);
  taskArray = taskArray.filter((taskArrayId) => taskArrayId.id != id);
  localStorage.setItem("taskId", JSON.stringify(taskArray));
};

//Local Storage reload function
const reload = (id) => {
  const _div = document.getElementById(id);
  console.log(_div);
  _div.remove();
  let tasksString = localStorage.getItem("taskId");
  taskArray = JSON.parse(tasksString);
  //taskArray = taskArray.filter((taskArrayId) => taskArrayId.id != id);
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id == id) {
      taskArray[i].completed = 0;
    }
  }
  localStorage.setItem("taskId", JSON.stringify(taskArray));
};

//Local Storage load function
window.onload = function () {
  let tasksString = localStorage.getItem("taskId");
  if (tasksString) {
    taskArray = JSON.parse(tasksString);
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].completed == -1) {
        elementPush("task-incompleted", taskArray[i]);
        console.log(taskArray[i]);
      }
    }
  }
};
