import React, { useEffect, useState, useContext } from 'react';
import { connect, useDispatch, useSelector } from "react-redux";
import Login from "./auth/Login";
import {getNoticeState} from "../../core/state/selectors";
import { isAuthenticated, getUser } from "../../backend/state/selectors";
import Loader from "../../core/_component/Loader"
import GlobalAlert from '../../core/_component/notice/GlobalAlert';
import Admin from './admin';
import { currentUsersApi } from '../../backend/state/data-layer/users'

const App = ((props: any) => {
    const dispatch = useDispatch();
    const items = useSelector(getNoticeState);
    const isAuth= useSelector(isAuthenticated)
    const [notices, setNotices] = useState({});
    useEffect(() => {
        setNotices(items);
    });
    useEffect(()=>{
        dispatch(currentUsersApi())
    }, [])

    return (
        <React.Suspense fallback={<Loader />}>
            <GlobalAlert items={notices} />
            {isAuth ? <Admin /> : <Login />}
        </React.Suspense>
    );
});

export default App;



