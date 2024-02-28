

import Calender from "../component/advancedUi/calender/calender";
import Hrm from "../component/dashboards/hrm/hrm";
import Normals from "../component/dashboards/normal/normal";
//Employer Registration
import Registrations from "../component/employers/registrations/registrations";
import AddClient from "../component/employers/registrations/addclients/AddClient";
import EditClient from "../component/employers/registrations/editClients/editClient";
import ShowClient from "../component/employers/registrations/showClients/showclient";

// Department and section
import Departments from "../component/employers/departments/departments";


//Hiring Process block   ######################
       //** job */
import Jobs from "../component/hiring/vacancies/newjob";
import AddJob from "../component/hiring/vacancies/addjobs/addjob";
import EditJob from "../component/hiring/vacancies/editjobs/editjob";
import ShowJob from "../component/hiring/vacancies/showjob";
import DownloadJob from "../component/hiring/templatesamples/vacancies/jobtemplate";

//Recruitment  (HR and Technical Interview)
        //HR
import HrInterview from "../component/hiring/recruitments/hrInterviews/interviewed";
import AddAssessment from "../component/hiring/recruitments/hrInterviews/addAssessment/assessment";
import EditAssessment from "../component/hiring/recruitments/hrInterviews/editAssessment/editassessment";
import ShowAssessment from "../component/hiring/recruitments/hrInterviews/showAssessment/showassessment";
import DownloadAssessment from "../component/hiring/templatesamples/hrinterviews/assessmenttemplate"

//Technical 
import TechnicalInterview from "../component/hiring/recruitments/techInterviews/interviewed";
import AddCandidate from "../component/hiring/recruitments/techInterviews/addCandidate/addcandidate";
import EditCandidate from "../component/hiring/recruitments/techInterviews/editCandidate/editcandidate";
import EditPractical from "../component/hiring/recruitments/techInterviews/editCandidate/editpracticaltest";
import ShowCandidate from "../component/hiring/recruitments/techInterviews/showCandidate/showcandidate";
import DownloadCandidate from "../component/hiring/templatesamples/technicalinterview/candidatetemplate"

//End of Hiring block
//{/**  start of Employee REgistration */}
import PersonalDetails from "../component/employees/personal/personalDetail/personaldetail";
import AddEmployee from "../component/employees/personal/addEmployee/addemployee";
import EditEmployee from "../component/employees/personal/editEmployee/editemployee";
// import EditPractical from "../component/employees/personal/editEmployee/";
import ShowEmployee from "../component/employees/personal/showEmployee/showemployee";
// import DownloadEmployee from "../component/employees/templatesamples/technicalinterview/employeetemplate"
        //Technical
// import TechInterview from "../component/hiring/personal/techInterviews/interviews";
 
