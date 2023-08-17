const textButton = document.getElementById("add-task-btn");

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
  imgElement.classList.add("cursor-pointer");
  //console.log("check2");
  //console.log(imgElement);

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

//textbutton click function
textButton.addEventListener("click", function () {
  const textInput = document.getElementById("task-input");
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

    let tasksString = JSON.stringify(taskArray);
    //console.log(tasksString);

    localStorage.setItem("taskId", tasksString);
    console.log("stroaged");
    console.log(tempObj);
    elementPush("task", tempObj);
  } else {
    alert("Please write something");
  }
});

//Local Storage load function
window.onload = function () {
  let tasksString = localStorage.getItem("taskId");
  if (tasksString) {
    taskArray = JSON.parse(tasksString);
    for (let i = 0; i < taskArray.length; i++) {
      elementPush("task", taskArray[i]);
    }
    //var checklistDataId = 0;
    //Find all elements with class "checklistImgClass" and add click event listener
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
            taskArray[i].completed = true;
          }
        }
        let tasksString = JSON.stringify(taskArray);
        //console.log(tasksString);

        localStorage.setItem("taskId", tasksString);
      });
    });
  }
};

//     console.log();
//     for (let i = 0; i < taskArray.length; i++) {
//       if (taskArray[i].id == checklistDataId) {
//         taskArray[i].completed = true;
//       }
//       if (taskArray[i].completed == false) {
//         elementPush("task", taskArray[i]);
//       } else {
//         elementPush("task-completed", taskArray[i]);
//       }
//     }
//   }
// };
