import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Category } from "src/types";
import NewTaskForm from "src/screens/Tasks/components/NewTaskForm";
import { Button, DialogActions } from "@mui/material";
import { useRef } from "react";
import { FormikProps, FormikValues } from "formik";

interface Props {
  opened: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Array<Category>;
}

const Modal = ({ opened, setOpen, categories }: Props) => {
  const handleClose = () => {
    setOpen(false);
  };

  const formRef = useRef<FormikProps<FormikValues>>(null);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.submitForm();
    }
  };

  return (
    <Dialog open={opened} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Nueva tarea</DialogTitle>
      <DialogContent>
        <NewTaskForm
          categories={categories}
          handleClose={handleClose}
          innerRef={formRef}
        />
      </DialogContent>
      <DialogActions sx={{ marginLeft: "auto" }}>
        <Button variant="outlined" onClick={handleClose} sx={{ width: "100%" }}>
          Cancelar
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: "100%" }}
        >
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
