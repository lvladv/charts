import React, { useState } from "react";
import axios from "axios";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

import css from "./styles.module.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AddUser = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function addUser() {
    if (!!userName) {
      try {
        await axios({
          method: "POST",
          data: { name: userName },
          url: `https://api.artydev.ru/api/evergreen/new/`,
        });
        setSuccess(true);
      } catch (err) {
        console.log(err.response.data.data.text, "req");
        setError(err.response.data.data.text || "Возникла ошибка");
      }
    } else {
      setError("Для начала введите имя поьзователя");
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setError("");
    setSuccess(false);
  };

  function handleChange(e) {
    const { value } = e.target;
    setUserName(value);
    setError("");
  }

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div className={css.addUserWrapper}>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
          marginRight: "30px",
        }}
      >
        <TextField
          value={userName}
          onChange={handleChange}
          fullWidth
          label="Добавить пользователя для отслеживания"
          id="fullWidth"
        />
      </Box>
      <Button onClick={addUser} variant="contained" size="large">
        Добавить
      </Button>

      <Snackbar
        open={error || !!success}
        autoHideDuration={6000}
        onClose={handleClose}
        action={action}
        severity={error ? "error" : "success"}
        anchorOrigin={{ vertical: "top", horizontal: "" }}
      >
        <Alert
          onClose={handleClose}
          severity={error ? "error" : "success"}
          sx={{ width: "100%", maxWidth: "1150px" }}
        >
          {error ? error : "Пользователь успешно добавлен"}
        </Alert>
      </Snackbar>
    </div>
  );
};
