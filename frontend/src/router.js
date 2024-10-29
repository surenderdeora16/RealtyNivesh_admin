import { createBrowserRouter } from "react-router-dom";

const routes = [
    {
        path: "/",
        lazy: async () => {
            let module = await import("./layouts/AdminLayout");
            return { Component: module.default };
        },
        children: [
            {
                index: true,
                lazy: async () => {
                    let module = await import("./routes/admin/Dashboard");
                    return { Component: module.default };
                },
            },
            {
                path: "dashboard",
                lazy: async () => {
                    let module = await import("./routes/admin/Dashboard");
                    return { Component: module.default };
                },
            },  
            {
                path: "profile",
                lazy: async () => {
                    let module = await import("./routes/admin/auth/Profile");
                    return { Component: module.default };
                },
            },
            {
                path: "enquiry/sushmagroup",
                lazy: async () => {
                    let module = await import("./routes/admin/enquiries/SushmaGroup");
                    return { Component: module.default };
                },
            },
            {
                path: "enquiry/sushmaelementa",
                lazy: async () => {
                    let module = await import("./routes/admin/enquiries/SushmaElementa");
                    return { Component: module.default };
                },
            },
            {
                path: "general-settings/:type",
                lazy: async () => {
                    let module = await import("./routes/admin/GeneralSettings");
                    return { Component: module.default };
                },
            },
            {
                path: "logout",
                lazy: async () => {
                    let module = await import("./routes/admin/auth/Logout");
                    return { Component: module.default };
                },
            },



        ],
    },
    {
        path: "/",
        lazy: async () => {
            let module = await import("./layouts/AdminAuthLayout");
            return { Component: module.default };
        },
        children: [
            {
                path: 'login',
                lazy: async () => {
                    let module = await import("./routes/admin/auth/Login");
                    return { Component: module.default };
                },
            },
            {
                path: 'forgot-password',
                lazy: async () => {
                    let module = await import("./routes/admin/auth/ForgetPassword");
                    return { Component: module.default };
                },
            },
            {
                path: 'reset-password/:token',
                lazy: async () => {
                    let module = await import("./routes/admin/auth/ResetPassword");
                    return { Component: module.default };
                },
            },
            {
                path: "*",
                lazy: async () => {
                    let module = await import("./routes/admin/errors/NotFoundPage");
                    return { Component: module.default };
                },
            },
        ]
    }
];

const routerConfig = {
    basename: import.meta.env.BASE_URL
};

export default createBrowserRouter(routes, routerConfig);