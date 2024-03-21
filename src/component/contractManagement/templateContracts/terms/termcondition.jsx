import React, { useEffect, useState } from "react";
import ALLImages from "../../../../common/imagesData";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import "../../../../../src/assets/css/print-style.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const TermConditionTemplate = () => {
    const print = () => {
        window.print();
    };
    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;
    const [formData, setEmployeeData] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        const res = axios
            .get(`${apiBaseUrl}/contracts/specific/show_specific_task/${id}`)
            .then(
                (res) => {
                    setEmployeeData(res.data.specific_task);
                    // console.log(res.data.specific_task)
                },
                [id]
            );
    });

    return (
        <div>
            {/* <PageHeader
                currentpage="Download Details"
                activepage="Pages"
                mainpage="Download Details"
            /> */}
            <div className="box-body" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 style={{ fontWeight: 'bold', fontSize: '2em', margin: 0 }}>Print Terms and Condition</h1>

                <ol className="flex items-center whitespace-nowrap min-w-0 text-end">
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/specific/specific_task_contracts/`}>
                            Home
                            <i className="ti ti-chevrons-right flex-shrink-0 mx-3 overflow-visible text-gray-300 dark:text-white/10 rtl:rotate-180"></i>
                        </a>
                    </li>
                    <li className="text-sm">
                        <a className="flex items-center text-primary hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/terms/download_term_condition/${formData.id}`}>Print Terms and Condition
                        </a>
                    </li>
                </ol>
            </div>
            <div className="grid grid-cols-12 gap-6 lg:max-w-4xl mx-auto">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <form className="printable-content">

                                <div className="table-bordered rounded-md overflow-auto" style={{ border: '4px solid black' }}>
                                    <br /><br /><br />
                                    <div className="flex flex-col lg:flex-row justify-between mb-5 space-y-4">
                                        {/* <div className="text-end"></div> */}
                                        <div className="text-center">
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center">MKATABA WA AJIRA</h1>
                                            <br /><br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center">(CONTRACT OF EMPLOYMENT)
                                            </h1><br />
                                            <br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center">WA</h1>
                                            <br /><br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center">(FOR)</h1>
                                            <br /><br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center">KAZI MAALUM</h1>
                                            <br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center">(SPECIFIC TASK)</h1>
                                        </div>
                                    </div>
                                    <br /><br />
                                    <table className="w-full border-collaps">
                                        <tbody>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black ">
                                                        Jina la Mfanyakazi:<br />(Name of Employee:)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span className="text-sm text-black font-semibold" style={{ borderBottom: '2px solid black', paddingBottom: '3px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.employee_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black  ">
                                                        Nafasi ya kazi:<br />(Position:)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span className="text-sm text-black font-semibold" style={{ borderBottom: '2px solid black', paddingBottom: '3px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.job_title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black  ">
                                                        Nambari ya Usajili:<br />(Registration Number:)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span className="text-sm text-black font-semibold" style={{ borderBottom: '2px solid black', paddingBottom: '3px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.reg_number}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black ">
                                                        Namba ya Nssf Nambari:<br />(NSSF Number:)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span className="text-sm text-black font-semibold" style={{ borderBottom: '2px solid black', paddingBottom: '3px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.nssf_number}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black  ">
                                                        Nambari ya Banki&nbsp;({formData.bank_name}):<br />({formData.bank_name} Account Number:)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        <span className="text-sm text-black font-semibold" style={{ borderBottom: '2px solid black', paddingBottom: '3px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.bank_account_no}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br /><br />
                                </div>
                                <br/><br/><br /><br /><br></br>
                                    <div><br/></div>
                                <div className="sm:grid grid-cols-12 gap-12 pb-5 space-y-5">
                                    <div className="md:col-span-12 col-span-9  my-auto">
                                        <br /><br /><br /><br />
                                        <table className="w-full border-collaps">
                                            <tbody>
                                                <br /><br /><br /><br /><br /><br />
                                                <br/><br/><br/><br/><br/><br/><br/><br/>
                                                <tr>
                                                    <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-lg text-black font-semibold  text-center">
                                                            Mkataba huu ni kati ya (this contract is between)

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-bold" style={{ width: '800px', lineHeight: '1.0' }} >
                                                            MWAJIRI:
                                                            <span className="text-sm text-black font-bold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.employer_name}&nbsp;&nbsp;&nbsp;<label className="text-sm font-medium ">
                                                                    ambaye; atafuata Sheria ya Ajira na mahusiano Kazini za Jamuhuri ya Muungano wa Tanzania na kuhakikisha hafanyi ubaguzi wa dhahiri au usiokuwa wa dhahiri kwa mwajiriwa, katika sera au mazoea katika moja ya sababu zifuatazo: Rangi, Utaifa, Kabila au sehemu anayotoka, Asili au Uasili wa Taifa, Asili ya kijamii, Maoni ya kisiasa au kidini, Jinsia, Ujauzito, ulemavu, VVU/UKIMWI, Umri; au Maisha anayoishi.</label>
                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-bold" style={{ lineHeight: '1.0' }} >
                                                            EMPLOYER:
                                                            <span className="text-sm text-black font-bold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.employer_name}&nbsp;&nbsp;&nbsp;<label className="text-sm text-black font-medium">
                                                                    who will follow the Employment and The Labor Relations Act of the United Republic of Tanzania and making sure that he does not discriminate intentionally or unintentionally to the employee in policies or behavior in the following places: - Color, Nationality, Tribe, or place they come from, ethnicity, political views, religious views, sex, pregnancy, disabled, HIV/AIDS, age, or the life one is living.</label>
                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr><td className="text-lg text-center font-bold text-black">NA / AND</td></tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-semibold " style={{ width: '800px', lineHeight: '1.0' }} >
                                                            {formData.employee_name} wa (of) {formData.residence_place}
                                                            <span className="text-sm text-black font-semibold" >
                                                                (hapa kama mfanyakazi/herein as employee.)
                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-semibold" style={{ lineHeight: '1.0' }} >
                                                            Tarehe ya Kuzaliwa: <br />(Date of Birth)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span className="text-sm text-black font-semibold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.dob}&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-semibold " style={{ lineHeight: '1.0' }} >
                                                            Namba ya Simu: <br />(Mobile Number)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span className="text-sm text-black font-semibold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.phone_number}&nbsp;&nbsp;&nbsp;

                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-semibold " style={{ lineHeight: '1.0' }} >
                                                            Jinsia: <br />(Sex)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            <span className="text-sm text-black font-semibold" >
                                                                {formData.gender === "Male" ? (<> &nbsp;&nbsp;&nbsp;ME &nbsp;&nbsp;&nbsp;</>) : (<> &nbsp;&nbsp;&nbsp;KE &nbsp;&nbsp;&nbsp;</>)}

                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td className="text-center text-black" colSpan={1}>
                                                    <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                NA KWAHIYO:
                                                            </h4>
                                                    </td>
                                                    <td>
                                                        <span className="text-sm text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                            Mwajiri yupo kwenye biashara ya ujenzi.
                                                            <br /><br />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="text-center text-black">
                                   <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                WHEREAS:
                                                            </h4>
                                                    </td>
                                                    <td>
                                                        <span className="text-sm text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                            The Employer is in the business of construction.
                                                        </span>
                                                    </td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td className="text-center text-black">
                                                    <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                NA KWAHIYO:
                                                            </h4>
                                                    </td>
                                                    <td>
                                                        <span className=" text-black font-medium" style={{ width: '1300%', lineHeight: '1.0' }} >
                                                            Umeajiriwa katika idara ya <label className="text-lg text-black font-bold">{formData.department}</label>  kitengo cha <label className="text-lg text-black font-bold">{formData.department}</label> kama <label className="text-lg text-black font-bold">{formData.job_title}.</label>  Utatakiwa kufanya kazi zote zinazohusiana na <label className="text-lg text-black font-bold">{formData.job_title}</label>  katika kitengo cha <label className="text-lg text-black font-bold">{formData.department} </label>kama utakavyopangiwa na msimamizi wako
                                                        </span></td>
                                                </tr>
                                                <br />
                                                <tr>
                                                    <td className="text-center text-black">
                                                    <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                WHEREAS:
                                                    </h4>
                                                    </td>
                                                    <td>
                                                        <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                            The Employee is expected;. <br />
                                                            You are employed to undertake Technician work as <label className="text-lg text-black font-bold">{formData.job_title}</label> at <label className="text-lg text-black font-bold">{formData.department}</label> Department, packaging <label className="text-lg text-black font-bold">{formData.department}.</label> You will be handling all <label className="text-lg text-black font-bold">{formData.job_title}</label>work at <label className="text-lg text-black font-bold">{formData.department}</label>  as per instruction from your supervisor.
                                                        </span></td>
                                                </tr>
                                                <br />
                                            </tbody>
                                        </table>
                                        <br /><br /><br />
                                        <div>  <br/><br/><br/>  <br /><br /><br /></div>
                                        <table>
                                            <tbody>
                                                  <br /><br /><br />
                                                <tr>
                                                    <td className="p-4 ">
                                                        <h4 className="text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                            1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kuanza Kazi <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Start Date
                                                            <br /> <br />
                                                            <span className="text-sm text-black font-medium"  style={{  width: '800px' }}>
                                                                Mkataba huu unaanza/ulianza tarehe <label className="text-lg text-black font-bold">{formData.start_date}</label> na utafikia kikomo pale tu “Kazi Maalumu” itakapofikia ukomo/kukamilika ambapo utaratibu wa Sheria ya Ajira na Uhusiano Kazini [SURA 366 MAREJEO YA 2019] ikisomwa kwa Pamoja na Kanuni za ajira na Mahusiano Kazini [KANUNI ZA UTENDAJI BORA] T.S. Na 42/2007 utafuatwa. Mwajiri wako atakupa notisi ya siku ishirini na nane (28) kwamba kazi maalumu inakaribia kuisha na dhamira ya kuvunja mkataba huu.<br />
                                                                (This Employment contract will start/started on <label className="text-lg text-black font-bold">{formData.start_date}</label> and it will end then when the “Specific Task” reached to an end, whereas the Employment and Labour Relations Act [CAP 366 R.E. 2019] read together with The Employment and Labour Relations Rules [CODE OF GOOD PRACTICE] G.N No. 42/2007 will guide. Your employer will give you a twenty-eight (28) days’ notice that the specific task is about to end and intention to end this contract)
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-bold " style={{ lineHeight: '1.0' }} >
                                                            2&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mahali Pa Kuajiriwa: <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Place of Recruitment)
                                                            <span className="text-sm text-black font-semibold" >&nbsp;&nbsp;&nbsp;
                                                                {formData.place_recruitment}&nbsp;&nbsp;&nbsp;


                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-bold " style={{ lineHeight: '1.0' }} >
                                                            3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Mahali Pa Kazi: <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Place of Work)
                                                            <span className="text-sm text-black font-semibold" >&nbsp;&nbsp;&nbsp;
                                                                {formData.work_station}&nbsp;&nbsp;&nbsp;


                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-bold " style={{ lineHeight: '1.0' }} >
                                                            4&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Kitengo: <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Department)
                                                            <span className="text-sm text-black font-semibold" >&nbsp;&nbsp;&nbsp;
                                                                {formData.department}&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-bold " style={{ lineHeight: '1.0' }} >
                                                            5&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Msimamizi: <br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(Supervisor)
                                                            <span className="text-sm text-black font-semibold" >&nbsp;&nbsp;&nbsp;
                                                                {formData.supervisor}&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-md text-black font-medium " style={{ lineHeight: '1.0' }} >
                                                            Ujira na Marupurupu yanayotolewa na Mwajiri
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-md text-black font-medium " style={{ width: '800px', lineHeight: '1.0' }} >
                                                            Mshahara wako Kwa mwezi utakuwa <label className="text-lg text-black font-bold">Tshs. {formData.monthly_salary}</label> Ambao utajumuisha yafuatayo:-
                                                        </h4>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="table-bordered rounded-md overflow-auto">
                                            <table className="ti-custom-table ti-custom-table-head" >
                                                <thead className="bg-gray-50 dark:bg-black/20">
                                                </thead>
                                                <tbody>
                                                    <tr className="border-0">
                                                        <td colSpan={1} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Ujira:
                                                            </h4></td>
                                                        <td colSpan={1} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.basic_salary}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={1} ><h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Nyumba
                                                        </h4></td>
                                                        <td colSpan={2} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.house_allowance}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={1} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Chakula
                                                            </h4></td>
                                                        <td colSpan={1} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.meal_allowance}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={1} ><h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Usafiri
                                                        </h4></td>
                                                        <td colSpan={1} className="">
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.transport_allowance}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={1}><h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Posho ya KuishiKufanya Kazi<br />Mazingira Magumu
                                                        </h4></td>
                                                        <td colSpan={1} className="">
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.risk_bush_allowance}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <br />
                                        <span className="text-lg text-black font-semibold" >Salary and Benefits given by the employer
                                        </span><br />
                                        <h4 className="text-lg text-black font-medium " style={{ width: '800px', lineHeight: '1.0' }} >
                                            The employees’ monthly salary is <label className="text-lg text-black font-bold">Tshs. {formData.monthly_salary}</label> which will include the following: -
                                        </h4>
                                        <br />
                                        <div className="table-bordered rounded-md overflow-auto">
                                            <table className="ti-custom-table ti-custom-table-head" >
                                                <thead className="bg-gray-50 dark:bg-black/20">
                                                </thead>
                                                <tbody>
                                                    <tr className="border-0">
                                                        <td colSpan={1} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Basic Salary:
                                                            </h4></td>
                                                        <td colSpan={1} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.basic_salary}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={1} ><h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Housing Allowance
                                                        </h4></td>
                                                        <td colSpan={2} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.house_allowance}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={1} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                Meal Allowance
                                                            </h4></td>
                                                        <td colSpan={1} className="" >
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.meal_allowance}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={1} ><h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Transport Allowance
                                                        </h4></td>
                                                        <td colSpan={1} className="">
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.transport_allowance}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td colSpan={1}><h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                            Risk / Bush Allowance
                                                        </h4></td>
                                                        <td colSpan={1} className="">
                                                            <h4 className="text-lg text-black font-bold flex items-center" style={{ lineHeight: '1.0' }}>
                                                                {formData.risk_bush_allowance}
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <br />
                                          <br/><br/><br/> <br/><br/><br />
                                        <div>
                                            <table>
                                                <tbody >
                                                    <tr >
                                                        {/* <td></td> */}
                                                        <td className="" colSpan={2}>
                                                            <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                6&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Saa za Kazi<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Hours of Work)
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a.&nbsp;&nbsp;</td>
                                                        <td  style={{  width: '1200px' }}>
                                                            <span className=" text-black font-medium" style={{ width: '1200px', lineHeight: '1.0' }} >
                                                                Masaa ya kazi yataanza saa 08:00 Asubuhi mpaka saa 17:00 jioni (Jumatatu Mpaka Ijumaa) na Saa 08:00 Asubuhi mpaka saa 13:00 mchana (Siku za Jumamosi). Kama mfanyakazi atatakiwa kufanya kazi usiku masaa ya kazi yataanza saa 18:00 mpaka 03:00 usiku (Jumatatu Mpaka Ijumaa) na saa 18:00 mpaka saa 00:00 usiku (Siku za Jumamosi). Jumla ya masaa ya kazi 45 kwa wiki.<br />
                                                                (Working hours shall be from 08:00 AM in the morning until 17:00 PM in the evening (Monday to Friday) and 8:00 AM in the morning until 13:00 PM in the afternoon (Saturday). As an employee who will work the night shift working hours shall be from 18:00PM in the evening until 03:00 AM in the morning (Monday to Friday) and 18:00 PM until 00:00 AM midnight (Saturday). Total working hours shall be 45 in a week).

                                                                <br /><br />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Kazi katika saa za ziada zitafanyika kwa makubaliano na kwa ruhusa kutoka kwa msimamizi wako husik. <br />
                                                                (Any overtime work shall be first agreed and approved by your supervisor)
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; c.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Mfanyakazi anaweza kutakiwa kufanya kazi Jumapili/ Siku za mapumziko au baada ya masaa ya kazi, na atalipwa stahiki zake kama ilivyoainishwa kwa kuzingatia sheria za Kazi na Ajira za Jamuhuri ya Muungano wa Tanzania. <br />
                                                                (The employee may be required to work on Sundays or overtime and they will be paid their overtime dues in accordance with the Employment and Labour Relations Act of Tanzania and its Regulations).
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <br />




                                                </tbody>
                                            </table>

                                            <br /><br />
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        {/* <td></td> */}
                                                        <td className="" colSpan={2}>
                                                            <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                7&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Likizo ya Mwaka<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Annual Leave)
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="" colSpan={2}>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Likizo ya mwaka mzunguko wake ni miezi 12 na likizo nyingine zilizobakimzunguko wake ni miezi 36<br />
                                                                (Annual Leave is in the 12 months’ cycle and other leave’s remaining are in 36 months)
                                                            </span>
                                                            <br /> <br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; a.&nbsp;&nbsp;</td>
                                                        <td >
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Mfanyakazi atastahili kupewa likizo ya siku 28 mfululizo katikamzunguko wa miezi 12 kama kazi hii maalumu itachukua Zaidi ya muda huo au kama muda huo.<br />
                                                                (The employee shall be entitled to 28 days leave in a row from the 12 months’ cycle and if this specific task shall take more than that time or equal)

                                                                <br /><br />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Siku za likizo zinaweza kukatwa na mwajiri iwapo mfanyakazi alipewaruhusa mbalimbali. <br />
                                                                (Leave days can be deducted if the employee has received leaves or day offs several times)
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; c.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Mwajiri anaweza kuamua siku ya kuanza likizo mfanyakazi ndani yamiezi sita kuanzia siku ambayo mfanyakazi alistahili kuanza likizo. <br />
                                                                (The employer can decide the start date of the leave for the employee within six months from the day the employee is entitled to start leave).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; d.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Muda wa kuanza likizo baada ya miezi 6 unaweza kuongezwa kwamakubaliano iwapo yapo mahitaji ya uendeshaji na nyongeza ya mudawa kuanza likizo isizidi miezi 12. <br />
                                                                (The leave days’ start date after six months can be moved forward after six months in agreement if there is a need in the project and the leave can be added to start in not more than twelve months).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; e.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Mfanyakazi hapaswi kufanya kazi wakati wa likizo. <br />
                                                                (The employee is not allowed to work during leave days).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; f.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Hairuhisiwi kumlipa mfanyakazi pesa badala ya likizo (kununua likizo)isipokuwa tu wakati wa kusitisha ajira. <br />
                                                                (It is not allowed to pay the employee instead of leave days (buying leave days) only when the employment contract comes to end).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; g.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Likizo ya mwaka haitakiwi kuchukuliwa wakati wa likizo nyingine auwakati wa kipindi cha notisi ya kusitisha ajira. <br />
                                                                (Annual leave will not be taken durin another leaves or during the period of notice of ending the employment).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; h.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Mwajiri ni lazima amlipe mfanyakazi mshahara wake wakati wa likizo. <br />
                                                                (The employer will pay the employee during the annual leave).
                                                            </span></td>
                                                    </tr>
                                                    <br />

                                                </tbody>
                                            </table>
                                        </div>
                                        <div>
                                            <br/><br /><br/><br/><br/> <br/><br/>
                                            <table>
                                                <tbody>
                                                    <br/><br/>
                                                    <tr>
                                                        {/* <td></td> */}
                                                        <td className="" colSpan={2}>
                                                            <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                8&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Likizo ya Ugonjwa<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  (Sick Leave)
                                                            </h4>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  a.&nbsp;&nbsp;</td>
                                                        <td >
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Mfanyakazi anastahili likizo ya ugonjwa ya angalau siku 126 kulingana na sheria za kazi za Tanzania.<br />
                                                                (The employee is entitled to sick leave of at least 126 days in accordance with the Employment and Labour Relations Act of Tanzania)
                                                                <br /><br />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Katika siku 63 za kwanza mfanyakazi anastahili kulipwa mshahara kamili na katika siku 63 zinazofuata anastahili kulipwa nusu mshahara <br />
                                                                (In the first 63 days the employee is entitled to be paid full salary and the following 63 days the employee is entitled half salary).
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Kabla ya kuchukua likizo ya ugonjwa mfanyakazi anapaswa kuwasilisha kwa Mwajiri uthibitisho wa Daktari. <br />
                                                                (Before taking the sick leave the employee must submit proof to the employer from the Doctor).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                </tbody>
                                            </table>
                                        </div>
                                        <div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        {/* <td></td> */}
                                                        <td className="" colSpan={2}>
                                                            <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                9&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Usitishaji AjiraLikizo ya Mwaka<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  (Termination of Employment)
                                                            </h4>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="" colSpan={2}>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Usitishaji ajira ni kukoma kwa mkataba wa ajira, kutokana na sababu mbalimbali kama vile<br />
                                                                (Termination of the agreement will come to be due to the following reasons)
                                                            </span>
                                                            <br /> <br />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.&nbsp;&nbsp;</td>
                                                        <td >
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Usitishaji ajira kwa sababu ya uwezo mdogo wa kazi/ Utendaji usioridhisha.<br />
                                                                (Termination due to poor performance)

                                                                <br /><br />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ width: '800px', lineHeight: '1.0' }} >
                                                                Usitishaji wa ajira kwa sababu ya mahitaji ya uendeshaji. <br />
                                                                (Termination due to Operational Requirements).
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Kujiuzulu au kuacha kazi mfanyakazi kwa kutoa notisi ya siku 28 au malipo badala ya notisi hiyo. <br />
                                                                (Resignation of his employee at his own will be by giving employer a notice of 28 days or payment in lieu of that notice).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;d.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Mfanyakazi kuachishwa kazi na mwajiri wake kwa kupewa NOTISI, <br />
                                                                (Employee termination after receiving a notice from the employer).
                                                            </span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;e.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Kumaliza kazi ya mkataba wa muda maalum  <br />
                                                                (The end of the Specific Task).
                                                            </span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;f.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Kuachishwa kazi kwa sababu yautovu wa nidhamu, kwa tukio litakalofanya vigumu      kuendelea na mkataba, kifo nk.
                                                                <br />
                                                                (Termination due to Misconduct, any other reason that will make it impossible for the contract to continue, death and others).
                                                            </span></td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;g.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Kwa makubaliano  <br />
                                                                (Termination by agreement).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                </tbody>
                                            </table>
                                        </div>

                                        <div>
                                            <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                10&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Malipo ya Mwisho wa Mkataba<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Payment to be paid upon Termination of the Contract)<br /><br />
                                                <span className="text-sm text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                    Mwajiriwa atalipwa malipo yake mwisho wa mkataba huu kulingana na Sheria za Kazi za Jamhuri ya Muungano wa Tanzania.  <br />
                                                    (The Employee shall be paid his dues at the end of this contract in accordance with the Employment and Labour Relations Act of Tanzania).
                                                </span>
                                            </h4>
                                        </div>
                                        <div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        {/* <td></td> */}
                                                        <td className="" colSpan={2}>
                                                            <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                11&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Mengineyo au Jumlaa<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Others or General)
                                                            </h4>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;a.&nbsp;&nbsp;</td>
                                                        <td >
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Mkataba huu upo katika lugha mbili Kiswahili na kingereza kwa faida ya mwajiri na mwajiriwa na endapo kutatokea utata wa tafsiri ya lugha katika mkataba huu, Kiswahili kitasimama kama lugha sahihi ya makubaliano<br />
                                                                (This contract is written in English and Swahili for the benefits of both the employer and employee and when it happens that the translation of the language in this contract is in question, the Swahili language will prevail as the correct language in this agreement)

                                                                <br /><br />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;b.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Uishapo mkataba huu wa kazi maalumu, muajiri ataamua kama atamuajiri muajiriwa katika kazi nyingine maalumu au mahusiano yao kuishia hapo mkataba huu uishapo.. <br />
                                                                (Upon termination of this contract of specific task, the employer will decide to hire the employee for another specific task or end the employment relationship with the employee at the end of this contract).
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <br/><br/><br/> <br/><br/><br />
                                                    <tr>
                                                        <td className="text-center text-black"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;c.&nbsp;&nbsp;</td>
                                                        <td>
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Mkataba huu maalumu utaisha pale ambapo msimamizi wa kitengo hapo juu atathibitisha kumalizika kwa kazi maalumu tajwa hapo juu.. <br />
                                                                (This contract of specific task shall end when the supervisor of the department mentioned above shall certify that the task mentioned above is completed).
                                                            </span></td>
                                                    </tr>
                                                    <br />
                                                </tbody>
                                            </table>
                                        </div>

                                        <div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        {/* <td></td> */}
                                                        <td className="" colSpan={2}>
                                                            <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.0' }}>
                                                                12&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Sheria, Mkataba<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (Governing Law and Contract)
                                                            </h4>
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        <td >
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Mkataba huu utaendeshwa na kutafsiriwa chini ya sheria za Jamuhuri ya Muungano wa Tanzania.<br />
                                                                (This Employment Contract will be guided and translated under the laws of the United
                                                                Republic of Tanzania)

                                                                <br /><br />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>
                                                        <td >
                                                            <span className=" text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                                Mfanyakazi anahaki/ anahitajika kurejelea masharti ya mkataba wa ajira ambayo ni
                                                                sehemu ya mkataba huu wa ajira.. Masharti ya mkataba yanaweza kubadilika na ni lazima yatumwe kwa maandishi na kusainiwa na pande zote mbili (Mwajili na Mwajiliwa).
                                                                <br />
                                                                (The Employee has the right or is required to refer to the terms of the contract which is part of this contract. The terms of this contract can change and they must be in writing and signed by both parties (Employer) and (Employee). )

                                                                <br /><br />
                                                            </span>
                                                        </td>
                                                    </tr>
                                                    <br />
                                                </tbody>
                                            </table>
                                        </div>
                                        <div>
                                            <span className="p-4 text-lg text-black font-medium" style={{ lineHeight: '1.0' }} >
                                                Tafadhali sahihi Mkataba huu (Nakala 2)
                                            </span>
                                            <br /><br />
                                         
                                            <div>
                                                <table>
                                                    <tbody>
                                                        <tr className="border-0">
                                                            <td className="" >
                                                                <h4 className="text-lg text-black font-bold flex items-center" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '350px' }}>
                                                                    Mwajiriwa:<br />Employee:
                                                                </h4></td>&nbsp;&nbsp;
                                                            <td className="" >
                                                                <h4 className="text-lg text-black font-bold flex items-center" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '350px' }}>
                                                                    Mwajiri : <br /> Employer
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                         <br/>
                                                        <tr>
                                                            <td ><h4 className="text-lg text-black font-bold flex items-center" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '350px' }}>
                                                                Sahihi:(Signature)
                                                            </h4></td>&nbsp;&nbsp;
                                                            <td colSpan={2} className="" >
                                                                <h4 className="text-lg text-black font-bold flex items-center" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '350px' }}>
                                                                    Sahihi:(Signature)
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                        <br/>
                                                        <tr>
                                                            <td className="" >
                                                                <h4 className="text-lg text-black font-bold flex items-center" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '350px' }}>
                                                                    Tarehe: <br /> (Date)
                                                                </h4></td>&nbsp;&nbsp;
                                                            <td className="" >
                                                                <h4 className="text-lg text-black font-bold flex items-center" style={{ borderBottom: '2px solid black', display: 'inline-block', width: '350px' }}>
                                                                    Tarehe:<br />(Date)
                                                                </h4>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="w-20 !p-1 ti-btn ti-btn-primary"
                                    onClick={print}
                                >
                                    {" "}
                                    Print
                                </button>

                                <Link
                                    to={
                                        `${import.meta.env.BASE_URL
                                        }hiring/hrinterview/show_assessment/` +
                                        id
                                    }
                                ></Link>
                                <button
                                    type="button"
                                    className="w-20 !p-1 ti-btn ti-btn-danger"
                                ><a className="flex items-center text-white hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/required/show_detail/${formData.id}`}> Cancel

                                    </a>

                                </button>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div >

    );
};
export default TermConditionTemplate;
