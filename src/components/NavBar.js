import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar, Box, Button, IconButton, Menu, MenuItem, MenuList, Tooltip, Typography } from "@mui/material";
import { useAuth } from "../context/AuthProvider";
import shortestPathContext from "../context/shortestPathContext";
import wayPointsContext from "../context/wayPointsContext";

const StyledNav=styled.nav`
background-color: #FFFFFF;
.logo
{
  width: 50px;
  height: 50px;
  border-radius: 50px;
}
`

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name?.split(' ')[0][0]}${name?.split(' ')[1][0]}`,
  };
}



function NavBar() {
  const auth=useAuth()
  const user=auth.user
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { shortestPath, setShortestPath } = useContext(shortestPathContext);
  const {  deleteWayPoint } =useContext(wayPointsContext);



  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <StyledNav
        className="fixed-top navbar navbar-expand-lg bg-body-tertiary bg-opacity-0"
      >
        <div className="container-fluid">
          <a className="navbar-brand fs-4" href="#">
           <img src={"https://www.pixelstalk.net/wp-content/uploads/2016/08/Travel-Images-For-Desktop.jpg"} className="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  to="/"
                  className="nav-link active fs-5"
                  aria-current="page"
                  onClick={()=>{deleteWayPoint({});setShortestPath([])}}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/about" className="nav-link fs-5" href="#">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user&&<Avatar {...stringAvatar(`${user?.fname.toUpperCase()} ${user?.lname.toUpperCase()}`)} />}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
  
                <MenuItem onClick={handleCloseUserMenu}>
                  <MenuList>
                  <h3>User Details</h3>
                  <Typography>First Name:- {user?.fname}</Typography>
                  <Typography>Last Name:- {user?.lname}</Typography>
                  <Typography>Email:- {user?.email}</Typography>
                  <Typography onClick={()=>{auth.logout()}}><Button type="primary">Logout</Button></Typography>
                
                  </MenuList>
                </MenuItem>
            </Menu>
          </Box>
        </div>
      </StyledNav>
    </>
  );
}
export default NavBar;
