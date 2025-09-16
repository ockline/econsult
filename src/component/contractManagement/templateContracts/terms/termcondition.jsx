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
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
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

                                <div className="table-bordered rounded-md overflow-auto" style={{
                                    border: '5px solid black',
                                    boxShadow: 'inset 0 0 0 2px black',
                                    outline: '4px solid transparent', /* Adjust the width to control the gap */
                                    padding: '10px'
                                }}>
                                    <br /><br /><br />
                                    <div className="flex flex-col lg:flex-row justify-between mb-5 space-y-4">
                                        {/* <div className="text-end"></div> */}
                                        <div className="text-center">
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center"></h1>
                                            <br /><br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center">
                                            </h1><br />
                                            <br /><br /><br /><br /><br /><br /><br></br>

                                            <h1 className="text-3xl text-black uppercase font-bold text-center">MASHARTI YA MKATABA WA AJIRA</h1>
                                            <br /><br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center"></h1>
                                            <br /><br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center"></h1>
                                            <br />
                                            <h1 className="text-2xl text-black uppercase font-semibold text-center"></h1>
                                            <br />
                                            <br />
                                        </div>
                                    </div>
                                    <br /><br /><br /><br /><br /><br /><br /><br></br>
                                    <br /><br></br><br /><br></br><br /><br></br>
                                    <table className="w-full border-collaps">
                                        <tbody>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black font-bold">
                                                        Namba ya Utambulisho wa Mfanyakazi:
                                                        <span className="text-md text-black font-medium" style={{ borderBottom: '3px dotted black', paddingBottom: '2px', display: 'inline-block', width: '310px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.reg_number}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black font-bold ">
                                                        Jina la Mfanyakazi:
                                                        <span className="text-md text-black font-medium" style={{ borderBottom: '3px dotted black', paddingBottom: '2px', display: 'inline-block', width: '460px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.employee_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                              <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black font-bold ">
                                                        Daraja / Nafasi ya kazi:
                                                        <span className="text-md text-black font-medium" style={{ borderBottom: '3px dotted black', paddingBottom: '1px', display: 'inline-block', width: '440px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.job_title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                              <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black font-bold ">
                                                        Idara / Kitengo:
                                                        <span className="text-md text-black font-medium" style={{ borderBottom: '3px dotted black', paddingBottom: '1px', display: 'inline-block', width: '500px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.department}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black font-bold ">
                                                        Sahihi ya Mfanyakazi:
                                                        <span className="text-md text-black font-medium" style={{ borderBottom: '3px dotted black', paddingBottom: '2px', display: 'inline-block', width: '440px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.employee_nam}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={2} className="p-4 " style={{ lineHeight: '1.0' }}>
                                                    <h4 className="text-lg text-black font-bold">
                                                        Tarehe:
                                                        <span className="text-md text-black font-medium" style={{ borderBottom: '3px dotted black', paddingBottom: '1px', display: 'inline-block', width: '560px' }}>
                                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{formData.date_contracted}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                        </span>
                                                    </h4>
                                                </td>
                                            </tr>
                                          
                                          
                                        </tbody>
                                    </table>
                                    <br /><br />
                                </div>
                              <div style={{ marginBottom: '600px' }}></div>
                                <div className="sm:grid grid-cols-12 gap-12 pb-5 space-y-5">
                                    <div className="md:col-span-12 col-span-9  my-auto">
                                        <br /><br /><br /><br />
                                        <table className="w-full border-collaps">
                                            <tbody>

                                                <tr>
                                                    <td colSpan={2} className="p-4 " style={{ lineHeight: '1.5' }}>
                                                        <h4 className="text-lg text-black font-semibold  text-center">
                                                            MASHARTI YA MKATABA WA AJIRA

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-md text-black font-bold  ">
                                                            Kazi
                                                        </h4><br />
                                                        <h4 className="text-lg text-black font-bold" style={{ width: '800px', lineHeight: '1.5' }} >
                                                            MWAJIRI:
                                                            <span className="text-md text-black font-bold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.employer_name}&nbsp;&nbsp;&nbsp;<label className="text-md font-medium">
                                                                    wanafuatilia sera ya usawa katika ajira, kutokuwa na ubaguzi kwa mfanyakazi yeyote kwa rangi, umri, jinsia, utaifa, dini kwa kuzingatia Sheria ya Ajira na Mahusiano kazini.</label>
                                                            </span>

                                                        </h4>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td className="p-4" >
                                                        <h4 className="text-lg text-black font-bold" style={{ lineHeight: '1.5' }} >
                                                            Nafasi za Kazi katika Mradi wa
                                                            <span className="text-md text-black font-bold" >
                                                                &nbsp;&nbsp;&nbsp;{formData.employer_name}&nbsp;&nbsp;&nbsp;<label className="text-md  font-medium">
                                                                    imegawanyika katika Makundi matatu::</label>
                                                            </span>
                                                        </h4>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                                <div><div>
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td className="text-center text-black">
                                                    <h4 className="p-6  text-md text-black font-bold " style={{ lineHeight: '1.5' }}>
                                                        1.
                                                    </h4>
                                                </td>
                                                <td>
                                                    <h4 className="text-md  font-medium">
                                                    <span className="text-md text-black font-medium" style={{ width: '1300%', lineHeight: '1.5' }} >
                                                        <label className="text-lg text-black font-bold">Nafasi ya uongozi – </label>  Wafanyakazi  wanaoajiriwa kwenye kada hii ni mameneja walio na mamlaka ya kimeneja, Wafanyakazi wenye ujuzi na uzoefu wa hali ya juu wana mishahala maalum ambayo imejumuisha makato yote ya kisheria na posho zisizo za kisheria- kama zipo. Hakuna posho au malipo ya muda wa ziada yatakayolipwa.
                                                        </span>
                                                        </h4>
                                                </td>
                                            </tr>
                                            <br/><br/>
                                            <tr>
                                                <td className="text-center text-black">
                                                    <h4 className="p-6  text-md text-black font-bold " style={{ lineHeight: '1.5' }}>
                                                        2.
                                                    </h4>
                                                </td>
                                                <td>
                                                    <span className="text-md text-black font-medium" style={{ width: '1300%', lineHeight: '1.5' }} >
                                                        <label className="text-lg text-black font-bold">Nafasi ya viongozi wasaidizi: </label> Wafanyakazi walio katika kada hii inawajumuisha wafanyakazi wote wenye Shahada, na wataalamu wengine ambao wanatambulika kama wasimamizi. Hii inajumuisha Wahandisi, Wahasibu, Wapimaji Ramani, Maafisa Rasilimali Watu, Wasimamizi wa Kazi. Nafasi hii inakaribisha mshahara ghafi ukijumuisha posho ya madaraka ambayo ni sawa na asilimia 30% ya mshahara wa mwezi kujumuisha
                                                    </span></td>
                                            </tr>
                                            <tr>
                                                <td className="text-center text-black">
                                                    <h4 className="p-6  text-md text-black font-bold " style={{ lineHeight: '1.5' }}>
                                                        3.
                                                    </h4>
                                                </td>
                                                <td>
                                                    <span className="text-md text-black font-medium" style={{ width: '1300%', lineHeight: '1.5' }} >
                                                        <label className="text-lg text-black font-bold">Mafundi: </label> Mtumishi aliyeajiriwa katika kada hii anakua katika usimamizi wa msimamizi au mfanyakazi wa cheo cha juu. Kada hii inapata malipo ya saa za ziada.
                                                    </span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div></div>
                               
                                <table>
                                    <tbody>
                                        <tr>
                                            {/* <td></td> */}
                                            <td className="" colSpan={2}>
                                                <h4 className="p-4 text-lg text-black font-bold " style={{ lineHeight: '1.5' }}>
                                                    Nidhamu
                                                </h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="" colSpan={2}>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Mwajiri ana haki ya kusitisha mkataba wa mfanyakazi ikiwa mfanyakazi atashindwa kufanya kazi au kufanya makosa yafuatayo. Hata hivyo usitishwaji wa mkataba wowote utafuata taratibu na kanuni kama ilivyoainishwa kwenye sheria ya ajira na mahusiano kazini Tanzania.
                                                    <br />
                                                    Mfanyakazi atafikishwa kwenye kamati ya nidhamu n ahata kupelekea kuachishwa kazi ikiwa atafanya makosa yafuatayo:
                                                </span>
                                                <br /> <br />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; i.&nbsp;&nbsp;</td>
                                            <td >
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Kuchelewa kazini kulikokithiri
                                                    
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ii.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Kutokuwepo kazini kwa siku 5 za kazi bila sababu maalum.
                                                </span>
                                            </td>
                                        </tr>
                                        
                                        
                                        <tr>
                                            <td className="text-center text-black"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; iii.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Uzembe kazini, kutokutii maelekezo, utovu wa nidhamu, ukosefu wa ujuzi, na ukiukaji mkubwa wa sheria za usalama.
                                                </span></td>
                                        </tr>
                                    
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; iv.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Wizi, udanganyifu, kughushi, kuharibu mali kwa makusudi, kupigana, kushiriki kwenye mgomo usiofuata sheria/ kusababisha migogoro, kulewa au kunywa pombe muda wa kazi na kutoa taarifa zinazohusu kampuni au shughuli za miradi.
                                                </span></td>
                                        </tr>
                                       
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; v.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Kukutwa na pombe, kilevi chochote au bangi eneo la mradi, itapelekea utovu wa nidhamu ambao utasababisha mfanyakazi kuachishwa kazi.
                                                </span></td>
                                        </tr>
                                       
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; vi.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                  Kuvuta sigara kwenye maeneo yasiyoruhusiwa kwa sababu za kiafya na usalama.
                                                </span></td>
                                        </tr>
                                      
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; vii.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Kushindwa kufanya kazi uliyoajiriwa nayo kwa sababu tofauti na ugonjwa.
                                                </span></td>
                                        </tr>

                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; viii.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                  Kupigana au kuleta fujo au taharuki pahala pa kazi, kwa mwajiriwa mwenzako, au mtu yeyote ndani ya mradi.
                                                    
                                                </span></td>
                                        </tr>
                                     <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ix.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Kutoweka kazini wakati wa kazi bila ruhusa.
                                                </span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; x.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                 Wafanyakazi wote wataanza likizo zao jumamosi na kurudi Jumapili ili kuweza kupatiwa usafiri.
                                                </span></td>
                                        </tr>
                                      <br/><br/><br/> <br/><br/><br/> <br/><br/><br/>
                                        <tr >
                                           
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xi.&nbsp;&nbsp;</td>
                                            <td><br/><br/> <br/><br/><br/>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5'}} >
                                                    Ili Mfanyakazi aweze kupata likizo lazima utaratabu wa kupata likizo ufuatwe ikiwemo kujaza fomu ya likizo na mkuu wa idara husika kupitisha likizo hiyo. Hakuna mfanyakazi ataruhusiwa kwenda likizo bila kufuata utaratibu. Fomu ya likizo lazima ikabidhiwe kitengo cha rasilimali watu kabla ya kutoka nje ya mradi. 
                                                </span></td>
                                        </tr>
                                        <br />
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xii.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Huruhusiwi kufanya kazi masaa ya ziada kama huna idhini kutoka kwa kiongozi wako.
                                                </span></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xiii.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Huruhusiwi kutumia kifaa cha mahudhurio jumapili kama hujafanya kazi.
                                                </span></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xiv.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Ukipata tatizo toa taarifa kwa kiongozi wako na kama hajatatua ndani ya saa 24 uende ofisi ya Rasilimali watu. Kama tatizo linamuhusu Mkuu wa Kitengo nenda Ofisi ya Rasilimali watu moja kwa moja.
                                                </span></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xv.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Kuwa makini na kipindi cha mapumziko cha mchana, kuchelewa baada ya chakula bila taarifa unaweza kuadhibiwa.
                                                </span></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xvi.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                  Huruhusiwi kutumia kadi ya mahudhurio kuonyesha umeingia kazini ilhali haupo kazini
                                                </span></td>
                                        </tr>
                                       
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; xvii.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Hairuhusiwi kumpa mtu mwingine kifaa chako cha mahudhurio ili akitumie kuonyesha  umeingia kazini.
                                                </span></td>
                                        </tr>
                                        <br />
                                    </tbody>
                                </table>
                                {/* last paragraph */}
                                 
                                  <div style={{ marginBottom: '1200px' }}></div>
                                
                                                               
                                <table>
                                    <tbody>
                                        <tr>
                                            {/* <td></td> */}
                                            <td className="" colSpan={2}>
                                                <br/><br/>
                                                <h4 className="p-4 text-lg text-black font-bold text-center" style={{ lineHeight: '1.5' }}>
                                                    VITU VYA KUZINGATIA KWA AFYA YA KIMAZINGIRA NA TARATIBU ZA KIUSALAMA NA MAKUBALIANO YA UTENDAJI KAZI WENYE TIJA.
                                                </h4>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="" colSpan={2}>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                  Wafanyakazi wanapaswa kukubali muongozo huu wa afya na usalama mahala pa kazi katika mradi ili kuwafanya waweze kufanya kazi kwa usalama na ufanisi. Kwamba watazingatia taratibu zilizoainishwa;
                                                </span>
                                                <br/><br/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center text-black" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1.&nbsp;&nbsp;</td>
                                            <td ><br />
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                  I will come to work physically fit and alert as I understand the hazard associated with a person under the influence of alcohol or other drug that numbs the sense and slows reaction time.
                                                    <br />
                                                    Nitakuja kufanya kazi nikiwa afya njema na naelewa madhara ya kufanya kazi nikiwa nimetumia pombe au madawa ya kulevya kwamba zinapunguza ufahamu na kupunguza umakini kazini.
                                                </span>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 2.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                               Nitatumia nguo na vifaa vya usalama vilivyoainishwa kwa kazi yangu kama inavyostahili.
                                                </span>
                                            </td>
                                        </tr>
                                        
                                        
                                        <tr>
                                            <td className="text-center text-black"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 3.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Nitafuata taratibu alama na maelekezo yote ya kimazingira katika mradi huu.
                                                </span></td>
                                        </tr>
                                    
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 4.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Nitatunza vifaa vya kazi ambavyo natumia na kurudisha vifaa vibovu kwa kiongozi wangu au ghala la vifaa
                                                </span></td>
                                        </tr>
                                       
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 5.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Sitajaribu kurekebisha umeme au waya za umeme nitamjulisha kiongozi wangu au fundi wa umeme inapotokea itilafu ya umeme.
                                                </span></td>
                                        </tr>
                                       
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 6.&nbsp;&nbsp;</td>
                                            <td><br/>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                 Kama nitahitajika kupanda, nitahakikisha matumizi ya ngazi au majukwaa ni salama. Ngazi za chuma hazitatumika tutakapokua tunafanya kazi zinazohusiana na umeme kwa sababu ni hatari kutokana na kuweza kusafirisha umeme.
                                                </span></td>
                                        </tr>
                                      
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 7.&nbsp;&nbsp;</td>
                                            <td><br />
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Sitaweza kufanya kazi kwenye urefu wa mita 2 bila kutumia mkanda wa usalama na vifaa vyote vingine vitakavyonikinga nisidondoke.
                                                </span></td>
                                        </tr>

                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 8.&nbsp;&nbsp;</td>
                                            <td><br />
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                               Sitasafisha au kufanya kazi yeyote katika eneo lenye machine zisizolindwa mpaka nitakapo funga swichi zote kwa kufuata taratibu za mradi za kuzima na nitakapojua kiongozi wangu ameamua hivyo.         
                                                </span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 9.&nbsp;&nbsp;</td>
                                            <td><br />
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Sitaendesha gari au mtambo wowote ambao sijafundishwa namna ya kuutumia au kuruhusiwa kuutumia.
                                                </span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 10.&nbsp;&nbsp;</td>
                                            <td><br />
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                Nitaendesha gari au mtambo niliopewa /Gari/mashine nitakapohakikisha kwamba uko vizuri vifaa vyote vya kiusalama kama breki na taa zinafanya kazi vizuri.
                                                </span></td>
                                        </tr>
                                      
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 11.&nbsp;&nbsp;</td>
                                            <td>
                                                <br/>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Sitapumzika chini au pembezoni mwa gari au mtambo wakati wa kazi 
                                                </span></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 12.&nbsp;&nbsp;</td>
                                            <td><br/>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Nitatii taratibu zote za usalama barabarani za mradi na za nchi. Nitafunga mkanda wa usalama mara tu niingiapo kwenye gari au mtambo.
                                                </span></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 13.&nbsp;&nbsp;</td>
                                            <td>
                                                <br/>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                    Sitaruka kwenda chini au kuharakisha kuruka umbali mrefu ilhali nikijua madhara ya ajali itakayotokea.
                                                </span></td>
                                        </tr>
                                        <br/>
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 14.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Sitajihusisha na kutaniana, kugombezana au kurushiana vifaa hata kwa mchezo kwa kua nafahamu kitendo hicho kinaweza sababisha ajali kwangu na wengine.
                                                </span></td>
                                        </tr>
                                         <br/>
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 15.&nbsp;&nbsp;</td>
                                            <td>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                  Nitatumia hewa mgando kwa sababu za kikazi tu, ninafahamu kwamba kutumia kwa mchezo au kupuliza nguo za kazi inaweza kusababisha ajali mbaya.
                                                </span></td>
                                        </tr>
                                        
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 16.&nbsp;&nbsp;</td>
                                            <td>
                                                 <br/>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                Nitaweka eneo langu la kazi kuwa safi na kwenye mpangilio mzuri na nitasafisha mafuta na mwagiko la vimiminika vingine.
                                                </span></td>
                                        </tr>
                                        <tr>
                                            <td className="text-center text-black">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 17.&nbsp;&nbsp;</td>
                                            <td>
                                                <br/>
                                                <span className="text-md text-black font-medium" style={{ width: '800px', lineHeight: '1.5' }} >
                                                   Nitatoa taarifa ya kitendo chochote ambacho sio cha usalama ambacho nitakiona kwa kiongozi wangu wa kazi.
                                                </span></td>
                                        </tr>
                                        <br />
                                    </tbody>
                                </table>
                                <div><div>
                                    <br />
                                    <div>
                                        <span className="p-4 text-lg text-black font-medium" style={{ lineHeight: '1.5' }} >
                                             Mimi&nbsp;<label style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px', display: 'inline-block', width: '350px' }}></label>&nbsp;ninaahidi nitazingatia maelekezo yote na nitakua&nbsp;&nbsp; mtumishi mwenye ndidhamu muda wote.
                                        </span>
                                        <br /><br />
                                    <span className="p-4 text-lg text-black font-bold" style={{ lineHeight: '1.5' }} >
                                             Sahihi ya Mfanyakazi: &nbsp;<label style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px', display: 'inline-block', width: '250px' }}></label>&nbsp;&nbsp; Tarehe.<label style={{ borderBottom: '3px dotted black', paddingBottom: '0.2px', display: 'inline-block', width: '250px' }}></label>
                                        </span>
                                       

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
