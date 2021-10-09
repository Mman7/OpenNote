import React from "react";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default function PopUp() {
  const Pop = (message) => {
    console.log(message);
    Swal.fire({
      title: message,
      text: "",
      icon: "error",
      confirmButtonText: "Okay",
    });
  };

  return [Pop];
}
