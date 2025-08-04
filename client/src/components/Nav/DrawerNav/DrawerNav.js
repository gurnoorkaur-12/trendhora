import { useState, Fragment, useContext } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Badge from '@mui/material/Badge';
import { Link, useLocation } from 'react-router-dom';
import Cart from '../../Card/Cart/Cart';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { motion, AnimatePresence } from 'framer-motion';
import NavBrand from '../Nav-Brand/Navbrand';
import { ListItemIcon } from '@mui/material';
import manWear from '../../../asset/icons/manWear.png'
import womanWear from '../../../asset/icons/womanWear.png'
import kidsWear from '../../../asset/icons/kidsWear.png'
import home from '../../../asset/icons/home.png'
import shop from '../../../asset/icons/shop.png'


const navLinks = [
  { text: 'Home', to: '/', icon: home},
  { text: 'Shop', to: '/shop', icon: shop },
  { text: 'Men', to: '/category/men', icon: manWear},
  { text: 'Women', to: '/category/women', icon: womanWear },
  { text: 'Kids', to: '/category/kids', icon: kidsWear },
];

const listVariants = {
  open: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
  closed: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  open: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 300, damping: 24 } },
  closed: { opacity: 0, x: -40, transition: { duration: 0.2 } },
};

const menuBtnVariants = {
  initial: { rotate: 0, scale: 1 },
  clicked: { rotate: 90, scale: 1.2, transition: { type: 'spring', stiffness: 200, damping: 25 } },
  unclicked: { rotate: 0, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
};

const DrawerNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [menuClicked, setMenuClicked] = useState(false);
  const wishItems = useContext(WishItemsContext);
  const location = useLocation();

  const linkButtonStyle = {
    transition: '0.3s',
    textDecoration: 'none',
    color: '#333',
    borderRadius: '8px',
    borderBottom: 'solid 0.1px #333 ' ,
    '&:hover': {
      backgroundColor: '#fff8e1',
      color: '#FFD600',
      transform: 'translateX(8px) scale(1.03)',
    },
    '&.active': {
      backgroundColor: '#FFD600',
      color: '#333',
      fontWeight: 700,
      boxShadow: '0 2px 8px rgba(255,214,0,0.08)',
    },
  };

  // Helper to check if route is active
  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  // Animate menu button on click
  const handleMenuClick = () => {
    setMenuClicked(true);
    setTimeout(() => {
      setIsOpen(true);
      setMenuClicked(false);
    }, 200);
  };

  const handleMenuClose = () => {
    setMenuClicked(true);
    setTimeout(() => {
      setIsOpen(false);
      setMenuClicked(false);
    }, 200);
  };

  return (
    <Fragment>
      <Box sx={{ p: 1, zIndex: 1301, position: 'relative' }}>
        <motion.div
          variants={menuBtnVariants}
          animate={menuClicked ? 'clicked' : 'unclicked'}
          style={{ display: 'inline-block' }}
        >
          {isOpen ? (
            <MenuOpenIcon
              fontSize="large"
              onClick={handleMenuClose}
              sx={{
                cursor: 'pointer',
                backgroundColor: '#FFD600',
                borderRadius: '50%',
                padding: '4px',
                color: '#333',
                zIndex: 1302,
                position: 'relative',
                transition: 'background 0.2s',
                '&:hover': { backgroundColor: '#ffe066' },
              }}
            />
          ) : (
            <MenuIcon
              fontSize="large"
              onClick={handleMenuClick}
              sx={{
                cursor: 'pointer',
                backgroundColor: '#FFD600',
                borderRadius: '50%',
                padding: '4px',
                color: '#333',
                zIndex: 1302,
                position: 'relative',
                transition: 'background 0.2s',
                '&:hover': { backgroundColor: '#ffe066' },
              }}
            />
          )}
        </motion.div>
      </Box>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="drawer"
            initial={{ x: -300, width: 0, opacity: 0 }}
            animate={{ x: 0, width: 280, opacity: 1 }}
            exit={{ x: -300, width: 0, opacity: 0 }}
           transition={{ duration: 2, type: "tween" }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              height: '100vh',
              background: '#fff',
              boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
              zIndex: 1300,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <motion.div
              variants={listVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <List sx={{ paddingTop: '1rem'}}>
                <motion.div>
                  <NavBrand />
                </motion.div>
                {navLinks.map(({ text, to, icon }) => (
                  <motion.div key={text} variants={itemVariants}>
                    <ListItem disablePadding>
                      <ListItemButton
                        component={Link}
                        to={to}
                        onClick={() => setIsOpen(false)}
                        sx={linkButtonStyle}
                        className={isActive(to) ? 'active' : ''}
                      >
                        <ListItemIcon sx={{ minWidth: 36, color: '#333' }}>
                          <img src={icon} alt={text + " icon"} style={{ width: 24, height: 24, objectFit: 'contain' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={text}
                          primaryTypographyProps={{
                            fontSize: '1.1rem',
                            color: 'inherit',
                          }}
                        />
                      </ListItemButton>
                    </ListItem>
                  </motion.div>
                ))}
                <Box />
                <motion.div variants={itemVariants}>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to="/account/login"
                      onClick={() => setIsOpen(false)}
                      sx={linkButtonStyle}
                      className={isActive('/account/login') ? 'active' : ''}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color:  '#333' }}>
                        <PersonOutlineIcon />
                      </ListItemIcon>
                      <ListItemText primary="Account" primaryTypographyProps={{ color: 'inherit' }} />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ListItem disablePadding>
                    <ListItemButton
                      component={Link}
                      to="/wishlist"
                      sx={{ ...linkButtonStyle, display: 'flex', alignItems: 'center' }}
                      onClick={() => setIsOpen(false)}
                      className={isActive('/wishlist') ? 'active' : ''}
                    >
                      <ListItemIcon sx={{ minWidth: 36, color: '#333' }}>
                        <Badge
                          badgeContent={wishItems.items.length}
                          sx={{
                            '& .MuiBadge-badge': {
                              backgroundColor: '#e53935',
                              color: '#fff',
                              fontWeight: 600,
                              fontSize: '0.7rem',
                              minWidth: 20,
                              height: 20,
                              borderRadius: '50%',
                              boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
                              marginRight: '1rem'
                            },
                          }}
                        >
                          <FavoriteBorderIcon />
                        </Badge>
                      </ListItemIcon>
                      <ListItemText primary="Wishlist" primaryTypographyProps={{
                        
                        color: 'inherit',
                      }} />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <ListItem disablePadding>
                    <ListItemButton sx={{ ...linkButtonStyle, display: 'flex', alignItems: 'center', marginLeft: "-4px" }}>
                      <ListItemIcon sx={{ minWidth: 36, color: '#333 '}}>
                        <Cart />
                      </ListItemIcon>
                      <ListItemText
                        primary="Cart"
                        primaryTypographyProps={{                          
                          marginLeft: '10px',
                          color: 'inherit',
                        }}
                      />
                    </ListItemButton>
                  </ListItem>
                </motion.div>
              </List>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Add style for active class */}
      <style>
        {`
          .MuiListItemButton-root.active {
            background: #FFD600 !important;
            color: #333 !important;
            font-weight: 700 !important;
            box-shadow: 0 2px 8px rgba(255,214,0,0.08);
          }
          .MuiListItemButton-root:hover {
            background: #fff8e1 !important;
            color: #FFD600 !important;
            transform: translateX(8px) scale(1.03);
          }
        `}
      </style>
    </Fragment>
  );
};

export default DrawerNav;