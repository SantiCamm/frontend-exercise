import Checkbox from "@mui/material/Checkbox";
import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEY_TASKS } from "src/constants/querys";
import { modifyTask } from "src/services/tasks";
import { Paper, Typography } from "@mui/material";
import styled from "@emotion/styled";

interface Props {
  task: {
    completed: boolean;
    description: string;
    id: string;
    title: string;
    category_id: string;
  };
  category: {
    color: string;
    id: string;
    name: string;
  };
}

const Task = ({ task, category }: Props) => {
  const queryClient = useQueryClient();
  const { completed, description, title } = task;

  const { mutateAsync: modifyTaskMutation } = useMutation({
    mutationFn: modifyTask,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEY_TASKS]);
    },
  });

  const handleCheckTask = async (e) => {
    try {
      const checkedStatus = e.target.checked;

      await modifyTaskMutation({ task, checkedStatus });
    } catch (error) {
      throw new Error("Error al modificar una trea");
    }
  };

  const TextCotainer = styled.div`
    width: 100%;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
  `;

  return (
    <Paper
      elevation={3}
      variant="elevation"
      square
      sx={{
        backgroundColor: category.color,
        margin: "16px 0",
        padding: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Checkbox
        checked={completed}
        onChange={handleCheckTask}
        size="medium"
        sx={{ padding: "9px" }}
      />
      <TextCotainer>
        <Typography variant="body1">{`${category.name}: ${title}`}</Typography>
        <Typography variant="body2">{description}</Typography>
      </TextCotainer>
    </Paper>
  );
};

export default Task;
