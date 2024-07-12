import {Config} from './Config';
// import {toast} from "react-toastify";
// import {LoadingOutlined} from "@ant-design/icons";

function GetProfile() {
    const val = sessionStorage.getItem('profile');

    if (val !== 'undefined') {
        return JSON.parse(val);
    }
    return {};
}

function GetListMode() {
    const val = sessionStorage.getItem('listMode');
    if (val) {
        return val.toString();
    }

    return 'grid';
}

function GetToken() {
    const val = sessionStorage.getItem('accessToken');
    if (val !== 'undefined') {
        return val;
    }
    return {};
}

function GetCurrentRole() {
    const val = sessionStorage.getItem('currentRole');

    if (val !== 'undefined') {
        return JSON.parse(val);
    }
    return {};
}

function showSideBar() {
    const val = sessionStorage.getItem('showSideBar');
    if (val !== 'undefined' && val !== null) {
        return JSON.parse(val);
    }

    return 0;
}

function GetReload() {
    const val = sessionStorage.getItem('rld');
    if (val !== 'undefined') {
        return 0;
    }
    return 0;
}

function RoleCodes() {
    const val = sessionStorage.getItem('roleCodes');
    if (val !== 'undefined') {
        return JSON.parse(val);
    }
    return {};
}

function RolesLength() {
    const val = sessionStorage.getItem('rolesLength');
    if (val !== 'undefined') {
        return JSON.parse(val);
    }
    return {};
}

function GetRoles() {
    const val = localStorage.getItem('ROLES');

    if (val !== 'undefined') {
        return JSON.parse(val);
    }
    return {};
}
function storageHasValue(key) {
    if (sessionStorage.getItem(key) !== undefined) {
        if (sessionStorage.getItem(key) !== null && sessionStorage.getItem(key) !== '') {
            return sessionStorage.getItem(key);
        }
    }

    return '';
}

function getYearId() {
    return storageHasValue('year_id');
}

function getYearDesc() {
    return storageHasValue('year_desc');
}
function getQuarterId() {
    return storageHasValue('quarter_id');
}

function CheckSession(profile) {
    return !(profile === "" || profile === null);
}

function capitalizeFirstLetter(string) {
    string = string.toLowerCase();
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const backHome = async () => {
    window.location.replace(Config.intranet);
}

async function logout() {
    return new Promise((resolve) => {
        setTimeout(() => {
            sessionStorage.removeItem('profile');
            sessionStorage.removeItem('roles');
            sessionStorage.removeItem('currentRole');
            sessionStorage.removeItem('accessToken');
            resolve();
            backHome();
        }, 1000);
    });
}

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

function timeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    let timeOfDay = "Morning";

    if (hours >= 12 && hours < 17) {
        timeOfDay = "Afternoon";
    } else if (hours >= 17 && hours < 24) {
        timeOfDay = "Evening";
    }

    return timeOfDay;
}

function currencyFormat(num, currency) {
    return currency + ' ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' '
}

const getNum = str => /[-+]?[0-9]*\.?[0-9]+/.test(str) ? parseFloat(str) : 0;

const numFormat = (n) => {
    const val = Math.round(Number(n) * 100) / 100;
    const parts = val.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : '');
};

function extractDate(inputDate) {
    const date = new Date(inputDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1.
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

function errorToast(message) {
    toast.error(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

function toastNow(message, type) {
    toast.type(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

// function loadingToast() {
//     return toast.loading("Please wait we are fetching data...", {
//         position: "bottom-left",
//         closeOnClick: true,
//         theme: "dark"
//     });
// }

function updatingToast(id, loadingFunc, message, toastType) {
    toast.update(id, {
        render: message,
        position: "bottom-left",
        closeOnClick: true,
        theme: "dark",
        autoClose: 5000,
        type: toastType,
        isLoading: loadingFunc
    });
}

// const LoaderIcon = (
//     <LoadingOutlined
//         style={{
//             fontSize: 14,
//             color: '#ffffff',
//             marginRight: 8,
//         }}
//         spin
//     />
// );

// const loadingToast = toast.loading("Please wait...")


const GetBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    console.log(file);
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
});


function removeCommas(value) {
    return value.toString().replace(/,/g, '');
}

const removeDuplicates = (d) => {
    const flag = {};
    const unique = [];
    d.forEach(e => {
        if (!flag[e.file_name]) {
            flag[e.file_name] = true;
            unique.push(e);
        }
    });
    return unique;
}

const ShortenTitle = ({title, maxLength}) => {
    if (!title || typeof title !== 'string') {
        return null; // Handle invalid or missing title
    }

    if (title.length <= maxLength) {
        return <span>{title}</span>; // No need to shorten
    }

    const shortenedTitle = title.substring(0, maxLength) + '...';

    return <span title={title}>{shortenedTitle}</span>;
};

const numberOfDays = (fromDate, toDate) => {
    try {
        let parts1 = fromDate.split('/');
        let parts2 = toDate.split('/');

        let nominationDate1 = new Date(parts1[2], parts1[1] - 1, parts1[0]);
        let nominationDate2 = new Date(parts2[2], parts2[1] - 1, parts2[0]);

        let diffTime = Math.abs(nominationDate2 - nominationDate1);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    } catch (e) {
        return 0;
    }
}

const toCamelCase = (input) => {
    return input.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase());
};

const base64toBlob = (data) => {
    // Cut the prefix `data:application/pdf;base64` from the raw base 64
    // const base64WithoutPrefix = data?.substr('data:application/pdf;base64,'.length);

    const bytes = atob(data);
    let length = bytes.length;
    let out = new Uint8Array(length);

    while (length--) {
        out[length] = bytes.charCodeAt(length);
    }

    return new Blob([out], {type: 'application/pdf'});
};


export {
    getYearId,
    getYearDesc,
    getQuarterId,
    ShortenTitle,
    base64toBlob,
    toCamelCase,
    updatingToast,
   // loadingToast,
    timeOfDay,
    GetBase64,
    removeDuplicates,
    // LoaderIcon,
    GetProfile,
    extractDate,
    GetReload,
    logout,
    backHome,
    CheckSession,
    GetToken,
    GetCurrentRole,
    GetRoles,
    classNames,
    GetListMode,
    showSideBar,
    RoleCodes,
    getNum,
    //numFormat,
    RolesLength,
    currencyFormat,
    errorToast,
    removeCommas,
    capitalizeFirstLetter, numberOfDays
}