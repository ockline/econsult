import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import ALLImages from "../../../../common/imagesdata";
import Select from "react-select";
import { ProfileHomeData } from "../../../../common/select2data";
import ProfileService from "../../../../common/profileservices";
import { HomeGallery } from "../../../advancedUi/filemanager/filedetails/filedetailscarcousel";
import { TagsInput } from "react-tag-input-component";
import { Helmet } from "react-helmet";
const Home = () => {
    const [selected, setSelected] = useState([
        "Laravel",
        "Angular",
        "Html",
        "VueJs",
        "React",
        "Codeignator",
        "Javascript",
        "Bootstarp",
        "Php",
    ]); // react-tag-input-component

    //URl image
    const [UrlImage, setUrlImage] = useState(ALLImages("png106"));
    //Disabling input feild
    const [UrlDisabled, setUrlDisabled] = useState(true);

    const [fileDisabled, setfileDisabled] = useState(false);
    //Default image
    const [Image, setImage] = useState(ALLImages("png106"));

    let location = useLocation();

    const putImage = () => {
        setImage(ProfileService.returnImage());
        if (UrlImage != Image) {
            ProfileService.handleChangeUrl(UrlImage);
            setImage(ProfileService.returnImage());
        }
        // setSmShow(false)
    };

    //toggle button for image
    const toggleImage = (type) => {
        if (type == "fileDisabled") {
            setfileDisabled(false);
            setUrlDisabled(true);
        }
        if (type == "UrlDisabled") {
            setUrlDisabled(false);
            setfileDisabled(true);
        }
    };
    const [ClassName, setClassName] = useState();

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [performance, setPerformance] = useState(null);
    const [performanceLoading, setPerformanceLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (token) {
            axios.get(`${apiBaseUrl}/user_activities/performance?days=30`, {
                headers: { Authorization: `Bearer ${token}` },
            })
                .then((res) => setPerformance(res.data))
                .catch(() => setPerformance(null))
                .finally(() => setPerformanceLoading(false));
        } else {
            setPerformanceLoading(false);
        }
    }, [apiBaseUrl]);

    useEffect(() => {
        if (ProfileService.returnImage() != undefined) {
            setImage(ProfileService.returnImage());
        }
        let contactItem = document.querySelectorAll(".main-contact-item");
        contactItem.forEach((ele) => {
            ele.addEventListener("click", () => {
                setClassName("main-content-body-show");
            });
        });
    }, [location]);

    return (
        <div>
            <Helmet>
                <body class={ClassName}></body>
            </Helmet>
            <div className="flex relative before:bg-black/50 before:absolute before:w-full before:h-full">
                <img
                    src={Image}
                    alt=""
                    className="h-[500px] w-full rounded-sm"
                    id="profile-img2"
                />

                <button
                    type="button"
                    className="absolute top-5 ltr:right-5 rtl:left-5 flex p-3 rounded-sm ring-1 ring-black/10 text-white bg-black/10 leading-none"
                    data-hs-overlay="#hs-small-modal"
                >
                    <i className="ri ri-pencil-line ltr:mr-2 rtl:ml-2"></i>{" "}
                    <span>Change Profile Pic</span>
                </button>

                <div id="hs-small-modal" className="hs-overlay hidden ti-modal">
                    <div className="hs-overlay-open:mt-7 ti-modal-box mt-0 ease-out">
                        <div className="ti-modal-content">
                            <div className="ti-modal-body">
                                <div
                                    onClick={() => {
                                        toggleImage("fileDisabled");
                                    }}
                                >
                                    <label
                                        htmlFor="file-input"
                                        className="sr-only"
                                    >
                                        Choose file
                                    </label>
                                    <input
                                        type="file"
                                        name="file-input"
                                        id="file-input"
                                        disabled={fileDisabled}
                                        onChange={(ele) =>
                                            ProfileService.handleChange(ele)
                                        }
                                        className=" inset-0 block w-full h-full cursor-pointer border my-2 border-gray-200 focus:shadow-sm dark:focus:shadow-white/10 rounded-sm text-sm focus:z-10 focus:outline-0 focus:border-gray-200 dark:focus:border-white/10 dark:border-white/10 dark:text-white/70 file:bg-transparent file:border-0 file:bg-gray-100 ltr:file:mr-4 rtl:file:ml-4 file:py-3 file:px-4 dark:file:bg-black/20 dark:file:text-white/70"
                                    />
                                </div>
                                <div
                                    onClick={() => {
                                        toggleImage("UrlDisabled");
                                    }}
                                >
                                    <input
                                        type="text"
                                        className="my-auto ti-form-input"
                                        name="basic-input"
                                        id="basic-input"
                                        disabled={UrlDisabled}
                                        onChange={(ele) => {
                                            setUrlImage(ele.target.value);
                                        }}
                                        placeholder="Paste the URL"
                                    />
                                </div>
                                <br />
                                <button
                                    type="button"
                                    onClick={() => {
                                        putImage();
                                    }}
                                    className="py-1 px-3 ti-btn ti-btn-primary text-sm m-0"
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute top-28 inset-x-0 text-center space-y-3">
                <div className="flex justify-center w-full">
                    <div className="relative cursor-pointer">
                        <img
                            src={ALLImages("jpg57")}
                            className="w-24 h-24 rounded-full ring-4 ring-white/10 mx-auto"
                            id="profile-img"
                            alt="profile-img"
                        />

                        <span className="absolute bottom-0 ltr:right-0 rtl:left-0 block p-1 rounded-full ring-2 ring-white/10 text-white bg-white/10 dark:bg-bgdark leading-none cursor-pointer">
                            <i className="ri ri-pencil-line cursor-pointer"></i>
                            <input
                                type="file"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                id="profile-change"
                            ></input>
                        </span>
                    </div>
                </div>
                <div className="text-white">
                    <h2 className="text-base font-semibold">Ockline Msungu</h2>
                    <p className="text-xs text-white/50">
                        ocklinemwanzelu@gmail.com
                    </p>
                </div>               
            </div>

            <div className="main-content -mt-28">
                <div className="grid grid-cols-12 gap-x-6">
                    <div className="col-span-12 xxl:col-span-3">
                        <div className="box">
                            <div className="box-header">
                                <div className="flex justify-between">
                                    <h5 className="box-title">About Me</h5>
                                </div>
                            </div>
                            <div className="box-body space-y-4">
                                <div className="space-y-3">
                                    <p>
                                        Lorem, ipsum dolor sit amet consectetur
                                        adipisicing elit.{" "}
                                    </p>
                                    <p>
                                        A odit dignissimos minima atque
                                        sapiente, eos mollitia amet officiis
                                        tempora voluptate laboriosam id
                                        perferendis nobis est vitae facere
                                        tenetur? Ut, nam?
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="box">
                            <div className="box-header">
                                <div className="flex justify-between">
                                    <h5 className="box-title">General Info</h5>
                                </div>
                            </div>
                            <div className="box-body py-3">
                                <div className="xl:overflow-hidden overflow-x-auto">
                                    <table className="ti-custom-table border-0">
                                        <tbody>
                                            <tr className="">
                                                <td className="font-medium !p-2">
                                                    Designation
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    Sr.Ui Developer
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    Joined
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    01 November 2019
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    Age
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">26</td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    City
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    Lake Park
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    Country
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">
                                                    Newyork
                                                </td>
                                            </tr>
                                            <tr className="!border-0">
                                                <td className="font-medium !p-2">
                                                    State
                                                </td>
                                                <td className="!p-2">:</td>
                                                <td className="!p-2">U.S.A</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="box">
                            <div className="box-header">
                                <h5 className="box-title">My Performance</h5>
                                <Link to={`${import.meta.env.BASE_URL}user/profile/setting`} className="text-xs text-primary hover:underline">Log activities</Link>
                            </div>
                            <div className="box-body py-3">
                                {performanceLoading ? (
                                    <p className="text-sm text-gray-500">Loading...</p>
                                ) : performance ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-gray-500 dark:text-white/70">Score (last 30 days)</span>
                                            <span className={`text-lg font-bold ${performance.performance_score >= 70 ? "text-success" : performance.performance_score >= 40 ? "text-warning" : "text-danger"}`}>
                                                {performance.performance_score}/100
                                            </span>
                                        </div>
                                        <div className="xl:overflow-hidden overflow-x-auto">
                                            <table className="ti-custom-table border-0">
                                                <tbody>
                                                    <tr><td className="font-medium !p-2">Activities</td><td className="!p-2">:</td><td className="!p-2">{performance.total_activities}</td></tr>
                                                    <tr className="!border-0"><td className="font-medium !p-2">Active days</td><td className="!p-2">:</td><td className="!p-2">{performance.days_with_activities}</td></tr>
                                                    <tr className="!border-0"><td className="font-medium !p-2">Avg rating</td><td className="!p-2">:</td><td className="!p-2">{performance.average_rating}/5</td></tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-500">Log daily activities in profile settings to see your performance.</p>
                                )}
                            </div>
                        </div>

                        <div className="col-span-12 xxl:col-span-8">
                            <div className="box">
                                <div className="box-header">
                                    <h5 className="box-title">Skills</h5>
                                </div>
                                <div className="box-body skills-box">
                                    <TagsInput
                                        className="badge bg-gray-100 dark:bg-black/20 dark:text-white text-gray-800 "
                                        value={selected}
                                        onChange={setSelected}
                                        name="ProductTag"
                                        placeHolder="Filter product"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 xxl:col-span-8">
                        <div className="box">
                            <div className="box-header">
                                <nav
                                    className="sm:flex sm:space-x-2 space-y-2 sm:space-y-0 rtl:space-x-reverse block"
                                    aria-label="Tabs"
                                    role="tablist"
                                >
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300 active"
                                        id="profile-item-1"
                                        data-hs-tab="#profile-1"
                                        aria-controls="profile-1"
                                        role="tab"
                                    >
                                        Profile
                                    </button>
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-2"
                                        data-hs-tab="#profile-2"
                                        aria-controls="profile-2"
                                        role="tab"
                                    >
                                        Activities
                                    </button>
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-3"
                                        data-hs-tab="#profile-3"
                                        aria-controls="profile-3"
                                        role="tab"
                                    >
                                        posts
                                    </button>
                                    <button
                                        type="button"
                                        className="hs-tab-active:bg-primary hs-tab-active:border-primary hs-tab-active:text-white dark:hs-tab-active:bg-primary dark:hs-tab-active:border-primary dark:hs-tab-active:text-white py-2 px-3 inline-flex items-center w-full justify-center gap-2 text-sm font-medium text-center border text-gray-500 rounded-sm hover:text-gray-700 dark:bg-black/20 dark:border-white/10 dark:text-white/70 dark:hover:text-gray-300"
                                        id="profile-item-4"
                                        data-hs-tab="#profile-4"
                                        aria-controls="profile-4"
                                        role="tab"
                                    >
                                        Projects
                                    </button>
                                </nav>
                            </div>
                            <div className="box-body">
                                <div
                                    id="profile-1"
                                    className=""
                                    role="tabpanel"
                                    aria-labelledby="profile-item-1"
                                >
                                    <h5 className="box-title mb-3">
                                        Basic Information
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap">
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        First name
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Anderson
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Last Name
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Itumay
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Birthday
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        03 September 1990
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Gender
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Female
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Languages
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Telugu ,Hindi , English
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <h5 className="box-title my-3">
                                        Contact Information
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap">
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Personal Contact No
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        +123(45)-158-90.
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Email Id
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        ocklinemwanzelu@gmail.com
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Address
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        ocklinemwanzelu@gmail.com
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        System link
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        www.ocklinemwanzelu.com
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70">
                                                        Linked in link
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        https://in.linkedin.com/andersonitumay
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <h5 className="box-title my-3">
                                        Education Information
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap">
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]">
                                                        School
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Studied at Makit Hight
                                                        school ,1-12th
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]">
                                                        Graduation
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Studied at Abc
                                                        University , Btech(cse)
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <h5 className="box-title my-3">
                                        Work Experience
                                    </h5>
                                    <div className="overflow-auto">
                                        <table className="ti-custom-table border-0 whitespace-nowrap">
                                            <tbody>
                                                <tr className="">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]">
                                                        Work1
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Web Designer at abc
                                                        ,2015 - 2018
                                                    </td>
                                                </tr>
                                                <tr className="!border-0">
                                                    <td className="!p-2 font-medium !text-gray-500 dark:!text-white/70 w-[252px]">
                                                        Work2
                                                    </td>
                                                    <td className="!p-2">:</td>
                                                    <td className="!p-2 !text-gray-500 dark:!text-white/70">
                                                        Sr. Ui Developer at abc
                                                        ,2018 - present
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div
                                    id="profile-2"
                                    className="hidden"
                                    role="tabpanel"
                                    aria-labelledby="profile-item-2"
                                >
                                    <div className="">
                                        <div className="flex flex-row">
                                            <div className="mx-auto relative">
                                                <div className="h-full w-6 flex items-center justify-center">
                                                    <div className="h-full w-[3px] bg-gray-100 dark:bg-black/20 pointer-events-none"></div>
                                                </div>
                                                <div className="avatar avatar-xs absolute top-0 rounded-full bg-gray-200 shadow text-center ltr:-left-[4px] rtl:-right-[4px]">
                                                    <img
                                                        src={ALLImages("jpg57")}
                                                        className="rounded-full"
                                                        alt="profile-img"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-full pb-8">
                                                <div className="ltr:ml-5 rtl:mr-5 rounded-sm ltr:mr-auto rtl:ml-auto my-auto w-full space-y-3">
                                                    <div className="sm:flex">
                                                        <h3 className="my-auto text-gray-500 dark:text-white/70">
                                                            <span className="text-dark dark:text-white">
                                                                Elida Distefa
                                                            </span>{" "}
                                                            added a comment to{" "}
                                                            <span className="text-dark dark:text-white">
                                                                Ockline Msungu
                                                            </span>{" "}
                                                            post
                                                        </h3>
                                                        <p className="my-auto ltr:ml-auto rtl:mr-auto text-gray-500 dark:text-white/70 text-xs">
                                                            Today, 04:30 PM
                                                        </p>
                                                    </div>
                                                    <div className="flex -space-x-2 rtl:space-x-reverse">
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg57"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg60"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg58"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg59"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="mx-auto relative">
                                                <div className="h-full w-6 flex items-center justify-center">
                                                    <div className="h-full w-[3px] bg-gray-100 dark:bg-black/20 pointer-events-none"></div>
                                                </div>
                                                <div className="avatar avatar-xs absolute top-0 rounded-full bg-gray-200 shadow text-center ltr:-left-[4px] rtl:-right-[4px]">
                                                    <img
                                                        src={ALLImages("jpg59")}
                                                        className="rounded-full"
                                                        alt="profile-img"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-full pb-8">
                                                <div className="ltr:ml-5 rtl:mr-5 rounded-sm ltr:mr-auto rtl:ml-auto my-auto w-full space-y-3">
                                                    <div className="sm:flex">
                                                        <h3 className="my-auto text-gray-500 dark:text-white/70">
                                                            <span className="text-dark dark:text-white">
                                                                Samantha Melon
                                                            </span>{" "}
                                                            added a 😎 reaction
                                                            to{" "}
                                                            <span className="text-dark dark:text-white">
                                                                Ockline Msungu
                                                            </span>{" "}
                                                            post
                                                        </h3>
                                                        <p className="my-auto ltr:ml-auto rtl:mr-auto text-gray-500 dark:text-white/70 text-xs">
                                                            Today, 04:30 PM
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="mx-auto relative">
                                                <div className="h-full w-6 flex items-center justify-center">
                                                    <div className="h-full w-[3px] bg-gray-100 dark:bg-black/20 pointer-events-none"></div>
                                                </div>
                                                <div className="avatar avatar-xs absolute top-0 rounded-full bg-gray-200 shadow text-center ltr:-left-[4px] rtl:-right-[4px]">
                                                    <img
                                                        src={ALLImages("jpg58")}
                                                        className="rounded-full"
                                                        alt="profile-img"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-full pb-8">
                                                <div className="ltr:ml-5 rtl:mr-5 rounded-sm ltr:mr-auto rtl:ml-auto my-auto w-full space-y-3">
                                                    <div className="sm:flex">
                                                        <h3 className="my-auto text-gray-500 dark:text-white/70">
                                                            <span className="text-dark dark:text-white">
                                                                Samantha Melon
                                                            </span>{" "}
                                                            like an Image
                                                        </h3>
                                                        <p className="my-auto ltr:ml-auto rtl:mr-auto text-gray-500 dark:text-white/70 text-xs">
                                                            Today, 05:45 PM
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <img
                                                            src={ALLImages(
                                                                "jpg11"
                                                            )}
                                                            className="avatar avatar-lg rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-row">
                                            <div className="mx-auto relative">
                                                <div className="h-full w-6 flex items-center justify-center">
                                                    <div className="h-full w-[3px] bg-gray-100 dark:bg-black/20 pointer-events-none"></div>
                                                </div>
                                                <div className="avatar avatar-xs absolute top-0 rounded-full bg-gray-200 shadow text-center ltr:-left-[4px] rtl:-right-[4px]">
                                                    <img
                                                        src={ALLImages("jpg71")}
                                                        className="rounded-full"
                                                        alt="profile-img"
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex w-full pb-8">
                                                <div className="ltr:ml-5 rtl:mr-5 rounded-sm ltr:mr-auto rtl:ml-auto my-auto w-full space-y-3">
                                                    <div className="sm:flex">
                                                        <h3 className="my-auto text-gray-500 dark:text-white/70">
                                                            <span className="text-dark dark:text-white">
                                                                Dennis Trexy
                                                            </span>{" "}
                                                            Shared an image
                                                        </h3>
                                                        <p className="my-auto ltr:ml-auto rtl:mr-auto text-gray-500 dark:text-white/70 text-xs">
                                                            yesterday, 10:20 am
                                                        </p>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <p className="text-xs textbg-gray-500">
                                                            Lorem ipsum dolor
                                                            sit amet consectetur
                                                            adipisicing elit.
                                                            Nostrum sit
                                                            consequuntur quia
                                                            aperiam quibusdam
                                                            rerum ut! Id ducimus
                                                            nobis rerum modi
                                                            veniam odit totam
                                                            rem asperiores
                                                            adipisci, sed quia
                                                            voluptas?
                                                        </p>
                                                        <img
                                                            src={ALLImages(
                                                                "jpg14"
                                                            )}
                                                            className="avatar avatar-lg rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="mx-auto relative">
                                            <div className="h-full w-6 flex items-center justify-center">
                                                <div className="h-full w-[3px] bg-gray-100 dark:bg-black/20 pointer-events-none"></div>
                                            </div>
                                            <div className="avatar avatar-xs absolute top-0 rounded-full bg-gray-200 shadow text-center ltr:-left-[4px] rtl:-right-[4px]">
                                                <img
                                                    src={ALLImages("jpg77")}
                                                    className="rounded-full"
                                                    alt="profile-img"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full pb-8">
                                            <div className="ltr:ml-5 rtl:mr-5 rounded-sm ltr:mr-auto rtl:ml-auto my-auto w-full space-y-3">
                                                <div className="sm:flex">
                                                    <h3 className="my-auto text-gray-500 dark:text-white/70">
                                                        <span className="text-dark dark:text-white">
                                                            Anesthesia
                                                        </span>
                                                        commented on today's
                                                        meeting
                                                    </h3>
                                                    <p className="my-auto ltr:ml-auto rtl:mr-auto text-gray-500 dark:text-white/70 text-xs">
                                                        yesterday, 05:06 pm
                                                    </p>
                                                </div>
                                                <div className="border border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10 p-4 rounded-sm">
                                                    <p className="text-xs textbg-gray-500">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit.
                                                        Nostrum sit consequuntur
                                                        quia aperiam quibusdam
                                                        rerum ut! Id ducimus
                                                        nobis rerum modi veniam
                                                        odit totam rem
                                                        asperiores adipisci, sed
                                                        quia voluptas?
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="mx-auto relative">
                                            <div className="h-full w-6 flex items-center justify-center">
                                                <div className="h-full w-[3px] bg-gray-100 dark:bg-black/20 pointer-events-none"></div>
                                            </div>
                                            <div className="avatar avatar-xs absolute top-0 rounded-full bg-gray-200 dark:bg-bgdark2 shadow text-center ltr:-left-[4px] rtl:-right-[4px] leading-[2.3]">
                                                H
                                            </div>
                                        </div>
                                        <div className="flex w-full pb-8">
                                            <div className="ltr:ml-5 rtl:mr-5 rounded-sm ltr:mr-auto rtl:ml-auto my-auto w-full space-y-3">
                                                <div className="sm:flex">
                                                    <h3 className="my-auto text-gray-500 dark:text-white/70">
                                                        <span className="text-dark dark:text-white">
                                                            Harvey Mattos
                                                        </span>{" "}
                                                        Followed You
                                                    </h3>
                                                    <p className="my-auto ltr:ml-auto rtl:mr-auto text-gray-500 dark:text-white/70 text-xs">
                                                        03-12-20222, 12:06 pm
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="mx-auto relative">
                                            <div className="h-full w-6 flex items-center justify-center">
                                                <div className="h-full w-[3px] bg-gray-100 dark:bg-black/20 pointer-events-none"></div>
                                            </div>
                                            <div className="avatar avatar-xs absolute top-0 rounded-full bg-gray-200 shadow text-center ltr:-left-[4px] rtl:-right-[4px]">
                                                <img
                                                    src={ALLImages("jpg71")}
                                                    className="rounded-full"
                                                    alt="profile-img"
                                                />
                                            </div>
                                        </div>
                                        <div className="flex w-full">
                                            <div className="ltr:ml-5 rtl:mr-5 rounded-sm ltr:mr-auto rtl:ml-auto my-auto w-full space-y-3">
                                                <div className="sm:flex">
                                                    <h3 className="my-auto text-gray-500 dark:text-white/70">
                                                        <span className="text-dark dark:text-white">
                                                            Anesthesia
                                                        </span>
                                                        5 Days left for Montly
                                                        submission of progress
                                                        report{" "}
                                                    </h3>
                                                    <p className="my-auto ltr:ml-auto rtl:mr-auto text-gray-500 dark:text-white/70 text-xs">
                                                        02-12-2022, 6:20 pm
                                                    </p>
                                                </div>
                                                <div className="border border-gray-200 bg-gray-50 dark:bg-black/20 dark:border-white/10 p-4 rounded-sm">
                                                    <p className="text-xs textbg-gray-500 mb-3">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit.
                                                        Nostrum sit consequuntur
                                                        quia aperiam quibusdam
                                                        rerum ut! Id ducimus
                                                        nobis rerum modi veniam
                                                        odit totam rem
                                                        asperiores adipisci, sed
                                                        quia voluptas?
                                                    </p>
                                                    <p className="text-xs textbg-gray-500">
                                                        Lorem ipsum dolor sit
                                                        amet consectetur
                                                        adipisicing elit.
                                                        
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    id="profile-3"
                                    className="hidden text-center"
                                    role="tabpanel"
                                    aria-labelledby="profile-item-3"
                                >
                                    <div className="box text-start">
                                        <div className="box-body p-0">
                                            <div className="sm:flex sm:space-x-3 space-y-2 sm:space-y-0 p-6 border-b border-gray-200 dark:border-white/10 rtl:space-x-reverse">
                                                <img
                                                    className="avatar avatar-sm rounded-full"
                                                    src={ALLImages("jpg57")}
                                                    alt="profile-img"
                                                />
                                                <div className="relative w-full">
                                                    <input
                                                        type="text"
                                                        className="ti-form-input ltr:pr-16 rtl:pl-16 rounded-full shadow-sm focus:z-10 bg-gray-100 dark:bg-black/20"
                                                        placeholder="What's On Your Mind .........."
                                                    />
                                                    <div className="absolute inset-y-0 ltr:right-8 rtl:left-8 flex items-center z-20 ltr:pr-4 rtl:pl-4">
                                                        <Link
                                                            aria-label="anchor"
                                                            to="#"
                                                        >
                                                            <i className="ri ri-emotion-line text-gray-500 dark:text-white/70 text-lg leading-none"></i>
                                                        </Link>
                                                    </div>
                                                    <div className="absolute inset-y-0 ltr:right-0 rtl:left-0 flex items-center z-20 ltr:pr-4 rtl:pl-4">
                                                        <Link
                                                            aria-label="anchor"
                                                            to="#"
                                                        >
                                                            <i className="ri ri-pencil-line text-gray-500 dark:text-white/70 text-lg leading-none"></i>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            <ul className="sm:flex sm:space-x-5 space-y-2 sm:space-y-0 flex-row p-6 rtl:space-x-reverse overflow-auto">
                                                <li>
                                                    <Link
                                                        className="flex space-x-1 rtl:space-x-reverse"
                                                        to="#"
                                                    >
                                                        <i className="ri ri-image-2-line text-lg leading-none text-primary"></i>
                                                        <span className="text-gray-500 dark:text-white/70">
                                                            Image
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="flex space-x-1 rtl:space-x-reverse"
                                                        to="#"
                                                    >
                                                        <i className="ri ri-vidicon-line text-lg leading-none text-secondary"></i>
                                                        <span className="text-gray-500 dark:text-white/70">
                                                            Video
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="flex space-x-1 rtl:space-x-reverse"
                                                        to="#"
                                                    >
                                                        <i className="ri ri-attachment-2 text-lg leading-none text-warning"></i>
                                                        <span className="text-gray-500 dark:text-white/70">
                                                            Attachment
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link
                                                        className="flex space-x-1 rtl:space-x-reverse"
                                                        to="#"
                                                    >
                                                        <i className="ri ri-hashtag text-lg leading-none text-danger"></i>
                                                        <span className="text-gray-500 dark:text-white/70">
                                                            Hashtag
                                                        </span>
                                                    </Link>
                                                </li>
                                                <li className="hidden md:flex">
                                                    <Link
                                                        className="flex space-x-1 rtl:space-x-reverse"
                                                        to="#"
                                                    >
                                                        <i className="ri ri-at-line text-lg leading-none text-info"></i>
                                                        <span className="text-gray-500 dark:text-white/70">
                                                            Mention
                                                        </span>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className="box-footer">
                                            <div className="Profile-post-footer flex space-x-5 rtl:space-x-reverse justify-end">
                                                <Select
                                                    className="ounded-full"
                                                    classNamePrefix="react-select"
                                                    options={ProfileHomeData}
                                                    placeholder="Public"
                                                />
                                                <Link
                                                    to="#"
                                                    className="m-0 ti-btn ti-btn-primary"
                                                >
                                                    post
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box p-5 text-start">
                                        <div className="sm:flex flex-row space-y-2 sm:space-y-0">
                                            <img
                                                className="sm:w-1/4 rounded-sm border border-gray-200 dark:border-white/10"
                                                src={ALLImages("jpg18")}
                                                alt="Image Description"
                                            />
                                            <div className="box-body ltr:sm:pl-5 rtl:sm:pr-5 px-0 py-0 space-y-4 my-auto w-full">
                                                <h5 className="font-semibold mb-0 text-base leading-none">
                                                    Lorem ipsum dolor sit amet
                                                    consectetur adipisicing.
                                                </h5>
                                                <div className="space-x-2 sm:space-y-0 rtl:space-x-reverse flex">
                                                    <Link
                                                        to="#"
                                                        className="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark"
                                                    >
                                                        <i className="text-xs ri ri-heart-line"></i>
                                                        <span>30</span>
                                                    </Link>
                                                    <Link
                                                        to="#"
                                                        className="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark"
                                                    >
                                                        <i className="text-xs ri ri-thumb-up-line"></i>
                                                        <span>25k</span>
                                                    </Link>
                                                </div>
                                                <div className="md:flex md:justify-between space-y-2 md:space-y-0">
                                                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                                        <div className="flex">
                                                            <img
                                                                className="avatar avatar-xs ring-0 rounded-full"
                                                                src={ALLImages(
                                                                    "jpg57"
                                                                )}
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-700 font-semibold text-sm dark:text-white">
                                                                Json Taylor
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-white/70">
                                                                20 min ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex -space-x-2 rtl:space-x-reverse">
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg71"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg60"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg68"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg59"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <span className="inline-flex items-center justify-center avatar avatar-xs rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                            <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                2+
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box p-5 text-start">
                                        <div className="sm:flex flex-row space-y-2 sm:space-y-0">
                                            <img
                                                className="sm:w-1/4 rounded-sm border border-gray-200 dark:border-white/10"
                                                src={ALLImages("jpg12")}
                                                alt="Image Description"
                                            />
                                            <div className="box-body ltr:sm:pl-5 rtl:sm:pr-5 px-0 py-0 space-y-4 my-auto w-full">
                                                <h5 className="font-semibold mb-0 text-base leading-none">
                                                    Deserunt dolore ad
                                                    incididunt excepteur
                                                    excepteur Lorem amet
                                                    excepteur.
                                                </h5>
                                                <div className="space-x-2 sm:space-y-0 rtl:space-x-reverse flex">
                                                    <Link
                                                        to="#"
                                                        className="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark"
                                                    >
                                                        <i className="text-xs ri ri-heart-line"></i>
                                                        <span>30</span>
                                                    </Link>
                                                    <Link
                                                        to="#"
                                                        className="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark"
                                                    >
                                                        <i className="text-xs ri ri-thumb-up-line"></i>
                                                        <span>25k</span>
                                                    </Link>
                                                </div>
                                                <div className="md:flex md:justify-between space-y-2 md:space-y-0">
                                                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                                        <div className="flex">
                                                            <img
                                                                className="avatar avatar-xs ring-0 rounded-full"
                                                                src={ALLImages(
                                                                    "jpg59"
                                                                )}
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-700 font-semibold text-sm dark:text-white">
                                                                Sujika
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-white/70">
                                                                5 hrs ago
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex -space-x-2 rtl:space-x-reverse">
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg71"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg60"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg68"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg69"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <span className="inline-flex items-center justify-center avatar avatar-xs rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                            <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                4+
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box p-5 text-start">
                                        <div className="sm:flex flex-row space-y-2 sm:space-y-0">
                                            <img
                                                className="sm:w-1/4 rounded-sm border border-gray-200 dark:border-white/10"
                                                src={ALLImages("jpg13")}
                                                alt="Image Description"
                                            />
                                            <div className="box-body ltr:sm:pl-5 rtl:sm:pr-5 px-0 py-0 space-y-4 my-auto w-full">
                                                <h5 className="font-semibold mb-0 text-base leading-none">
                                                    Minim Lorem sunt in sunt
                                                    adipisicing anim est enim
                                                    duis...
                                                </h5>
                                                <div className="space-x-2 sm:space-y-0 rtl:space-x-reverse flex">
                                                    <Link
                                                        to="#"
                                                        className="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark"
                                                    >
                                                        <i className="text-xs ri ri-heart-line"></i>
                                                        <span>30</span>
                                                    </Link>
                                                    <Link
                                                        to="#"
                                                        className="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark"
                                                    >
                                                        <i className="text-xs ri ri-thumb-up-line"></i>
                                                        <span>25k</span>
                                                    </Link>
                                                </div>
                                                <div className="md:flex md:justify-between space-y-2 md:space-y-0">
                                                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                                        <div className="flex">
                                                            <img
                                                                className="avatar avatar-xs ring-0 rounded-full"
                                                                src={ALLImages(
                                                                    "jpg69"
                                                                )}
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-700 font-semibold text-sm dark:text-white">
                                                                King Berunda
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-white/70">
                                                                Yesterday,
                                                                10:27AM
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex -space-x-2 rtl:space-x-reverse">
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg71"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg60"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg68"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg59"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <span className="inline-flex items-center justify-center avatar avatar-xs rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                            <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                4+
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="box p-5 text-start">
                                        <div className="sm:flex flex-row space-y-2 sm:space-y-0">
                                            <img
                                                className="sm:w-1/4 rounded-sm border border-gray-200 dark:border-white/10"
                                                src={ALLImages("jpg14")}
                                                alt="Image Description"
                                            />
                                            <div className="box-body ltr:sm:pl-5 rtl:sm:pr-5 px-0 py-0 space-y-4 my-auto w-full">
                                                <h5 className="font-semibold mb-0 text-base leading-none">
                                                    Minim Lorem sunt in sunt
                                                    adipisicing anim est enim
                                                    duis...
                                                </h5>
                                                <div className="space-x-2 sm:space-y-0 rtl:space-x-reverse flex">
                                                    <Link
                                                        to="#"
                                                        className="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark"
                                                    >
                                                        <i className="text-xs ri ri-heart-line"></i>
                                                        <span>30</span>
                                                    </Link>
                                                    <Link
                                                        to="#"
                                                        className="text-xs leading-[0] text-gray-500 dark:text-white/70 space-x-2 rtl:space-x-reverse rounded-full bg-gray-100 px-3 py-1 font-normal hover:bg-gray-300 focus:bg-gary-800 dark:bg-black/20 dark:hover:bg-bgdark"
                                                    >
                                                        <i className="text-xs ri ri-thumb-up-line"></i>
                                                        <span>25k</span>
                                                    </Link>
                                                </div>
                                                <div className="md:flex md:justify-between space-y-2 md:space-y-0">
                                                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                                        <div className="flex">
                                                            <img
                                                                className="avatar avatar-xs ring-0 rounded-full"
                                                                src={ALLImages(
                                                                    "jpg71"
                                                                )}
                                                                alt="avatar"
                                                            />
                                                        </div>
                                                        <div>
                                                            <p className="text-slate-700 font-semibold text-sm dark:text-white">
                                                                Michael Jeremy
                                                            </p>
                                                            <p className="text-xs text-gray-500 dark:text-white/70">
                                                                08 Aug 2022
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex -space-x-2 rtl:space-x-reverse">
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg71"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg60"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg68"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <img
                                                            className="avatar avatar-xs rounded-full"
                                                            src={ALLImages(
                                                                "jpg59"
                                                            )}
                                                            alt="Image Description"
                                                        />
                                                        <span className="inline-flex items-center justify-center avatar avatar-xs rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                            <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                4+
                                                            </span>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to="#"
                                        className="ti-btn ti-btn-primary py-1 px-2 m-0"
                                    >
                                        View All
                                    </Link>
                                </div>
                                <div
                                    id="profile-4"
                                    className="hidden text-center"
                                    role="tabpanel"
                                    aria-labelledby="profile-item-4"
                                >
                                    <div className="sm:grid grid-cols-12 gap-x-6 space-y-6 sm:space-y-0 text-start">
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png69"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Tailwind Ui Web
                                                                Application
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        2+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-success/10 text-success rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-success/40 rounded-full"></span>
                                                            Completed
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            15-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png68"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Synto Ui Mobile
                                                                Application
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-warning/10 text-warning rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-warning/40 rounded-full"></span>
                                                            Inprogress
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            10-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png70"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Valex Laravel
                                                                Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-warning/10 text-warning rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-warning/40 rounded-full"></span>
                                                            Inprogress
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            10-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png71"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Zanex Laravel
                                                                Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-primary/10 text-primary rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-primary/40 rounded-full"></span>
                                                            New Project
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png72"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Adminor Laravel
                                                                Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-primary/10 text-primary rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-primary/40 rounded-full"></span>
                                                            New Project
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png73"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Client Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        4+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-danger/10 text-danger rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-danger/40 rounded-full"></span>
                                                            Aborted
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png74"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                React Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        5+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-info/10 text-info rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-info/40 rounded-full"></span>
                                                            Approved
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png75"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Angular Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        5+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-primary/10 text-primary rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-primary/40 rounded-full"></span>
                                                            New Project
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png76"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Vue Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        5+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-success/10 text-success rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-success/40 rounded-full"></span>
                                                            Completed
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="md:col-span-6 col-span-12">
                                            <div className="box">
                                                <div className="box-body space-y-3">
                                                    <div className="sm:flex sm:space-x-3 sm:space-y-0 space-y-2 rtl:space-x-reverse">
                                                        <img
                                                            src={ALLImages(
                                                                "png77"
                                                            )}
                                                            className="p-2 avatar w-14 h-14  bg-gray-100 dark:bg-black/20 rounded-sm"
                                                            alt="profile-img"
                                                        />
                                                        <div className="my-auto space-y-2">
                                                            <h5 className="text-sm font-semibold">
                                                                Nextjs Project
                                                            </h5>
                                                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg71"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg60"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg59"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <img
                                                                    className="avatar w-6 h-6 rounded-full"
                                                                    src={ALLImages(
                                                                        "jpg68"
                                                                    )}
                                                                    alt="Image Description"
                                                                />
                                                                <span className="inline-flex items-center justify-center avatar w-6 h-6 rounded-full bg-gray-100 border-2 border-gray-200 dark:bg-black/20 dark:border-white/10">
                                                                    <span className="font-medium text-gray-500 leading-none dark:text-white/70">
                                                                        5+
                                                                    </span>
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:space-y-0 space-y-2 justify-between">
                                                        <span className="badge bg-warning/10 text-warning rounded-sm mb-0">
                                                            <span className="w-1.5 h-1.5 inline-block bg-warning/40 rounded-full"></span>
                                                            Inprogress
                                                        </span>
                                                        <p className="text-gray-500 dark:text-white/70 text-sm font-medium my-auto">
                                                            05-12-2022
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        to="#"
                                        className="ti-btn ti-btn-primary py-1 px-2 m-0"
                                    >
                                        View more
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
