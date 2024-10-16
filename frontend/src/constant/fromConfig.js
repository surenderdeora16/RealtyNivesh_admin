import DEFAULT_IMAGE from "../assets/images/admin/team/avatar.png"
export { DEFAULT_IMAGE };

export const FILE_SIZE = 2 * 1024 * 1024;
export const MAX_INPUT_AMOUNT = 100000000;

export const SUPPORTED_FORMATS_IMAGE = [
    "image/jpg",
    "image/jpeg",
    "image/gif",
    'image/png'
];

export const PHONE_REG_EXP = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;


export const ENQUERY_FORM_TYPES = [
    { label: "Get In Touch", value: 1 },
    { label: "Model Form", value: 2 },
    { label: "Site Visit", value: 3 },
]

export const CONFIG_GST = 18