const textButton = document.getElementById("add-task-btn");

var taskArray = [];

function elementPush(textInput) {
  console.log(textInput);
  let newDiv = document.createElement("div");
  let newH1 = document.createElement("h1");
  let imgElement = document.createElement("img");

  imgElement.src = "image/checklist.png";
  imgElement.alt = "Image description";

  newDiv.classList.add("flex");
  newDiv.classList.add("rounded-3xl");
  imgElement.classList.add("w-8");
  imgElement.classList.add("h-8");
  imgElement.classList.add("mt-[1px]");
  imgElement.classList.add("mr-2");
  newH1.className = " border-gray-400 rounded-sm text-xl text-white";

  newH1.innerText = textInput._value;
  console.log(textInput._value);
  newDiv.appendChild(imgElement);
  newDiv.appendChild(newH1);
  document.getElementById("task").appendChild(newDiv);
}

textButton.addEventListener("click", function () {
  const textInput = document.getElementById("task-input");
  //console.log(textInput.value.length);
  if (textInput.value.length > 0) {
    const taskValue = textInput.value;
    textInput.value = "";

    let tempObj = {
      id: Date.now(),
      _value: taskValue,
      completed: false,
    };

    taskArray.push(tempObj);

    console.log(taskArray);

    tasksString = JSON.stringify(taskArray);
    console.log(tasksString);

    localStorage.setItem("taskId", tasksString);
    console.log(tempObj);
    elementPush(tempObj);
  } else {
    alert("Please write something");
  }
});

window.onload = function () {
  let tasksString = localStorage.getItem("taskId");
  taskArray = JSON.parse(tasksString);
  console.log(taskArray);

  for (let i = 0; i < taskArray.length; i++) {
    elementPush(taskArray[i]);
  }
};
