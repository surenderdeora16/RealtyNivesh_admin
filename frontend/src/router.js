import { createBrowserRouter } from "react-router-dom";

const routes = [
    // {
    //     path: "/",
    //     lazy: async () => {
    //         let module = await import("./layouts/MainLayout");
    //         return { Component: module.default };
    //     },
    //     children: [
    //         {
    //             index: true,
    //             lazy: async () => {
    //                 let module = await import("./routes/Home");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "home",
    //             lazy: async () => {
    //                 let module = await import("./routes/Home");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "about",
    //             lazy: async () => {
    //                 let module = await import("./routes/About");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "privacy-policy",
    //             lazy: async () => {
    //                 let module = await import("./routes/PrivacyPolicy");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "cancellation-refund-policy",
    //             lazy: async () => {
    //                 let module = await import("./routes/RefundPolicy");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "contact-us",
    //             lazy: async () => {
    //                 let module = await import("./routes/ContactUs");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "join-us",
    //             lazy: async () => {
    //                 let module = await import("./routes/JoinUs");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "programs/wellness-retreats",
    //             lazy: async () => {
    //                 let module = await import("./routes/programs/WellnessRetreats");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "programs/corporate-wellness",
    //             lazy: async () => {
    //                 let module = await import("./routes/programs/CorporateWellness");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "programs/online-programs",
    //             lazy: async () => {
    //                 let module = await import("./routes/programs/OnlineProgram");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "programs/wellness-retreats/:slug",
    //             lazy: async () => {
    //                 let module = await import("./routes/programs/wellness-retreats/ProgramDetails");
    //                 return { Component: module.default };
    //             },
    //         },

    //         {
    //             path: "programs/corporate-wellness/:slug",
    //             lazy: async () => {
    //                 let module = await import("./routes/programs/corporate-wellness/ProgramDetails");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "know-yourself",
    //             lazy: async () => {
    //                 let module = await import("./routes/KnowYourSelf");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "know-yourself/prakruti-assessment-quiz",
    //             lazy: async () => {
    //                 let module = await import("./routes/know-yourself/PrakrutiAssessment");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "know-yourself/tox-level-assessment-quiz",
    //             lazy: async () => {
    //                 let module = await import("./routes/know-yourself/ToxLevelAssessment");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "Register",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/auth/Register");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "*",
    //             lazy: async () => {
    //                 let module = await import("./routes/Errors/NotFoundPage");
    //                 return { Component: module.default };
    //             },
    //         },
    //     ],
    // },


    // {
    //     path: "/user",
    //     lazy: async () => {
    //         let module = await import("./layouts/UserLayout");
    //         return { Component: module.default };
    //     },
    //     children: [
    //         {
    //             index: true,
    //             lazy: async () => {
    //                 let module = await import("./routes/user/Dashboard");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "dashboard",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/Dashboard");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "profile",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/auth/Profile");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "programs/wellness-retreats/booking/:slug",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/BookRetreats");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "booking-history",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/BookingHistory");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "programs/online-programs/booking",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/BookOnlineProgram");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "payment",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/payment/Payment");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "payment-response",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/payment/PaymentResponse");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "logout",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/auth/Logout");
    //                 return { Component: module.default };
    //             },
    //         },

    //     ],
    // },

    // {
    //     path: "/user",
    //     lazy: async () => {
    //         let module = await import("./layouts/UserAuthLayout");
    //         return { Component: module.default };
    //     },
    //     children: [
    //         {
    //             path: 'login',
    //             lazy: async () => {
    //                 let module = await import("./routes/user/auth/Login");
    //                 return { Component: module.default };
    //             },
    //         },
    //         {
    //             path: "*",
    //             lazy: async () => {
    //                 let module = await import("./routes/user/errors/NotFoundPage");
    //                 return { Component: module.default };
    //             },
    //         },
    //     ]
    // },

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
                path: "/admin/dashboard",
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
            // {
            //     path: "retreat",
            //     lazy: async () => {
            //         let module = await import("./routes/admin/retreat/Retreat");
            //         return { Component: module.default };
            //     },
            // },
            // {
            //     path: "retreat/add",
            //     lazy: async () => {
            //         let module = await import("./routes/admin/retreat/AddRetreat");
            //         return { Component: module.default };
            //     },
            // },
            // {
            //     path: "retreat/edit/:slug",
            //     lazy: async () => {
            //         let module = await import("./routes/admin/retreat/EditRetreat");
            //         return { Component: module.default };
            //     },
            // },

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
                path: "enquiry",
                lazy: async () => {
                    let module = await import("./routes/admin/Enquiry");
                    return { Component: module.default };
                },
            },
            // {
            //     path: "users",
            //     lazy: async () => {
            //         let module = await import("./routes/admin/Users");
            //         return { Component: module.default };
            //     },
            // },
            // {
            //     path: "discount-coupons",
            //     lazy: async () => {
            //         let module = await import("./routes/admin/DiscountCoupon");
            //         return { Component: module.default };
            //     },
            // },
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