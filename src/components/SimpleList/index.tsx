import { Typography } from "@mui/material";
import styled from "@emotion/styled";

interface Props<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  title: string;
  emptyListMessage: string;
}

const SimpleList = <T,>({
  items,
  renderItem,
  title,
  emptyListMessage,
}: Props<T>) => {
  const Container = styled.div`
    margin-bottom: 32px;
  `;

  return (
    <Container>
      <Typography variant="h6">{title}</Typography>
      {items.length < 1 ? (
        <Typography variant="body1">{emptyListMessage}</Typography>
      ) : (
        items?.map((item) => renderItem(item))
      )}
    </Container>
  );
};

export default SimpleList;
