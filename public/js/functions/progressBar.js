import Swal from "sweetalert2";

export const updateProgress = () => {
  //Selecting the existing tasks
  const tasks = document.querySelectorAll("li.tarea");

  if (tasks.length) {
    //Selecting the completed tasks
    const completedTasks = document.querySelectorAll("i.completo");

    //Calculating the progress
    const progress = Math.round((completedTasks.length / tasks.length) * 100);

    //Showing the progress
    const percentage = document.querySelector("#porcentaje");
    percentage.style.width = progress + "%";

    if (progress === 100) {
      Swal.fire(
        "You have completed your project",
        "Congratulations, you have finished your tasks",
        "success"
      );
    }
  }
};
