import * as React from 'react';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import { signout, call, manager, adminmanage } from "./service/ApiService";
import {Route, Link, useHistory, useNavigate  } from 'react-router-dom'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

export default function SpeedDials( ) {
  const actions  = [
    { icon: <ManageAccountsIcon   onClick={manager} />, name: 'Manage' },
    { icon: <AdminPanelSettingsIcon   onClick={adminmanage} />, name: 'Admin' },
    { icon: <LogoutIcon onClick={signout} />, name: 'Logout' }
  ];



  return (
    <Box sx={{ height: 10, transform: 'translateZ(0px)', flexGrow: 1 }}>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon openIcon={<EditIcon />} />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </Box>
  );
}