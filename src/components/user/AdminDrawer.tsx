import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import PersonIcon from '@mui/icons-material/Person';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import { type SetStateAction } from "react";
import { Link } from "react-router";

type AdminDrawerProps = {
  isOpen: boolean,
  setIsOpen: React.Dispatch<SetStateAction<boolean>>
}

function AdminDrawer({ isOpen, setIsOpen }: AdminDrawerProps) {

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event && event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setIsOpen(open);
  };

  const list = () => (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {[{name: "Active courses", path: "/my-courses", icon: <DescriptionIcon /> }, {name: "Active enrollments", path: "", icon: <TurnedInNotIcon />}, {name: "Classes", path: "", icon: <SchoolIcon />}].map((obj) => (
          <ListItem key={obj.name} disablePadding>
            <ListItemButton component={Link} to={obj.path}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[{name: "All users", path: "/users", icon: <PersonIcon />}].map((obj) => (
          <ListItem key={obj.name} disablePadding>
            <ListItemButton component={Link} to={obj.path}>
              <ListItemIcon>{obj.icon}</ListItemIcon>
              <ListItemText primary={obj.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <SwipeableDrawer anchor="right" open={isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </div>
  );
}

export default AdminDrawer;
