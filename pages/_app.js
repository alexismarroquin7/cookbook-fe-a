// store
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import { rootReducer } from "../store";
import thunk from 'redux-thunk';
import logger from 'redux-logger';

// styles
import { ThemeProvider } from 'styled-components'
import { GlobalStyles, theme } from "../styles/theme";
import '../styles/globals.css'
import { MobileNav } from "../widgets/MobileNav";
import { Grid } from "../components";

let persistedState = {};

if(typeof window !== "undefined"){
  persistedState = JSON.parse(localStorage.getItem('cookbook_fe_a')) 
  ? JSON.parse(localStorage.getItem('cookbook_fe_a')) 
  : {}
}

const middleware = applyMiddleware(thunk, logger);
const store = createStore(
  rootReducer,
  persistedState,
  middleware
);

store.subscribe(() => {
  if(typeof window !== "undefined"){
    localStorage.setItem(
      'cookbook_fe_a',
      JSON.stringify(store.getState())
    );
  }
});

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={store}>
    <ThemeProvider theme={theme.light}>
      <GlobalStyles/>
      <Grid
        padding="0 0 8rem 0"
      >
        <Component {...pageProps} />
        <MobileNav/>
      </Grid>
    </ThemeProvider>
  </Provider>
  )
}

export default MyApp
