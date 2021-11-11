import Swal from "sweetalert2";
import axios from "axios";

const buttonDelete = document.querySelector("#eliminar-proyecto");

if (buttonDelete) {
  buttonDelete.addEventListener("click", (e) => {
    const projectUrl = e.target.dataset.projectUrl;
    const projectId = e.target.dataset.projectId;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        //Sending axios request
        const url = `${location.origin}/projects/${projectUrl}/${projectId}`;
        axios
          .delete(url, { params: { projectUrl, projectId } })
          .then((res) => {
            console.log(res);

            Swal.fire("Deleted!", res.data, "success");
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          })
          .catch(() => {
            Swal.fire({
              type: "error",
              title: "Oops, there was an error",
              text: "Your project couldn't be deleted",
            });
          });
      }
    });
  });
}
export default buttonDelete;