// *********** End of block *********************
import Carousel from "../component/advancedUi/carousel/carousel";
import Filedetails from "../component/advancedUi/filemanager/filedetails/filedetails";
import Filemanagerlist from "../component/advancedUi/filemanager/filemanagerlist/filemanagerlist";
import Filemanagermain from "../component/advancedUi/filemanager/filemanagermain/filemanagermain";
import Gallery from "../component/advancedUi/gallery/gallery";
import Notification from "../component/advancedUi/notification/notification";
import Rangeslider from "../component/advancedUi/rangeslider/rangeslider";
import Rating from "../component/advancedUi/rating/rating";
import Sweetalert from "../component/advancedUi/sweetalert/sweetalert";
import Treeview from "../component/advancedUi/treeview/treeview";
import Dropdowns from "../component/basicUi/dropdowns/dropdowns";
import Modal from "../component/basicUi/modal/modal";
import Offcanvas from "../component/basicUi/offcanvas/offcanvas";
import Basictable from "../component/basicUi/tables/basictable/basictable";
import Datatable from "../component/basicUi/tables/datatable/datatable";
import TableEdit from "../component/basicUi/tables/tableEdit/tableEdit";
import TooltipPopover from "../component/basicUi/tooltip&popover/tooltip&popover";
import Apexchart from "../component/charts/apexchart/apexchart";
import Chartjs from "../component/charts/chartjs/chartjs";
import Echart from "../component/charts/echart/echart";
import Accordion from "../component/components/accordion/accordion";
import Alerts from "../component/components/alerts/alerts";
import Avatars from "../component/components/avatars/avatars";
import Badges from "../component/components/badges/badges";
import Blockquotes from "../component/components/blockquotes/blockquotes";
import Buttons from "../component/components/buttons/buttons";
import Cards from "../component/components/cards/cards";
import Collapse from "../component/components/collapse/collapse";
import Indicators from "../component/components/indicators/indicators";
import List from "../component/components/list/list";
import Listgroup from "../component/components/listgroup/listgroup";
import Progress from "../component/components/progress/progress";
import Skeletons from "../component/components/skeletons/skeletons";
import Spinners from "../component/components/spinners/spinners";
import Toasts from "../component/components/toasts/toasts";
import Ecommerce from "../component/dashboards/ecommerce/ecommerce";
import Breadcrumbs from "../component/elements/breadcrumbs/breadcrumbs";
import Columns from "../component/elements/columns/columns";
import Grids from "../component/elements/grids/grids";
import MegaMenu from "../component/elements/megaMenu/megaMenu";
import NavTabs from "../component/elements/nav&tabs/nav&tabs";
import Navbar from "../component/elements/navbar/navbar";
import Paginations from "../component/elements/paginations/paginations";
import Advancedforms from "../component/forms/advancedforms/advancedforms";
import Fileuploads from "../component/forms/fileuploads/fileuploads";
import Formcheckbox from "../component/forms/formcheckbox/formcheckbox";
import Formeditors from "../component/forms/formeditors/formeditors";
import Formelements from "../component/forms/formelements/formelements";
import Forminputgroup from "../component/forms/forminputgroup/forminputgroup";
import Formlayout from "../component/forms/formlayout/formlayout";
import Formradio from "../component/forms/formradio/formradio";
import Formselect from "../component/forms/formselect/formselect";
import Formswitch from "../component/forms/formswitch/formswitch";
import Formvalidation from "../component/forms/formvalidation/formvalidation";
import Leafletmap from "../component/maps/leafletmap/leafletmap";
import Simplemap from "../component/maps/simplemap/simplemap";
import Blogdetails from "../component/pagecomponent/blog/blogdetails/blogdetails";
import Blogedit from "../component/pagecomponent/blog/blogedit/blogedit";
import Blogmain from "../component/pagecomponent/blog/blogmain/blogmain";
import Contacts from "../component/pagecomponent/contacts/contacts";
import Addproduct from "../component/pagecomponent/Ecommerce/addproduct/addproduct";
import Cart from "../component/pagecomponent/Ecommerce/cart/cart";
import Checkout from "../component/pagecomponent/Ecommerce/checkout/checkout";
import Editproduct from "../component/pagecomponent/Ecommerce/editproduct/editproduct";
import Orderdetails from "../component/pagecomponent/Ecommerce/orderdetails/orderdetails";
import Orders from "../component/pagecomponent/Ecommerce/orders/orders";
import Product from "../component/pagecomponent/Ecommerce/product/product";
import Productdetails from "../component/pagecomponent/Ecommerce/productdetails/productdetails";
import Productlist from "../component/pagecomponent/Ecommerce/productlist/productlist";
import Wishlist from "../component/pagecomponent/Ecommerce/wishlist/wishlist";
import Emptypages from "../component/pagecomponent/emptypages/emptypages";
import Invoicedetails from "../component/pagecomponent/invoice/invoicedetails/invoicedetails";
import Invoicelist from "../component/pagecomponent/invoice/invoicelist/invoicelist";
import Chat from "../component/pagecomponent/mail/chat/chat";
import Mailsettings from "../component/pagecomponent/mail/mailsettings/mailsettings";
import MainMail from "../component/pagecomponent/mail/mainMail/mainMail";
import Pricingtables from "../component/pagecomponent/pricingtables/pricingtables";
import Profilesetting from "../component/pagecomponent/profile/profilesetting/profilesetting";
import Reviews from "../component/pagecomponent/reviews/reviews";
import Tasks from "../component/pagecomponent/tasks/tasks";
import Team from "../component/pagecomponent/team/team";
import Timeline from "../component/pagecomponent/timeline/timeline";
import Todolist from "../component/pagecomponent/todolist/todolist";
import Settings from "../component/systemsettings/settings";
import Remixicons from "../component/icon/remixicons/remixicons";
import Tablericons from "../component/icon/tablericons/tablericons";


