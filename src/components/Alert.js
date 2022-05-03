import React, { useEffect } from "react";

const Alert = ({ type, msg, removeAlert, list }) => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);
  return (
    <div>
      <p className={`alert alert-${type}`}>{msg}</p>
    </div>
  );
};

export default Alert;
