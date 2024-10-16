export default [
    {
        name: "Dashboard",
        icon: "fa-solid fa-gauge-high",
        url: `/dashboard`
    },
    // {
    //     name: "Retreats",
    //     icon: "fa-solid fa-bench-tree",
    //     url: `/admin/retreat`
    // },
    // {
    //     name: "Retreats",
    //     icon: "fa-solid fa-bench-tree",
    //     url: `/admin/retreat`
    // },
    // {
    //     name: "Enquiry",
    //     icon: "fa-solid fa-address-card",
    //     url: `/enquiry`
    // },
    // {
    //     name: "Users",
    //     icon: "fa-duotone fa-user-hair",
    //     url: `/admin/users`
    // },
    // {
    //     name: "Discount Coupons",
    //     icon: "fa-duotone fa-tags",
    //     url: `/admin/discount-coupons`
    // },
    {
        name: "Enquiries",
        icon: "fa-solid fa-address-card",
        children: [
            {
                name: "Sushma Group",
                url: `/enquiry/sushmagroup`,
            },  
            {
                name: "Sushma Elementa",
                url: `/enquiry/sushmaelementa`,
            },
            // {
            //     name: "Social Links Setting",
            //     url: `/admin/general-settings/3`,
            // },
        ]
    },

    {
        name: "Site Setting",
        icon: "fa-solid fa-gear fa-spin",
        children: [
            {
                name: "General Setting",
                url: `/general-settings/1`,
            },
            {
                name: "Email Setting",
                url: `/general-settings/2`,
            },
            {
                name: "Social Links Setting",
                url: `/general-settings/3`,
            },
        ]
    },
]
