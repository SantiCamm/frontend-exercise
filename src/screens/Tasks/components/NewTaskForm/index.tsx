import {
  Formik,
  Form as FormComponent,
  Field,
  FormikProps,
  FormikValues,
} from "formik";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { CATEGORY_FIELD_ID } from "src/constants/forms";
import styled from "@emotion/styled";
import { Category, NewTaskFormError } from "src/types";
import { QUERY_KEY_TASKS } from "src/constants/querys";
import { useMutation, useQueryClient } from "react-query";
import { addTask } from "src/services/tasks";
import Loading from "src/components/Loading";
import ErrorBoundary from "src/components/ErrorBoundary";
import { Ref } from "react";
import FieldError from "./components/FieldError";
import { textFields } from "./constants";

interface FormValues {
  title: string;
  description: string;
  category: string;
}

interface Props {
  handleClose: () => void;
  categories: Array<Category>;
  innerRef: Ref<FormikProps<FormikValues>> | null;
}

const NewTaskForm = ({ handleClose, categories, innerRef }: Props) => {
  const queryClient = useQueryClient();
  const initialValues: FormValues = {
    title: "",
    description: "",
    category: "",
  };

  const {
    mutateAsync: addTaskMutation,
    isLoading: newTaskLoading,
    isError: newTaskError,
  } = useMutation({
    mutationFn: addTask,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_TASKS]);
    },
  });

  const onSubmit = async (values) => {
    try {
      const selectedCategory = categories.find(
        (category) => category.id === values?.category
      );
      const newTask = {
        title: values.title,
        description: values?.description,
        completed: false,
        category_id: selectedCategory?.id,
      };

      await addTaskMutation({ newTask });
      handleClose();
    } catch (error) {
      throw new Error("Error al agregar una trea");
    }
  };

  const validate = (values): NewTaskFormError => {
    const errors: NewTaskFormError = {};

    if (!values.title) {
      errors.title = "Campo obligatorio";
    }

    if (values.title && values.title.length > 40) {
      errors.title = "Máximo 40 caracteres";
    }

    if (values.description && values.description.length > 100) {
      errors.description = "Máximo 100 caracteres";
    }

    if (!values.category) {
      errors.category = "Campo obligatorio";
    }

    return errors;
  };

  const Container = styled.div`
    width: 100%;
  `;

  const TextFieldsContainer = styled.div`
    margin: 0 0 4px 0;
  `;

  return (
    <Container>
      <ErrorBoundary error={newTaskError}>
        <Loading loading={newTaskLoading}>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
            innerRef={innerRef}
          >
            <FormComponent>
              <TextFieldsContainer>
                {textFields.map((field) => (
                  <>
                    <Field
                      name={field.name}
                      as={TextField}
                      fullWidth
                      id={field.id}
                      label={field.label}
                      type="text"
                      variant="standard"
                      sx={field.sx}
                    />
                    <FieldError name={field.name} />
                  </>
                ))}
              </TextFieldsContainer>
              <div>
                <FormControl
                  variant="standard"
                  sx={{ width: "100%", marginTop: "2px" }}
                >
                  <InputLabel id="demo-simple-select-filled-label">
                    Categoría
                  </InputLabel>
                  <Field
                    name="category"
                    as={Select}
                    label="Category"
                    fullWidth
                    id={CATEGORY_FIELD_ID}
                  >
                    {categories.map((category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </Field>
                </FormControl>
                <FieldError name="category" />
              </div>
            </FormComponent>
          </Formik>
        </Loading>
      </ErrorBoundary>
    </Container>
  );
};

export default NewTaskForm;
