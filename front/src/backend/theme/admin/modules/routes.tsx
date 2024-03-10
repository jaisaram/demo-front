import React from 'react';
import { IAppRoutes } from "../../routes/helper";

const AppRoutes: Array<IAppRoutes> = [
    {
        moduleName: "dashboard",
        slug: "/",
        sidebar: React.lazy(() => import("./sidebar")),
        items: [
            {
                pattern: [
                    "/", "/dashboard"
                ],
                component: React.lazy(() => import("./Dashboard/Dashboard")),
                breadcrumbTitle: "Dashboard",
            },
            {
                pattern: [
                    "/company", "/company/list"
                ],
                component: React.lazy(() => import("./Company")),
                breadcrumbTitle: "Company Master",

            },
            {
                pattern: [
                    "/company/add", 
                ],
                component: React.lazy(() => import("./Company/AddCompanyMaster")),
                breadcrumbTitle: "Company Master",

            },
            {
                pattern: [
                    "/company/edit/:id", 
                ],
                component: React.lazy(() => import("./Company/AddCompanyMaster")),
                breadcrumbTitle: "Company Master",

            },
            {
                pattern: [
                    "/bank", "/bank/list"
                ],
                component: React.lazy(() => import("./Bank")),
                breadcrumbTitle: "Bank Master",

            },
            {
                pattern: [
                    "/bank/add", 
                ],
                component: React.lazy(() => import("./Bank/AddBankMaster")),
                breadcrumbTitle: "Bank Master",

            },
            {
                pattern: [
                    "/bank/edit/:id", 
                ],
                component: React.lazy(() => import("./Bank/AddBankMaster")),
                breadcrumbTitle: "Bank Master",

            },
            {
                pattern: [
                    "/product", "/product/list"
                ],
                component: React.lazy(() => import("./Product")),
                breadcrumbTitle: "Product Master",

            },
            {
                pattern: [
                    "/product/add", 
                ],
                component: React.lazy(() => import("./Product/AddProductMaster")),
                breadcrumbTitle: "Product Master",

            },
            {
                pattern: [
                    "/product/edit/:id", 
                ],
                component: React.lazy(() => import("./Product/AddProductMaster")),
                breadcrumbTitle: "Product Master",

            },
            {
                pattern: [
                    "/channel/", "/channel/list"
                ],
                component: React.lazy(() => import("./Channel")),
                breadcrumbTitle: "Channel Master",

            },
            {
                pattern: [
                    "/channel/add", 
                ],
                component: React.lazy(() => import("./Channel/AddChannelMaster")),
                breadcrumbTitle: "Channel Master",

            },
            {
                pattern: [
                    "/channel/edit/:id", 
                ],
                component: React.lazy(() => import("./Channel/AddChannelMaster")),
                breadcrumbTitle: "Channel Master",

            },
            {
                pattern: [
                    "/user/", "/user/list"
                ],
                component: React.lazy(() => import("./Users")),
                breadcrumbTitle: "Users",

            },
            {
                pattern: [
                    "/user/add", 
                ],
                component: React.lazy(() => import("./Users/AddUser")),
                breadcrumbTitle: "User",

            },
            
            {
                pattern: [
                    "/user/edit/:id", 
                ],
                component: React.lazy(() => import("./Users/AddUser")),
                breadcrumbTitle: "User Edit",

            },
            {
                pattern: [
                    "/user/profile", 
                ],
                component: React.lazy(() => import("./Profile/AddProfile")),
                breadcrumbTitle: "Profile",

            },
            {
                pattern: [
                    "/user/role", "/user/role/list"
                ],
                component: React.lazy(() => import("./Roles")),
                breadcrumbTitle: "Roles",

            },
            {
                pattern: [
                    "/user/role/add", 
                ],
                component: React.lazy(() => import("./Roles/AddRole")),
                breadcrumbTitle: "Role",

            },
            
            {
                pattern: [
                    "/user/role/edit/:id", 
                ],
                component: React.lazy(() => import("./Roles/AddRole")),
                breadcrumbTitle: "Role Edit",

            }
        ]
    },
 
]
export default AppRoutes