import { createTheme, CssBaseline, ThemeProvider, type LinkProps } from "@mui/material";
import React, { createContext, useState, type SetStateAction } from "react";
import { Link as RouterLink, type LinkProps as RouterLinkProps } from "react-router";

type ThemeContextType = {
  isDarkTheme: boolean,
  setIsDarkTheme: React.Dispatch<SetStateAction<boolean>>
}

const ThemeContext = createContext<ThemeContextType>({ isDarkTheme: false, setIsDarkTheme: () => { } });

const LinkBehavior = React.forwardRef<HTMLAnchorElement, Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);
  
  const passedContext = { isDarkTheme, setIsDarkTheme };

  const theme = createTheme({
    palette: {
      mode: isDarkTheme ? "dark" : "light"
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={passedContext}>
      <ThemeProvider theme={theme}>
          <CssBaseline />
            {children}
          
        </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeWrapper }