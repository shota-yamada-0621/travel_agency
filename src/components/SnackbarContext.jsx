import React, { createContext, useContext, useState, useCallback } from "react";
import Snackbar from "./Snackbar";

const SnackbarContext = createContext();

export const useSnackbar = () => useContext(SnackbarContext);

export const SnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("is-success");

  const showSnackbar = useCallback((msg, type = "is-success", duration = 2500) => {
    setMessage(msg);
    setType(type);
    setOpen(true);
    setTimeout(() => setOpen(false), duration);
  }, []);

  const handleClose = () => setOpen(false);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar open={open} message={message} type={type} onClose={handleClose} />
    </SnackbarContext.Provider>
  );
}; 