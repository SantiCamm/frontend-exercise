import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import { ErrorMessage } from "formik";

interface Props {
  name: string;
}

const FieldError = ({ name }: Props) => {
  const ErrorContainer = styled.div`
    color: red;
    margin: 4px 0 0 0;
  `;

  return (
    <ErrorContainer>
      <ErrorMessage
        name={name}
        render={(error) => <Typography variant="caption">{error}</Typography>}
      />
    </ErrorContainer>
  );
};

export default FieldError;
