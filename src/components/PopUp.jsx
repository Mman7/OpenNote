import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default function PopUp(message) {
  Swal.fire({
    title: message,
    text: "",
    icon: "error",
    confirmButtonText: "Okay",
  });
}

export function PopCheck(message) {
  Swal.fire({
    title: message,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
}
