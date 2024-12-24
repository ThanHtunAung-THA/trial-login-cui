import React, { useEffect } from "react";
import Swal from "sweetalert2";

/**
 * To show error and success message with SweetAlert style
 *
 * @param   {error} props => array of error messages
 * @param   {error2} props => array of secondary error messages
 * @param   {success} props => array of success messages
 * @returns SweetAlert pop-up with either error or success messages
 */
const SuccessError = ({ error = [], error2 = [], success = [] }) => {
  const errors = Array.from(new Set([...error, ...error2]));

  const showAlert = (type, messages) => {
    Swal.fire({
      title: type === "success" ? "Success" : "Error",
      html: messages.map((msg, index) => `<div key=${index} class="mb-4"> ${msg} </div>`).join(""),
      icon: "warning",
      padding: "3em",
      width: type === "success" ? 'fit-content' : "600px",
      color: type === "success" ? "#28a745" : "#dc3545",
      background: "#fff ",
      backdrop: type === "success" 
      ? `#279d3c45`
      : `#c5222245`,
      confirmButtonText: "Close",
    });
  };
  
  useEffect(() => {
    if (errors.length > 0) {
      showAlert("error", errors);
    } else if (success.length > 0) {
      showAlert("success", success);
    }
  }, [errors, success]);

  return null;
};

export default SuccessError;
