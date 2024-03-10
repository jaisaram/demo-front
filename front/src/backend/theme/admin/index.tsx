import React, { useState } from 'react';
import AppRoutesHelper from '../routes/helper';
import AdminRoutes from '../admin/modules/routes';

const Admin = () => {
    return (<><AppRoutesHelper routes={AdminRoutes}/></>);
}

export default Admin;
