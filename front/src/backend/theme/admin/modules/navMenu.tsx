import React from 'react';
import BusinessIcon from '@mui/icons-material/Business';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import MenuBookIcon from '@mui/icons-material/MenuBook';
const navMenu = [
    {
        title: 'Dashboard',
        url: '/',
        icon: <DashboardIcon/>,
    },
    {
        title: 'Company Master',
        url: '/company',
        icon: <BusinessIcon />,
        controller: 'CompanyMasters',
        subMenu: [
            {
                title: 'Add Company',
                url: '/add',
                icon: <DomainAddIcon/>
            },
            {
                title: 'List Companys',
                url: '/list',
                icon: <ListAltIcon/>
            }
        ]

    },
    {
        title: 'Bank Master',
        url: '/bank',
        icon: <AccountBalanceIcon/>,
        controller: 'BankMasters',
        subMenu: [
            {
                title: 'Add Bank',
                url: '/add',
                icon: <AccountBalanceIcon/>
            },
            {
                title: 'List Banks',
                url: '/list',
                icon: <ListAltIcon/>
            }
        ]

    },
    {
        title: 'Product Master',
        url: '/product',
        icon: <AutoStoriesIcon/>,
        controller: 'ProductMasters',
        subMenu: [
            {
                title: 'Add Product',
                url: '/add',
                icon: <MenuBookIcon/>
            },
            {
                title: 'List Product',
                url: '/list',
                icon: <MenuBookIcon/>
            }
        ]

    },
    {
        title: 'Channel Master',
        url: '/channel',
        icon: <DeviceHubIcon/>,
        controller: 'ChannelMasters',
        subMenu: [
            {
                title: 'Add Channel',
                url: '/add',
                icon: <DeviceHubIcon/>
            },
            {
                title: 'List Channels',
                url: '/list',
                icon: <ListAltIcon/>
            }
        ]

    },
    {
        title: 'Admin User',
        url: '/user',
        icon: <SupervisorAccountIcon/>,
        controller: 'Users',
        subMenu: [
            {
                title: 'Add User',
                url: '/add',
                icon: <PersonAddAltIcon/>
            },
            {
                title: 'List Users',
                url: '/list',
                icon: <ListAltIcon/>
            },
            {
                title: 'Role & Permission',
                url: '/role',
                icon: <LockPersonIcon/>,
                controller: 'Role'
            }
        ]

    },
   

];
export default navMenu;