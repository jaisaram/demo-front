import React from 'react';
import { useSelector } from 'react-redux';
import { getUser } from '../../../../state/selectors';
const Welcome = (props: any) => {
    const currentUser = useSelector(state => getUser(state));
    return (
        <>
            <img id={"img-profile"} src={"/assets/images/demoUserLogin.webp"} width={'40%'} alt={"Demo User DashBoard"} />
            <h3>{`Welcome ${currentUser.name}!`}</h3>
            <p>Hi, We are DevHub and we are providing software solutions.
                <br /> If you thing something regards software you can defiantly reach out here: <a href={"/"}>www.obliger.com</a> </p>
        </>
    );
}

export default Welcome;
