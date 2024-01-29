import React from "react";
import { Link } from "react-router-dom";
import {
    Applicants,
    Bitcoins,
    DshCoin,
    Ethereum,
    Golem,
    SessionsDevice,
    TargetReport,
    SettingsRevenue,
} from "../../common/chartData";
import PageHeader from "../../layout/layoutsection/pageHeader/pageHeader";
import WorldMap from "react-svg-worldmap";
import ALLImages from "../../common/imagesdata";
import store from "../../redux/store";
import { connect } from "react-redux";
import { ThemeChanger } from "../../redux/Action";
import { useEffect } from "react";

const Settings = ({ local_varaiable, ThemeChanger }) => {
    useEffect(() => {
        if (localStorage.Syntoverticalstyles == "doublemenu") {
            const theme = store.getState();
            ThemeChanger({ ...theme, toggled: "" });
        }
    }, []);

    const data = [
        { country: "cn", value: 1389618778 }, // china
        { country: "in", value: 1311559204 }, // india
        { country: "us", value: 331883986 }, // united states
        { country: "id", value: 264935824 }, // indonesia
        { country: "pk", value: 210797836 }, // pakistan
        { country: "br", value: 210301591 }, // brazil
        { country: "ng", value: 208679114 }, // nigeria
        { country: "tz", value: 161062905 }, // Tanzania
        { country: "ru", value: 141944641 }, // russia
        { country: "mx", value: 127318112 }, // mexico
    ];

    return (
        <div>
            <PageHeader
                currentpage="System Settings"
                activepage="Home"
                mainpage="Settings"
            />

            <div className="col-span-12 xl:col-span-12">
                <div className="box">
                    <div className="box-header">
                        <h5 className="box-title">Roles and Access</h5>
                    </div>
                    <div className="box-body">
                        <div className="space-y-3">
                            <div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
                            </div>

                            <div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Hiring Management
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        can create job
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
							<div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View System Settings
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Role and Permission
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6" />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70" >
                                        Can Create users
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1" />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70" >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2" />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
							<div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Hiring Management
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        can create job
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
							<div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Hiring Management
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        can create job
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
							<div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Hiring Management
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        can create job
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
							<div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Hiring Management
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        can create job
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
							<div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Hiring Management
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        can create job
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
							<div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Hiring Management
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        can create job
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
							<div className="flex gap-x-6">
                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-4"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-4"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Hiring Management
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-5"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-5"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        can create job
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-6"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-6"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can edit
                                    </label>
								</div>
								 <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-1"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-1"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can View Industrial Relation
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-2"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-2"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can create{" "}
                                    </label>
                                </div>

                                <div className="flex">
                                    <input
                                        type="checkbox"
                                        className="ti-form-checkbox mt-0.5"
                                        id="hs-checkbox-group-3"
                                    />
                                    <label
                                        htmlFor="hs-checkbox-group-3"
                                        className="text-sm text-gray-500 ltr:ml-2 rtl:mr-2 dark:text-white/70"
                                    >
                                        Can Edit
                                    </label>
                                </div>
							</div>
                        </div>
                      
                           
                       
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    local_varaiable: state,
});

export default connect(mapStateToProps, { ThemeChanger })(Settings);

// export default system Settings;
