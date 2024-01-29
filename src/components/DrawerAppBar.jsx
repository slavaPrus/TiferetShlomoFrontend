import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240;
const navItems = [{name:'אודות', link: 'about-us'},{name:'ספרי מרן', link: 'rabbi-books'},
{name:'התחברות', link: 'signIn'}, {name:'הרשמה', link: 'signUp'}]
//  'ספרים', 'שיעורים','עלונים', 'שני הלכות ליום', 'מבחנים בהלכה','תולדות חייו', 'לזכרו', 'חנות','תרומות', 'צור קשר'];

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        תפארת שלמה
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton onClick={() => navigate(item.link)} sx={{ textAlign: 'center' }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;
    
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{backgroundColor:"purple"}}>
        <Toolbar sx={{ p:0,direction:"rtl"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Button onClick={()=> navigate('/')}>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            תפארת שלמה
          </Typography></Button>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Button onClick={() => navigate(item.link)} key={item.index} sx={{color: '#fff' }}>
                {item.name}
              </Button>
            ))}
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
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3}}>
        <Toolbar />
        <Typography>
         
        </Typography>
      </Box>
    </Box>
    <Outlet/>
    </>
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
