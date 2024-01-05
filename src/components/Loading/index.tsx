import { CircularProgress, Container, Typography } from "@mui/material";
import { ReactNode } from "react";

interface Props {
  loading: boolean;
  children: ReactNode;
}

const Loading = ({ loading, children }: Props) => {
  return loading ? (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Cargando...
      </Typography>
      <CircularProgress />
    </Container>
  ) : (
    children
  );
};

export default Loading;
