var taskArray = [];

//Element Push Function
function elementPush(functionClass, textInput) {
  let newDiv = document.createElement("div");
  let newH1 = document.createElement("h1");
  let imgElement = document.createElement("img");

  imgElement.src = "image/checklist.png";
  imgElement.alt = "Image description";
  imgElement.setAttribute("data-id", textInput.id);
  imgElement.classList.add("checklistImgClass");
  console.log("check2");
  console.log(imgElement);

  newDiv.classList.add("flex");
  newDiv.classList.add("rounded-3xl");
  imgElement.classList.add("w-8");
  imgElement.classList.add("h-8");
  imgElement.classList.add("mt-[1px]");
  imgElement.classList.add("mr-2");
  newH1.className = " border-gray-400 rounded-sm text-xl text-white";

  newH1.innerText = textInput._value;
  newDiv.appendChild(imgElement);
  newDiv.appendChild(newH1);
  document.getElementById(functionClass).appendChild(newDiv);
}

//Local Storage load function
window.onload = function () {
  let tasksString = localStorage.getItem("taskId");
  if (tasksString) {
    taskArray = JSON.parse(tasksString);
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].completed == true) {
        elementPush("task-completed", taskArray[i]);
        console.log(taskArray[i]);
      }
    }
  }
};
