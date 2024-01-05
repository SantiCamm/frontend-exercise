import { useQuery } from "react-query";
import Loading from "src/components/Loading";
import Task from "./components/Task";
import { getTaskCategory } from "./utils";
import { QUERY_KEY_CATEGORIES, QUERY_KEY_TASKS } from "src/constants/querys";
import ErrorBoundary from "src/components/ErrorBoundary";
import { Fab, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Modal from "src/components/Modal";
import { fetchTasks } from "src/services/tasks";
import { fetchCategories } from "src/services/categories";
import styled from "@emotion/styled";
import SimpleList from "src/components/SimpleList";
import { Task as TaskType } from "src/types";

const Tasks = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const {
    data: tasks,
    isLoading: tasksLoading,
    isError: tasksError,
  } = useQuery(QUERY_KEY_TASKS, fetchTasks, {
    refetchInterval: false,
    staleTime: Infinity,
  });

  const {
    data: categories,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useQuery(QUERY_KEY_CATEGORIES, fetchCategories, {
    refetchInterval: false,
    staleTime: Infinity,
  });

  const error = tasksError || categoriesError;
  const loading = tasksLoading || categoriesLoading;

  const finishedTasks = tasks?.filter((task) => task.completed);
  const pendingTasks = tasks?.filter((task) => !task.completed);

  const renderTask = (task) => (
    <Task
      task={task}
      key={task.id}
      category={getTaskCategory(task, categories)}
    />
  );

  const Container = styled.div`
    margin: 0 auto;
    width: 50%;
    padding: 64px 3px;
    display: flex;
    flex-direction: column;
  `;

  const ListContainer = styled.div`
    padding-bottom: 32px;
  `;

  return (
    <ErrorBoundary error={error}>
      <Loading loading={loading}>
        <Container>
          <ListContainer>
            <Typography variant="h3" gutterBottom>
              Lista de tareas
            </Typography>
            <SimpleList<TaskType>
              items={pendingTasks}
              renderItem={renderTask}
              title="Pendientes"
              emptyListMessage={"No hay tareas para mostrar"}
            />
            <SimpleList<TaskType>
              items={finishedTasks}
              renderItem={renderTask}
              title="Terminadas"
              emptyListMessage={"No hay tareas para mostrar"}
            />
          </ListContainer>
          <Fab
            color="primary"
            aria-label="add"
            sx={{ alignSelf: "flex-end" }}
            onClick={() => setModalOpened(true)}
          >
            <AddIcon />
          </Fab>
          <Modal
            opened={modalOpened}
            setOpen={setModalOpened}
            categories={categories}
          />
        </Container>
      </Loading>
    </ErrorBoundary>
  );
};

export default Tasks;
