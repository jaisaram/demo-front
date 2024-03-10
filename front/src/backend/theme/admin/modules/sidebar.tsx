import * as React from 'react';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import navMenu from './navMenu';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sidebarCollapseSelector, getCurrentUserRole } from '../../../state/selectors';
import { requestSidebarCollapse } from '../../../state/actions';
import { Link } from 'react-router-dom';

const mainListItems = React.memo(() => {
    const location = useLocation();
    const dispatch = useDispatch();
    const path = location.pathname.replace(/^\/|\/$/g, '').split('/').slice();
    const sideMenuCollapse = useSelector(sidebarCollapseSelector);
    const getRoleOfCurrentUser = useSelector(getCurrentUserRole);
   
    React.useEffect(() => {
        const index = navMenu.findIndex(x => x.url === `/${path[0]}` && x.subMenu);
        let menu: any = { url: null, index: null };
        if (index > -1) {
            menu = { url: `/${path[0]}`, index: index };
        }
        dispatch(requestSidebarCollapse(menu));
        
    }, []);


    const handleClick = (i: number) => {
        dispatch(requestSidebarCollapse({ url: `/${path[0]}`, index: i }));
    };
    
    return (
        <React.Fragment>
            {navMenu.map((items, i) => {
                const permission = items.controller ? (getRoleOfCurrentUser.filter((perm:any)=> items.controller && perm 
                && perm[items.controller]))[0]: [];
                let showMenu = !items.controller  ;
                if (permission && items.controller && permission[items.controller].length > 0) {
                    showMenu = true;
                }
                return (
                    <div key={i + 'main_'}>
                        {items && !items.subMenu && showMenu &&
                            <Link key={i + 'link'} to={items.url} style={{textDecoration: 'none',  color: 'inherit' }} className={""} >
                                <ListItemButton selected={items.url === location.pathname} onClick={(e)=>{
                                    handleClick(i);
                                }}>
                                    <ListItemIcon >
                                        {items.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={items.title} />
                                </ListItemButton>
                            </Link>}

                        {items && showMenu && items.subMenu && <ListItemButton selected={sideMenuCollapse && sideMenuCollapse.index === i} key={i + 'main'} onClick={() => {
                            
                            items && items.subMenu && sideMenuCollapse && sideMenuCollapse.index !== i && handleClick(i)
                        }}>
                            <ListItemIcon>
                                {items.icon}
                            </ListItemIcon>
                            <ListItemText primary={items.title} />
                            {items && items.subMenu ? (sideMenuCollapse && sideMenuCollapse.index === i ? <ExpandLess /> : <ExpandMore />) : ""}
                        </ListItemButton>}
                        {items &&  showMenu && items.subMenu && items.subMenu.map((item, n) => {
                            return (
                                <Collapse key={n + '_' + item.title} in={sideMenuCollapse && sideMenuCollapse.index === i} timeout="auto" >
                                    <Link to={items.url + item.url} style={{ textDecoration: 'none', color: 'inherit' }} className={""}>
                                        <List component="div" disablePadding>
                                            <ListItemButton sx={{ pl: 4, }}>
                                                <ListItemIcon>
                                                    {item.icon}
                                                </ListItemIcon>
                                                <ListItemText primary={item.title} />
                                            </ListItemButton>
                                        </List>
                                    </Link>
                                </Collapse>
                            )
                        })}
                    </div>

                )
            }

            )}
        </React.Fragment>
    );
})

export default mainListItems;