//component path END

export const RouteData = [

    // {/* Dashboard content */}

    { path: `${import.meta.env.BASE_URL}dashboards/normal`, element: <Normals /> , title: ''},
    { path: `${import.meta.env.BASE_URL}dashboards/ecommerce`, element: <Ecommerce /> , title: ''},
    { path: `${import.meta.env.BASE_URL}dashboards/hrm`, element: <Hrm /> , title: ''},
    

    // {/* System Setting content */}

    { path: `${import.meta.env.BASE_URL}settings`, element: <Settings />, title: '' },
    
    
    // {/* Employer/ Client content */}

    { path: `${import.meta.env.BASE_URL}employers/registrations/registrations`, element: <Registrations />, title: 'Employers' },
    { path: `${import.meta.env.BASE_URL}employers/registrations/addclients`, element: <AddClient />, title: 'AddClient' },
    { path: `${import.meta.env.BASE_URL}employers/registrations/editClients/:id`, element: <EditClient />, title: 'Edit Client' },
    { path: `${import.meta.env.BASE_URL}employers/registrations/show_client/:id`, element: <ShowClient />, title: 'Show Client' },
    // {/*Depertment and section  */}
    { path: `${import.meta.env.BASE_URL}employers/departments/departments`, element: <Departments /> , title: ''},
    // { path: `${import.meta.env.BASE_URL}employers/attachments`, element: <Attachments /> , title: ''},
    // { path: `${import.meta.env.BASE_URL}employers/badges`, element: <Badges /> , title: ''},
    
    
    // {/*  Hiring Block   */}
       //Job application 
     { path: `${import.meta.env.BASE_URL}hiring/vacancies/jobs`, element: <Jobs /> },   
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/add_job`, element: <AddJob /> }, 
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/edit_job/:id`, element: <EditJob /> }, 
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/show_job/:id`, element: <ShowJob /> }, 
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/download_job/:id`, element: <DownloadJob /> },
    //   HR interview
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr_interviewed`, element: <HrInterview /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/add_assessment`, element: <AddAssessment/>},
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/edit_assessment/:id`, element: <EditAssessment /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/show_assessment/:id`, element: <ShowAssessment /> },
    { path: `${import.meta.env.BASE_URL}hiring/hrinterview/download_assessment/:id`, element: < DownloadAssessment />},
    
    //   Technical interview
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`, element: <TechnicalInterview /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical/add_candidate`, element: <AddCandidate/>},
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical/edit_candidate/:id`, element: <EditCandidate /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical/edit_practical/:id`, element: <EditPractical /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical/show_candidate/:id`, element: <ShowCandidate /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/download_candidate/:id`, element: < DownloadCandidate />},

    //   End of hiring block
        
   // {/**    Starting of Employee registration  */}

    //Employee Person Details
    { path: `${import.meta.env.BASE_URL}employees/personal/employee_list`, element: <PersonalDetails /> },
    { path: `${import.meta.env.BASE_URL}employees/personal/add_employee`, element: <AddEmployee/>},
    { path: `${import.meta.env.BASE_URL}employees/personal/edit_employee/:id`, element: <EditEmployee /> },
    // { path: `${import.meta.env.BASE_URL}employees/personal/edit_practical/:id`, element: <EditPractical /> },
    { path: `${import.meta.env.BASE_URL}employees/personal/show_employee/:id`, element: <ShowEmployee /> },
    // { path: `${import.meta.env.BASE_URL}employees/personal/download_employee/:id`, element: < DownloadEmployee />},









    
    
    
    
    
    
    

    
    
    
    
    



    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    


    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    // {/* Component content */}

    { path: `${import.meta.env.BASE_URL}components/accordion`, element: <Accordion /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/alerts`, element: <Alerts /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/avatars`, element: <Avatars /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/badges`, element: <Badges /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/blockquotes`, element: <Blockquotes /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/buttons`, element: <Buttons /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/cards`, element: <Cards /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/collapse`, element: <Collapse /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/indicators`, element: <Indicators /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/list`, element: <List /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/listgroup`, element: <Listgroup /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/progress`, element: <Progress /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/skeletons`, element: <Skeletons /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/spinners`, element: <Spinners /> , title: ''},
    { path: `${import.meta.env.BASE_URL}components/toasts`, element: <Toasts /> , title: ''},

    // {/* Component content */}

    { path: `${import.meta.env.BASE_URL}elements/breadcrumbs`, element: <Breadcrumbs /> , title: ''},
    { path: `${import.meta.env.BASE_URL}elements/columns`, element: <Columns /> , title: ''},
    { path: `${import.meta.env.BASE_URL}elements/grids`, element: <Grids /> , title: ''},
    { path: `${import.meta.env.BASE_URL}elements/megaMenu`, element: <MegaMenu /> , title: ''},
    { path: `${import.meta.env.BASE_URL}elements/nav&tabs`, element: <NavTabs /> , title: ''},
    { path: `${import.meta.env.BASE_URL}elements/navbar`, element: <Navbar /> , title: ''},
    { path: `${import.meta.env.BASE_URL}elements/paginations`, element: <Paginations /> , title: ''},

    // {/* Forms content */ }

    { path: `${import.meta.env.BASE_URL}forms/advancedforms`, element: <Advancedforms /> , title: ''},
    { path: `${import.meta.env.BASE_URL}forms/fileuploads`, element: <Fileuploads /> , title: ''},
    { path: `${import.meta.env.BASE_URL}forms/formcheckbox`, element: <Formcheckbox /> , title: ''},
    { path: `${import.meta.env.BASE_URL}forms/formeditors`, element: <Formeditors /> , title: ''},
    { path: `${import.meta.env.BASE_URL}forms/formelements`, element: <Formelements /> },
    { path: `${import.meta.env.BASE_URL}forms/forminputgroup`, element: <Forminputgroup /> },
    { path: `${import.meta.env.BASE_URL}forms/formlayout`, element: <Formlayout /> },
    { path: `${import.meta.env.BASE_URL}forms/formradio`, element: <Formradio /> },
    { path: `${import.meta.env.BASE_URL}forms/formselect`, element: <Formselect /> },
    { path: `${import.meta.env.BASE_URL}forms/formswitch`, element: <Formswitch /> },
    { path: `${import.meta.env.BASE_URL}forms/formvalidation`, element: <Formvalidation /> },

    // {/* Advanced UI content */ }

    { path: `${import.meta.env.BASE_URL}advancedUi/calender`, element: <Calender /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/carousel`, element: <Carousel /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/gallery`, element: <Gallery /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/notification`, element: <Notification /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/rangeslider`, element: <Rangeslider /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/rating`, element: <Rating /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/sweetalert`, element: <Sweetalert /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/treeview`, element: <Treeview /> },

    // {/* File Manager content */ }

    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filedetails`, element: <Filedetails /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filemanagerlist`, element: <Filemanagerlist /> },
    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filemanagermain`, element: <Filemanagermain /> },

    // {/* Basic UI content */ }

    { path: `${import.meta.env.BASE_URL}basicUi/dropdowns`, element: <Dropdowns /> },
    { path: `${import.meta.env.BASE_URL}basicUi/modal`, element: <Modal /> },
    { path: `${import.meta.env.BASE_URL}basicUi/offcanvas`, element: <Offcanvas /> },
    { path: `${import.meta.env.BASE_URL}basicUi/tooltip&popover`, element: <TooltipPopover /> },

    // {/* Table content */ }
    { path: `${import.meta.env.BASE_URL}basicUi/tables/basictable`, element: <Basictable /> },
    { path: `${import.meta.env.BASE_URL}basicUi/tables/datatable`, element: <Datatable /> },
    { path: `${import.meta.env.BASE_URL}basicUi/tables/tableEdit`, element: <TableEdit /> },

    // {/* Maps content */ }

    { path: `${import.meta.env.BASE_URL}maps/leafletmap`, element: <Leafletmap /> },
    { path: `${import.meta.env.BASE_URL}maps/simplemap`, element: <Simplemap /> },

    // {/* Charts content */ }

    { path: `${import.meta.env.BASE_URL}charts/apexchart`, element: <Apexchart /> },
    { path: `${import.meta.env.BASE_URL}charts/chartjs`, element: <Chartjs /> },
    { path: `${import.meta.env.BASE_URL}charts/echart`, element: <Echart /> },

    // {/* Pages content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/contacts`, element: <Contacts /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/pricingtables`, element: <Pricingtables /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/timeline`, element: <Timeline /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/team`, element: <Team /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/todolist`, element: <Todolist /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/tasks`, element: <Tasks /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/reviews`, element: <Reviews /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/emptypages`, element: <Emptypages /> },

    // {/* Profile content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/profile/profilesetting`, element: <Profilesetting /> },

    // {/* Invoice content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/invoice/invoicedetails`, element: <Invoicedetails /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/invoice/invoicelist`, element: <Invoicelist /> },

    // {/* Blog content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/blog/blogdetails`, element: <Blogdetails /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/blog/blogedit`, element: <Blogedit /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/blog/blogmain`, element: <Blogmain /> },

    // {/* Mail content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/chat`, element: <Chat /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/mailsettings`, element: <Mailsettings /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/mainMail`, element: <MainMail /> },

    // {/* Ecommerce-content content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/addproduct`, element: <Addproduct /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/cart`, element: <Cart /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/checkout`, element: <Checkout /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/editproduct`, element: <Editproduct /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/orderdetails`, element: <Orderdetails /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/orders`, element: <Orders /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/product`, element: <Product /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/productdetails`, element: <Productdetails /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/productlist`, element: <Productlist /> },
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/wishlist`, element: <Wishlist /> },

    // {/* Icons content */ }

    { path: `${import.meta.env.BASE_URL}icon/remixicons`, element: <Remixicons /> },
    { path: `${import.meta.env.BASE_URL}icon/tablericons`, element: <Tablericons /> },

]


export const SearchData = [

    // {/* Dashboard content */}

    { path: `${import.meta.env.BASE_URL}dashboards/normal`, element: <Normals /> , title: 'normal'},
    { path: `${import.meta.env.BASE_URL}dashboards/ecommerce`, element: <Ecommerce /> , title: 'ecommerce'},
    { path: `${import.meta.env.BASE_URL}dashboards/hrm`, element: <Hrm /> , title: 'hrm'},
    

    // {/* System Settings content */}

    { path: `${import.meta.env.BASE_URL}settings`, element: <Settings />, title: 'settings' },
    
    // {/*Employer of client Registration content  */}
    { path: `${import.meta.env.BASE_URL}employers/registrations/registrations`, element: <Registrations /> , title: 'employer'},
    { path: `${import.meta.env.BASE_URL}employers/departments/departments`, element: <Departments /> , title: 'department'},
{ path: `${import.meta.env.BASE_URL}employers/registrations/editClients`, element: <EditClient />, title: 'Edit Client' },
    
    
    //hiring Block
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/jobs`, element: <Jobs /> },   
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/add_job`, element: <AddJob /> }, 
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/edit_job/:id`, element: <EditJob /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/show_job/:id`, element: <ShowJob /> },    
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/download_job`, element: <DownloadJob /> }, 
     {path: `${import.meta.env.BASE_URL}hiring/recruitment/hr_interviews`, element: <HrInterview/>},
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/add_assessment/`, element: <AddAssessment /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/edit_assessment/:id`, element: <EditAssessment/>},
    
    
    // {/* Component content */}

    { path: `${import.meta.env.BASE_URL}components/accordion`, element: <Accordion /> , title: 'accordion'},
    { path: `${import.meta.env.BASE_URL}components/alerts`, element: <Alerts /> , title: 'alerts'},
    { path: `${import.meta.env.BASE_URL}components/avatars`, element: <Avatars /> , title: 'avatars'},
    { path: `${import.meta.env.BASE_URL}components/badges`, element: <Badges /> , title: 'badges'},
    { path: `${import.meta.env.BASE_URL}components/blockquotes`, element: <Blockquotes /> , title: 'blockquotes'},
    { path: `${import.meta.env.BASE_URL}components/buttons`, element: <Buttons /> , title: 'buttons'},
    { path: `${import.meta.env.BASE_URL}components/cards`, element: <Cards /> , title: 'cards'},
    { path: `${import.meta.env.BASE_URL}components/collapse`, element: <Collapse /> , title: 'collapse'},
    { path: `${import.meta.env.BASE_URL}components/indicators`, element: <Indicators /> , title: 'indicators'},
    { path: `${import.meta.env.BASE_URL}components/list`, element: <List /> , title: 'list'},
    { path: `${import.meta.env.BASE_URL}components/listgroup`, element: <Listgroup /> , title: 'listgroup'},
    { path: `${import.meta.env.BASE_URL}components/progress`, element: <Progress /> , title: 'progress'},
    { path: `${import.meta.env.BASE_URL}components/skeletons`, element: <Skeletons /> , title: 'skeletons'},
    { path: `${import.meta.env.BASE_URL}components/spinners`, element: <Spinners /> , title: 'spinners'},
    { path: `${import.meta.env.BASE_URL}components/toasts`, element: <Toasts /> , title: 'toasts'},

    // {/* Component content */}

    { path: `${import.meta.env.BASE_URL}elements/breadcrumbs`, element: <Breadcrumbs /> , title: 'breadcrumbs'},
    { path: `${import.meta.env.BASE_URL}elements/columns`, element: <Columns /> , title: 'columns'},
    { path: `${import.meta.env.BASE_URL}elements/grids`, element: <Grids /> , title: 'grids'},
    { path: `${import.meta.env.BASE_URL}elements/megaMenu`, element: <MegaMenu /> , title: 'megaMenu'},
    { path: `${import.meta.env.BASE_URL}elements/nav&tabs`, element: <NavTabs /> , title: 'nav&tabs'},
    { path: `${import.meta.env.BASE_URL}elements/navbar`, element: <Navbar /> , title: 'navbar'},
    { path: `${import.meta.env.BASE_URL}elements/paginations`, element: <Paginations /> , title: 'paginations'},

    // {/* Forms content */ }

    { path: `${import.meta.env.BASE_URL}forms/advancedforms`, element: <Advancedforms /> , title: 'advancedforms'},
    { path: `${import.meta.env.BASE_URL}forms/fileuploads`, element: <Fileuploads /> , title: 'fileuploads'},
    { path: `${import.meta.env.BASE_URL}forms/formcheckbox`, element: <Formcheckbox /> , title: 'formcheckbox'},
    { path: `${import.meta.env.BASE_URL}forms/formeditors`, element: <Formeditors /> , title: 'formeditors'},
    { path: `${import.meta.env.BASE_URL}forms/formelements`, element: <Formelements /> , title: 'formelements'},
    { path: `${import.meta.env.BASE_URL}forms/forminputgroup`, element: <Forminputgroup /> , title: 'forminputgroup'},
    { path: `${import.meta.env.BASE_URL}forms/formlayout`, element: <Formlayout /> , title: 'formlayout'},
    { path: `${import.meta.env.BASE_URL}forms/formradio`, element: <Formradio /> , title: 'formradio'},
    { path: `${import.meta.env.BASE_URL}forms/formselect`, element: <Formselect /> , title: 'formselect'},
    { path: `${import.meta.env.BASE_URL}forms/formswitch`, element: <Formswitch /> , title: 'formswitch'},
    { path: `${import.meta.env.BASE_URL}forms/formvalidation`, element: <Formvalidation /> , title: 'formvalidation'},

    // {/* Advanced UI content */ }

    { path: `${import.meta.env.BASE_URL}advancedUi/calender`, element: <Calender /> , title: 'calender'},
    { path: `${import.meta.env.BASE_URL}advancedUi/carousel`, element: <Carousel /> , title: 'carousel'},
    { path: `${import.meta.env.BASE_URL}advancedUi/gallery`, element: <Gallery /> , title: 'gallery'},
    { path: `${import.meta.env.BASE_URL}advancedUi/notification`, element: <Notification /> , title: 'notification'},
    { path: `${import.meta.env.BASE_URL}advancedUi/rangeslider`, element: <Rangeslider /> , title: 'rangeslider'},
    { path: `${import.meta.env.BASE_URL}advancedUi/rating`, element: <Rating /> , title: 'rating'},
    { path: `${import.meta.env.BASE_URL}advancedUi/sweetalert`, element: <Sweetalert /> , title: 'sweetalert'},
    { path: `${import.meta.env.BASE_URL}advancedUi/treeview`, element: <Treeview /> , title: 'treeview'},

    // {/* File Manager content */ }

    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filedetails`, element: <Filedetails /> , title: 'filedetails'},
    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filemanagerlist`, element: <Filemanagerlist /> , title: 'filemanagerlist'},
    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filemanagermain`, element: <Filemanagermain /> , title: 'filemanagermain'},

    // {/* Basic UI content */ }

    { path: `${import.meta.env.BASE_URL}basicUi/dropdowns`, element: <Dropdowns /> , title: 'dropdowns'},
    { path: `${import.meta.env.BASE_URL}basicUi/modal`, element: <Modal /> , title: 'modal'},
    { path: `${import.meta.env.BASE_URL}basicUi/offcanvas`, element: <Offcanvas /> , title: 'offcanvas'},
    { path: `${import.meta.env.BASE_URL}basicUi/tooltip&popover`, element: <TooltipPopover /> , title: 'tooltip&popover'},

    // {/* Table content */ }
    { path: `${import.meta.env.BASE_URL}basicUi/tables/basictable`, element: <Basictable /> , title: 'basictable'},
    { path: `${import.meta.env.BASE_URL}basicUi/tables/datatable`, element: <Datatable /> , title: 'datatable'},
    { path: `${import.meta.env.BASE_URL}basicUi/tables/tableEdit`, element: <TableEdit /> , title: 'tableEdit'},

    // {/* Maps content */ }

    { path: `${import.meta.env.BASE_URL}maps/leafletmap`, element: <Leafletmap /> , title: 'leafletmap'},
    { path: `${import.meta.env.BASE_URL}maps/vectormap`, element: <Simplemap /> , title: 'vectormap'},

    // {/* Charts content */ }

    { path: `${import.meta.env.BASE_URL}charts/apexchart`, element: <Apexchart /> , title: 'apexchart'},
    { path: `${import.meta.env.BASE_URL}charts/chartjs`, element: <Chartjs /> , title: 'chartjs'},
    { path: `${import.meta.env.BASE_URL}charts/echart`, element: <Echart /> , title: 'echart'},

    // {/* Pages content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/contacts`, element: <Contacts /> , title: 'contacts'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/pricingtables`, element: <Pricingtables /> , title: 'pricingtables'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/timeline`, element: <Timeline /> , title: 'timeline'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/team`, element: <Team /> , title: 'team'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/todolist`, element: <Todolist /> , title: 'todolist'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/tasks`, element: <Tasks /> , title: 'tasks'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/reviews`, element: <Reviews /> , title: 'reviews'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/emptypages`, element: <Emptypages /> , title: 'emptypages'},

    // {/* Profile content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/profile/profilesetting`, element: <Profilesetting /> , title: 'profilesetting'},

    // {/* Invoice content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/invoice/invoicedetails`, element: <Invoicedetails /> , title: 'invoicedetails'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/invoice/invoicelist`, element: <Invoicelist /> , title: 'invoicelist'},

    // {/* Blog content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/blog/blogdetails`, element: <Blogdetails /> , title: 'blogdetails'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/blog/blogedit`, element: <Blogedit /> , title: 'blogedit'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/blog/blogmain`, element: <Blogmain /> , title: 'blogmain'},

    // {/* Mail content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/chat`, element: <Chat /> , title: 'chat'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/mailsettings`, element: <Mailsettings /> , title: 'mailsettings'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/mainMail`, element: <MainMail /> , title: 'mainMail'},

    // {/* Ecommerce-content content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/addproduct`, element: <Addproduct /> , title: 'addproduct'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/cart`, element: <Cart /> , title: 'cart'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/checkout`, element: <Checkout /> , title: 'checkout'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/editproduct`, element: <Editproduct /> , title: 'editproduct'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/orderdetails`, element: <Orderdetails /> , title: 'orderdetails'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/orders`, element: <Orders /> , title: 'orders'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/product`, element: <Product /> , title: 'product'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/productdetails`, element: <Productdetails /> , title: 'productdetails'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/productlist`, element: <Productlist /> , title: 'productlist'},
    { path: `${import.meta.env.BASE_URL}pagecomponent/Ecommerce/wishlist`, element: <Wishlist /> , title: 'wishlist'},

    // {/* Icons content */ }

    { path: `${import.meta.env.BASE_URL}icon/remixicons`, element: <Remixicons /> , title: 'remixicons'},
    { path: `${import.meta.env.BASE_URL}icon/tablericons`, element: <Tablericons /> , title: 'tablericons'},

]