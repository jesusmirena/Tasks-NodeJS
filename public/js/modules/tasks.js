const tasks = document.querySelector(".listado-pendientes");

if (tasks) {
  tasks.addEventListener("click", (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
      const icon = e.target;
      const taskId = icon.parentElement.parentElement.dataset.task;
      console.log(taskId);
    }
  });
}

export default tasks;
