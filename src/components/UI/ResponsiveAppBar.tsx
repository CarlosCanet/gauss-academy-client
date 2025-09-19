import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, Link } from "react-router";
import { ThemeContext } from "../../context/theme.contex";
import Switch from "@mui/material/Switch";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

type ResponsiveAppBarProps = {
  onOpenAdminDrawer?: () => void;
};

function ResponsiveAppBar({ onOpenAdminDrawer }: ResponsiveAppBarProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { username, profileImgUrl, isLoggedIn, authenticateUser, role } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    try {
      authenticateUser();
      navigate("/");
    } catch (error) {
      console.error(error);
      navigate("/ErrorPage");
    }
  };

  const pages = ["Courses", "Teachers", "Methodology", "Contact"];
  const settings = [
    { name: "Profile", path: "/profile" },
    { name: "My Courses", path: "/my-courses" },
    { name: "Toggle mode", action: () => setIsDarkTheme(prev => !prev) },
    { name: "Logout", action: handleLogout },
  ];
  if (role === "Admin") {
    // If an external handler to open the admin drawer is provided, use it; otherwise fall back to a console log
    settings.splice(
      2,
      0,
      { name: "Admin panel", action: onOpenAdminDrawer ?? (() => console.log("Admin panel clicked")) },
      { name: "User list", path: "/users" }
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}>
              {pages.map((page) => (
                <MenuItem key={page} component={Link} to={`/${page.toLowerCase()}`} onClick={handleCloseNavMenu}>
                  <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            Gauss Academy
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                component={Link}
                to={`${page.toLowerCase()}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Typography sx={{ mr: "5px" }} color="white">
                      {username}
                    </Typography>
                    <Avatar alt={`User image profile`} src={profileImgUrl ?? ""} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}>
                  {settings.map((setting) => {
                    if (setting.name === "Toggle mode") {
                      return (
                        <MenuItem 
                          key={setting.name}
                          onClick={() => {
                            handleCloseUserMenu();
                          }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1, justifyContent: "space-between" }}>
                            <Brightness7Icon fontSize="small" color={!isDarkTheme ? "primary" : "inherit"} />
                            <Switch
                              edge="start"
                              checked={isDarkTheme}
                              onChange={() => setIsDarkTheme((prev) => !prev)}
                            />
                            <Brightness4Icon fontSize="small" color={isDarkTheme ? "primary" : "inherit"} />
                          </Box>
                        </MenuItem>
                      );
                    }
                    if (setting.action && !setting.path) {
                      return (
                        <MenuItem
                          key={setting.name}
                          onClick={() => {
                            handleCloseUserMenu();
                            if (setting.action) {
                              setting.action();
                            }
                          }}>
                          <Typography sx={{ textAlign: "center" }}>{setting.name}</Typography>
                        </MenuItem>
                      );
                    }
                    const to = setting.path ?? "/";

                    return (
                      <MenuItem key={setting.name} onClick={handleCloseUserMenu} component={Link} to={to}>
                        <Typography sx={{ textAlign: "center" }}>{setting.name}</Typography>
                      </MenuItem>
                    );
                  })}
                </Menu>
              </>
            ) : (
              <MenuItem component={Link} to="/login">
                <Typography>Login</Typography>
              </MenuItem>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
