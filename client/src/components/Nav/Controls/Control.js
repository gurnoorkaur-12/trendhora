import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Cart from '../../Card/Cart/Cart';
import ThemeToggle from '../../ThemeToggle/ThemeToggle';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { WishItemsContext } from '../../../Context/WishItemsContext';
import { supabase } from '../../../lib/supabase';
import useMediaQuery from '@mui/material/useMediaQuery';


const Control = () => {
  const isSmallScreen = useMediaQuery('(max-width:768px)');
  
  const wishItems = useContext(WishItemsContext);
  const [user, setUser] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchUser();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = () => {
    navigate('/account/login');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    handleClose();
    navigate('/');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const controlButton = {
    width: 44,
    height: 44,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: 'var(--bg-secondary)',
    boxShadow: 'var(--shadow)',
    cursor: 'pointer',
    transition: '0.25s ease',
    border: '1px solid var(--border-color)',
    '&:hover': {
      backgroundColor: 'var(--bg-tertiary)',
      transform: 'scale(1.08)',
    },
  };

  const tooltipProps = {
    arrow: true,
    slotProps: {
      popper: {
        sx: {
          '& .MuiTooltip-tooltip': {
            backgroundColor: 'var(--bg-tertiary)',
            color: 'var(--text-primary)',
            fontSize: '0.8rem',
            borderRadius: '6px',
            padding: '6px 10px',
          },
          '& .MuiTooltip-arrow': {
            color: 'var(--bg-tertiary)',
          },
        },
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
      {/* Theme Toggle */}
      {!isSmallScreen && (<ThemeToggle />)}

      {/* Login or Profile */}
      {!user ? (
        <Tooltip title="Login to your account" {...tooltipProps}>
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: '#2ecc71',
              color: '#fff',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.9rem',
              borderRadius: { xs: '12px', md: '20px'},
              '&:hover': {
                backgroundColor: '#27ae60',
              },
            }}
          >
            Login
          </Button>
        </Tooltip>
      ) : (
        <>
          <Tooltip title="Your Profile" {...tooltipProps}>
            <IconButton onClick={handleClick} sx={{ p: 0 }}>
              <Avatar
                alt="Profile"
                src={user?.user_metadata?.avatar_url || '/default-avatar.png'}
                sx={{
                  width: 36,
                  height: 36,
                }}
              />
            </IconButton>
          </Tooltip>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={() => navigate('/account/me')}>My Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Sign Out</MenuItem>
          </Menu>
        </>
      )}

      {/* Wishlist */}
      {!isSmallScreen && (<Tooltip title="Wishlist" {...tooltipProps}>
        <Box component={Link} to="/wishlist" sx={controlButton}>
          <Badge
            badgeContent={wishItems.items.length}
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: 'var(--danger-color)',
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.7rem',
                minWidth: 20,
                height: 20,
                borderRadius: '50%',
                boxShadow: 'var(--shadow)',
                border: '2px solid var(--bg-primary)',
              },
            }}
          >
            <FavoriteBorderIcon sx={{ fontSize: '1.8rem', color: 'var(--text-primary)' }} />
          </Badge>
        </Box>
      </Tooltip>)}

      {/* Cart */}
      {!isSmallScreen && (<Tooltip title="Cart" {...tooltipProps}>
        <Box sx={controlButton}>
          <Box sx={{ 
            '& svg': { 
              color: 'var(--text-primary)',
              fontSize: '1.8rem'
            } 
          }}>
            <Cart />
          </Box>
        </Box>
      </Tooltip>)}
    </Box>
  );
};

export default Control;


