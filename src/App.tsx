import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Tasks from "./screens/Tasks";
import { QueryClient, QueryClientProvider } from "react-query";

const theme = createTheme({
  components: {
    MuiCheckbox: {
      styleOverrides: {
        root: {
          padding: "9px",
        },
      },
    },
  },
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
        <ThemeProvider theme={theme}>
          <Tasks />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
