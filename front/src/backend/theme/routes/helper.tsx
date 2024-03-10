import * as React from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import PageNotFound from "../../../backend/theme/pagenotfound";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import MainLayOut from "../../../core/_component/MainLayOut";
import SidebarLayOut from "../../../core/_component/SidebarLayOut";
import Loader from "../../../core/_component/Loader";

export interface IAppRoutes {
    moduleName: string
    slug: string
    breadcrumbs?: any
    sidebar?: any
    items: Array<{
        pattern: Array<string>
        component: any
        breadcrumbs?: any
        sidebar?: any
        sidebarWithBreadcrumbs?: boolean
        slug?: any
        breadcrumbTitle?: string;

    }>
}

export interface Props {
    routes: Array<IAppRoutes>
}

const AppRoutesHelper = React.memo(function (props: Props) {
    const location = useLocation()

    const siteNav = location.pathname === "/";
    const defaultNav = location.pathname !== "/dashboard";

    //const navigate = useNavigate()
    return (
        <Routes>
            {props && props.routes.map(module => {
                const ModuleSidebar = module.sidebar
                const ModuleSlug = (module.slug || "")
                return module?.items?.map(v => {

                    return v?.pattern?.map((path, key) => {
                        const ElementComponent = v.component
                        const SidebarComponent = v.sidebar
                        let url = '';
                        if (v.slug !== path && ModuleSlug !== path) {
                            url = (v.slug ? v.slug : ModuleSlug);
                        }
                        url += path;

                        const isSidebar = !!(SidebarComponent || ModuleSidebar)

                        return <Route key={key} path={url} element={<>

                            <MainLayOut>
                                {isSidebar &&
                                    <SidebarLayOut key={"sidebar_" + key} logoUrl={"/assets/images/demoUserLogin.webp"} title={v.breadcrumbTitle} >
                                        {SidebarComponent && <SidebarComponent key={"sidebar_in_" + key} />}
                                        {!SidebarComponent && ModuleSidebar && <ModuleSidebar key={key + 'side'} />}
                                    </SidebarLayOut>
                                }

                                <Box
                                    component="main"
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[100]
                                                : theme.palette.grey[900],
                                        flexGrow: 1,
                                        height: '100vh',
                                        overflow: 'auto',
                                    }}
                                >
                                    <Toolbar />
                                    <Container maxWidth={false} sx={{ padding: '0 !important' }}>
                                        <React.Suspense fallback={<Loader />}>
                                            <ElementComponent path={location.pathname} location={location} />
                                        </React.Suspense>
                                    </Container>
                                </Box>


                            </MainLayOut>

                        </>} />
                    })
                })
            })}

            {!defaultNav && <>
                <Route path={"/404"} element={<PageNotFound />} />
                <Route path="*" element={<Navigate to="/404" />} />
            </>}

            {siteNav && <Route path="/" element={<Navigate to="/" />} />}
            {defaultNav && <Route path="*" element={<Navigate to="/" />} />}

        </Routes>

    );
})

export default AppRoutesHelper;
