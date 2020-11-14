import { useEffect } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import { Container, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { UserLayout } from "~/context/UserContext";
import { ThemeLayout } from "~/context/ThemeContext";
import Header from "~/components/Header";
import ActionMenu from "~/components/ActionMenu";

const useStyles = makeStyles({
  container: {
    boxSizing: "border-box",
    paddingTop: 96,
    paddingBottom: 96,
    backgroundColor: "#F5F5F5",
    minHeight: "100vh",
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);
  }, []);

  const classes = useStyles();
  return (
    <>
      <Head>
        <title>MCIT Central</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <ThemeLayout>
        <UserLayout>
          <Box className={classes.container}>
            <Header />
            <Container>
              <Component {...pageProps} />
            </Container>
            <ActionMenu />
          </Box>
        </UserLayout>
      </ThemeLayout>
    </>
  );
};

export default App;