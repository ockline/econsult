import React, { useEffect, useState } from "react";
import ALLImages from "../../../../common/imagesdata";
import PageHeader from "../../../../layout/layoutsection/pageHeader/pageHeader";
import "../../../../../src/assets/css/print-style.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ContractDetails = () => {
    const print = () => {
        window.print();
    };
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const [formData, setEmployeeData] = useState([]);

    const { id } = useParams();
    useEffect(() => {
        const res = axios
            .get(`${apiBaseUrl}/contracts/required/show_contract_detail/${id}`)
            .then(
                (res) => {
                    setEmployeeData(res.data.contract_detail);
                    console.log(res.data.contract_detail)
                },
                [id]
            );
    });

    return (
        <div>
            <PageHeader
                currentpage="Download Details"
                activepage="Pages"
                mainpage="Download Details"
            />
            <div className="grid grid-cols-12 gap-6 lg:max-w-4xl mx-auto">
                <div className="col-span-12">
                    <div className="box">
                        <div className="box-body">
                            <form className="printable-content" style={{ fontFamily: 'Times New Roman, serif' }}>
                                <span className="text-end">
                                        <div className="border border-gray-300 float-right" style={{ width: '160px', height: '205px', border: '2px solid black' }}>
                                            <div style={{ width: '100%', height: '100%' }}>
                                                {formData.passport_attachment ? (
                                                    <img 
                                                        src={`data:image/jpeg;base64,${formData.passport_attachment}`}
                                                        alt="Passport"
                                                        style={{ 
                                                            width: '200px', 
                                                            height: '200px', 
                                                            objectFit: 'contain',
                                                            display: 'block'
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                </span>
                                &nbsp;&nbsp;
                                <div className="flex flex-col lg:flex-row justify-between mb-1 space-y-1">
                                    <div className="text-center">
                                        <h1 className="text-2xl text-black uppercase font-semibold" 
                                            style={{ 
                                                borderBottom: '2px solid black', 
                                                paddingBottom: '0.2px', 
                                                marginTop: '-20px',
                                                fontFamily: 'Times New Roman, serif',
                                                fontSize: '14pt'
                                            }}>
                                            TARIFA za MWAJIRIWA KWAAJIRI YA MKATABA- KIAMBATANISHO "A"
                                        </h1>
                                    </div>
                                </div>

                                <div className="sm:grid grid-cols-12 gap-2 pb-1">
                                    <div className="md:col-span-12 col-span-9">
                                        <table className="w-full border-collaps" style={{ fontFamily: 'Times New Roman, serif', fontSize: '14pt' }}>
                                            <tbody>
                                                <tr>
                                                    <td className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Jina la Ukoo :
                                                            <span className="text-md font-medium text-gray-700" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.lastname}&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                            <span className="text-xl text-black font-semibold">Jina la kwanza:<lable className="text-md font-medium text-gray-700" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px', lineHeight: '1.0' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.firstname}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</lable></span>
                                                        </h4>
                                                    </td>                                                    
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Jina la kati :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.middlename}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Sehemu Ulipozaliwa :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.birth_place}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                           Tarehe ya Kuzaliwa:
                                                            <span className="text-md font-medium text-gray-700 text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.dob}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                            Umri :
                                                            <span className="text-md font-medium text-gray-700 text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.age}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                 <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Jinsia :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.gender}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Mahali pa kuishi :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.residence_place}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Makazi yako yakudumu :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.permanent_residence}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Anuani ya Posta :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.postal_address}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Anuani ya barua pepe :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                               &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.email}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Namba za simu :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.phone_number}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Mahali ulipoajiriwa :
                                                            <span className="text-md font-medium text-gray-700 !text-center" s>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.place_recruitment}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Kituo cha Kazi :
                                                            <span className="text-md font-medium text-gray-700 !text-center" >
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.work_station}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Aina ya Mkataba :
                                                            <span className="text-md font-medium text-gray-700 !text-center" >
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.contract_type}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Tarehe ya kuanza kazi (Date Employed): 
                                                            <span className="text-md font-medium text-gray-700 !text-center" >
                                                                &nbsp;&nbsp;{formData.date_employed}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr><td><br/></td></tr>
                                                <tr>
                                                    <td>
                                                      <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                      NDUGU/JAMAA WA KARIBU  </h4>
                                                    </td>
                                                </tr>
                                                <tr>        
                                                    <td colSpan={2} className="p-1" style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            1. Jina Lake: 
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.fullname_next1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Makazi yake (mfano. Magomeni<br/>Tambaza Street Hse no xx):
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.residence1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                               
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Namba yake / simu:
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.phone_number1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Uhusiano:
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.relationship1}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                 <tr><td><br/></td></tr>
                                                <tr>
                                                    <td colSpan={2} className="p-1 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            2.  Jina lake :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px'}}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.fullname_next2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                  <tr>
                                                    <td colSpan={2} className="p-1 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Makazi yake :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px'}}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.residence2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                  <tr>
                                                    <td colSpan={2} className="p-1 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Namba yake/simu :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px'}}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.phone_number2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                  <tr>
                                                    <td colSpan={2} className="p-1 " style={{ lineHeight: '1.0' }}>
                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Uhusiano :
                                                            <span className="text-md font-medium text-gray-700 !text-center" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px'}}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.relationship2}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr><td><br/></td></tr>
                                                 <tr>
                                                    {/* Left Column - Bio Data */}
                                                    <td className="p-1" style={{ lineHeight: '1.0' }}>

                                                        <h4 className="text-black font-semibold flex items-center" 
                                                            style={{ 
                                                                fontFamily: 'Times New Roman, serif',
                                                                fontSize: '14pt'
                                                            }}>
                                                            Sahihi ya mwajiriwa :
                                                            <span className="text-md font-medium text-gray-700" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>
                                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                            </span>
                                                            <span className="text-xl text-black font-semibold">Tarehe:<lable className="text-md font-medium text-gray-700" style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</lable></span>
                                                        </h4>
                                                    </td>                                                    
                                                </tr>
                                               
                                                
                                            </tbody>
                                        </table>
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
                                ><a className="flex items-center text-white hover:text-primary dark:text-primary" href={`${import.meta.env.BASE_URL}contracts/required/show_detail/${formData.employee_id}`}> Cancel

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
export default ContractDetails;
