import Swal from "sweetalert2";
import axios from "axios";

const buttonDelete = document.querySelector("#eliminar-proyecto");

buttonDelete.addEventListener("click", () => {
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
      Swal.fire("Deleted!", "Your file has been deleted.", "success");
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  });
});
