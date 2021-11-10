import axios from "axios";

const tasks = document.querySelector(".listado-pendientes");

if (tasks) {
  tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icon = e.target;
      const taskId = icon.parentElement.parentElement.dataset.task;
      const url = `${location.origin}/tasks/${taskId}`;

      axios.patch(url, { taskId }).then((response) => console.log(response));
    }
  });
}

export default tasks;
