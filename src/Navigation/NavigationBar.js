import { Link } from "react-router-dom";
import React from "react";
import classes from "./NavigationBar.module.css";
import { useSelector, useDispatch } from "react-redux";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { signOutApi } from "../Redux/Actions/UserState";

function NavigationBar(props) {
  const userstat = useSelector((state) => {
    return state.userState.user;
  });
  const courseStat = useSelector((state) => {
    return state.courseState.course;
  });

  const dispatch = useDispatch();
  const signOut = () => {
    dispatch(signOutApi());
    
    
  };
  return (
    <div className={classes.Layout}>
      <div className={classes.MenuBar}>
        <div className={classes.NavBar}>
          <nav className={classes.NavMenue}>
            <Button variant="text">
              <Link className={classes.links} to="/Home">
                Home
              </Link>
            </Button>

            <Button variant="text">
              <Link className={classes.links} to="/Courses">
                Courses
              </Link>
            </Button>

            <Button variant="text">
              <Link className={classes.links} to="/Deadlines">
                Deadlines
              </Link>
            </Button>

            <Button variant="text">
              <Link className={classes.links} to="/Study_History">
                Study_History
              </Link>
            </Button>

            <Button variant="text">
              <Link className={classes.links} to="/Friends">
                Friends
              </Link>
            </Button>

            <Button variant="text">
              <Link className={classes.links} to="/Messages">
                Messages
              </Link>
            </Button>

            <Button variant="text">
              <Link className={classes.links} to="/Settings">
                Settings
              </Link>
            </Button>
          </nav>

          <div className={classes.User}>
            <div className={classes.Users}>
              {userstat && userstat.photoURL ? (
                <img src={userstat.photoURL} all="" />
              ) : (
                <img src="/images/user1.svg" all="" />
              )}
            </div>
            <div className={classes.Signout}>
              <Button sx={{ "background-color": "white" }}
              onClick={() => {
                signOut()
              }}
              >SignOut</Button>
            </div>
          </div>

          {/*import * as React from 'react';
              import Box from '@mui/material/Box';
              import Avatar from '@mui/material/Avatar';
              import Menu from '@mui/material/Menu';
              import MenuItem from '@mui/material/MenuItem';
              import ListItemIcon from '@mui/material/ListItemIcon';
              import Divider from '@mui/material/Divider';
              import IconButton from '@mui/material/IconButton';
              import Typography from '@mui/material/Typography';
              import Tooltip from '@mui/material/Tooltip';
              import PersonAdd from '@mui/icons-material/PersonAdd';
              import Settings from '@mui/icons-material/Settings';
              import Logout from '@mui/icons-material/Logout';

              export default function AccountMenu() {
                const [anchorEl, setAnchorEl] = React.useState(null);
                const open = Boolean(anchorEl);
                const handleClick = (event) => {
                  setAnchorEl(event.currentTarget);
                };
                const handleClose = () => {
                  setAnchorEl(null);
                };
                return (
                  <React.Fragment>
                    <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                      <Typography sx={{ minWidth: 100 }}>Contact</Typography>
                      <Typography sx={{ minWidth: 100 }}>Profile</Typography>
                      <Tooltip title="Account settings">
                        <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
                          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      onClick={handleClose}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          overflow: 'visible',
                          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                          mt: 1.5,
                          '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                          },
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                          },
                        },
                      }}
                      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >
                      <MenuItem>
                        <Avatar /> Profile
                      </MenuItem>
                      <MenuItem>
                        <Avatar /> My account
                      </MenuItem>
                      <Divider />
                      <MenuItem>
                        <ListItemIcon>
                          <PersonAdd fontSize="small" />
                        </ListItemIcon>
                        Add another account
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                      </MenuItem>
                      <MenuItem>
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </Menu>
                  </React.Fragment>
                );
              }
              */}
        </div>
      </div>
      <div className={classes.Body}>{props.children}</div>
    </div>
  );
}

export default NavigationBar;
