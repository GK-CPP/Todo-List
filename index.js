const textButton = document.getElementById("add-task-btn");

var taskArray = [];

function elementPush(textInput) {
  console.log(textInput);
  let newDiv = document.createElement("div");
  let newH1 = document.createElement("h1");

  newDiv.classList.add("flex");
  newDiv.classList.add("flex-col");
  newDiv.classList.add("rounded-3xl");

  newH1.className = "border-2 border-solid border-gray-400 text-white";
  newH1.innerText = textInput._value;
  console.log(textInput._value);
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
