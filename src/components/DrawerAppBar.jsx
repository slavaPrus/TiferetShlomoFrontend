import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOneUser } from "../features/userSlice";

const drawerWidth = 240;
const navItems = [
  { name: "אודות", link: "about-us" },
  { name: "ספרי מרן", link: "rabbi-books" },
  { name: "מבחנים", link: "HalachaTests" },
];
const sideNavItems = [
  { name: "עגלה", link: "cart", icon: <ShoppingCartIcon /> },
  { name: "החשבון שלי", icon: <AccountCircle /> },
];
//  'ספרים', 'שיעורים','עלונים', 'שני הלכות ליום', 'מבחנים בהלכה','תולדות חייו', 'לזכרו', 'חנות','תרומות', 'צור קשר'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const user = useSelector((state) => state.users.oneUser);
  const dispatch = useDispatch();
  React.useEffect(() => {
    let userLocal = localStorage.getItem("user");
    console.log("userLocal ", userLocal);
    if (user == null) {
      if (userLocal) {
        dispatch(setOneUser(JSON.parse(userLocal)));
      }
    }
  }, [user]);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const profileNavItems = [
    { name: "התחברות", link: "signIn", disabled: user !== null },
    { name: "הרשמה", link: "signUp", disabled: user !== null },
    { name: "אזור אישי", link: "privateArea", disabled: user === null },
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        תפארת שלמה
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.link)}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <Box>
        <AppBar component="nav" sx={{ height:"10%",backgroundColor: "#0B1365" }}>
          <Toolbar
            sx={{ p: 0, direction: "rtl", justifyContent: "space-between" }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "baseline",
              }}
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Button onClick={() => navigate("/")}>
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                >
                  תפארת שלמה
                </Typography>
              </Button>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item, index) => (
                  <Button
                    onClick={() => navigate(item.link)}
                    disabled={item.disabled}
                    key={index}
                    sx={{ color: "#fff" }}
                  >
                    {item.name}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box display={"flex"} flexDirection={"row"} padding={0}>
              {sideNavItems.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <MenuItem
                      sx={{ padding: "0" }}
                      onClick={() => navigate(item.link)}
                    >
                      <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={item.name === "החשבון שלי" ? handleMenu : null}
                        color="inherit"
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          padding: "0 8px",
                        }}
                      >
                        {item.icon}
                        <Typography fontSize={"10px"}>{item.name}</Typography>
                      </IconButton>
                    </MenuItem>
                    {item.name === "החשבון שלי" && (
                      <Menu
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                      >
                        {profileNavItems.map((profileItem, index) => {
                          return (
                            <MenuItem
                              key={index}
                              onClick={() => navigate(profileItem.link)}
                            >
                              {profileItem.name}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    )}
                  </React.Fragment>
                );
              })}
            </Box>
          </Toolbar>
        </AppBar>
        <nav>
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
        </nav>
        <Box component="main" sx={{ p: 3 }}>
          <Toolbar />
          <Typography></Typography>
        </Box>
      </Box>

      <Outlet />
    </Box>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
