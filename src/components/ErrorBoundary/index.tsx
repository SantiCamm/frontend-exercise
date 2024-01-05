import { Container, Paper, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  error: boolean;
  children: ReactNode;
}

const ErrorBoundary = ({ children, error }: Props) => {
  return error ? (
    <Container maxWidth="sm" sx={{ marginTop: "20px" }}>
      <Paper elevation={3} sx={{ padding: "20px" }}>
        <Typography variant="h5" gutterBottom>
          Ups, hubo un error!
        </Typography>
        <Typography variant="body1" color="error">
          Ocurrió un error
        </Typography>
      </Paper>
    </Container>
  ) : (
    children
  );
};

export default ErrorBoundary;
