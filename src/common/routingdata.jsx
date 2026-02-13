

import Calender from "../component/advancedUi/calender/calender";
import Hrm from "../component/dashboards/hrm/hrm";
import Normals from "../component/dashboards/normal/normal";
//Sysytem Setting (Manage Roles)
import AddRoles from "../component/systemsettings/settings";
import ManageRoles from "../component/systemsettings/UserRoles";



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
import JobWorkflow from "../component/hiring/vacancies/workflows/workflow"
import DownloadJob from "../component/hiring/templatesamples/vacancies/jobtemplate";

//Recruitment  (HR and Technical Interview)
//HR
import HrInterview from "../component/hiring/recruitments/hrInterviews/interviewed";
import AddAssessment from "../component/hiring/recruitments/hrInterviews/addAssessment/assessment";
import EditAssessment from "../component/hiring/recruitments/hrInterviews/editAssessment/editassessment";
import ShowAssessment from "../component/hiring/recruitments/hrInterviews/showAssessment/showassessment";
import DownloadAssessment from "../component/hiring/templatesamples/hrinterviews/assessmenttemplate";

//Technical 
import TechnicalInterview from "../component/hiring/recruitments/techInterviews/interviewed";
import AddCandidate from "../component/hiring/recruitments/techInterviews/addCandidate/addcandidate";
import EditCandidate from "../component/hiring/recruitments/techInterviews/editCandidate/editcandidate";
import EditPractical from "../component/hiring/recruitments/techInterviews/editCandidate/editpracticaltest";
import ShowCandidate from "../component/hiring/recruitments/techInterviews/showCandidate/showcandidate";
import DownloadCandidate from "../component/hiring/templatesamples/technicalinterview/candidatetemplate";

//************ End of Hiring block ******************************

//{/**  start of Employee REgistration */}  step 1
import PersonalDetails from "../component/employees/personal/personalDetail/personaldetail";
import AddEmployee from "../component/employees/personal/addEmployee/addemployee";
import EditEmployee from "../component/employees/personal/editEmployee/editemployee";
import ShowEmployee from "../component/employees/personal/showEmployee/showemployee";
import DownloadEmployee from "../component/employees/templateDocument/personal/personaldetail";

// Exit Management (Resignations)
import ResignationList from "../component/exits/resignation/ResignationList";
import AddResignation from "../component/exits/resignation/AddResignation";
import EditResignation from "../component/exits/resignation/EditResignation";
import ViewResignation from "../component/exits/resignation/ViewResignation";

// End Contract Management
import EndContractList from "../component/exits/EndContract/EndContractList";
import AddEndContract from "../component/exits/EndContract/AddEndContract";
import EditEndContract from "../component/exits/EndContract/EditEndContract";
import ViewEndContract from "../component/exits/EndContract/ViewEndContract";

// End Specific Task Contract Management
import AddEndSpecificTask from "../component/exits/SpecificTask/AddEndSpecificTask";
import EditEndSpecificTask from "../component/exits/SpecificTask/EditEndSpecificTask";
import ViewEndSpecificTask from "../component/exits/SpecificTask/ViewEndSpecificTask";

// Mutual Agreement Management
import AddMutualAgreement from "../component/exits/MutualAgrement/AddMutualAgreement";
import EditMutualAgreement from "../component/exits/MutualAgrement/EditMutualAgreement";
import ViewMutualAgreement from "../component/exits/MutualAgrement/ViewMutualAgreement";

// Retrenchment Management
import AddRetrenchment from "../component/exits/Retrenchement/AddRetrenchment";
import EditRetrenchment from "../component/exits/Retrenchement/EditRetrenchment";
import ViewRetrenchment from "../component/exits/Retrenchement/ViewRetrenchment";

//Reduired Documentation step 2
import DocumentDetails from "../component/employees/documentRequired/uploaded/uploaded";
import UploadDocument from "../component/employees/documentRequired/uploadDocument/uploaddocument";
import FileManagerList from "../component/employees/documentRequired/fileManagerlist/filemanagers";
import FileDetail from "../component/employees/documentRequired/fileDetails/filedetails";
// *********** End of block *********************

//Social Records step 3
import SocialRecords from "../component/employees/social/socialRecord/details";
import AddSocialRecord from "../component/employees/social/addRecord/addrecord";
import EditSocialRecord from "../component/employees/social/editRecord/editrecord";
import ShowSocialRecord from "../component/employees/social/showRecord/showrecord";
import DownloadSocialRecord from "../component/employees/templateDocument/social/socialrecord";


//Induction Training  step 4
import InductionTraining from "../component/employees/induction/training/inductionTraining";
import AddInductionTraining from "../component/employees/induction/addInduction/addtraining";
import EditInductionTraining from "../component/employees/induction/editInduction/edittraining";
import ShowInductionTraining from "../component/employees/induction/showInduction/showtraining";
import DownloadInductionTraining from "../component/employees/templateDocument/induction/inductiontraining";

// Personnel ID Aplication  ******* its after contract generation step 6
import PersonnelApplication from "../component/employees/application/idApplication/application";
import AddApplication from "../component/employees/application/addApplication/addapplication";
import EditApplication from "../component/employees/application/editApplication/editapplication";
import ShowApplication from "../component/employees/application/showApplication/showapplication";
import DownloadApplication from "../component/employees/templateDocument/application/personnelapplication";

//Genral Id Application  this is for external. trainnee, subcontractor
import AddGeneralId from "../component/employees/application/general/addgeneralId";
import EditGeneralApplication from "../component/employees/application/general/editapplication";
import ShowGeneralApplication from "../component/employees/application/general/showapplication";
import DownloadGeneralApplication from "../component/employees/application/general/idpreview";

/** *******  End of Employee Registration Block *********************************************************************** */


/**  Start of contract Block  step  5*/  
import EmployeeContracts from "../component/contractManagement/Contracted/employeecontract";

       //Required Details || Taarifa za MWajiriwa kwaajili ya mikataba - kitambulisho
import RequiredDetails from "../component/contractManagement/requiredDetails/details";
import AddRequiredDetails from "../component/contractManagement/requiredDetails/addDetails/adddetail";
import EditRequiredDetails from "../component/contractManagement/requiredDetails/editDetails/editdetail";
import ShowRequiredDetails from "../component/contractManagement/requiredDetails/showDetails/showdetail";
import DownloadContractDetail from "../component/contractManagement/templateContracts/contractDetail/contract";

    // Fixed Term Contract    
import FixedContract from "../component/contractManagement/fixed/contractFixed/fixedContract";
import AddFixedContract from "../component/contractManagement/fixed/addFixed/addFixed";
import EditFixedContract from "../component/contractManagement/fixed/editFixed/editFixed";
import ShowFixedContract from "../component/contractManagement/fixed/showFixed/showFixed";
import DownloadFixedContract from "../component/contractManagement/templateContracts/contractFixed/fixed";
    
//Specific Task //SpecificTaskContract
import SpecificTaskContract from "../component/contractManagement/specific/specificTask/specific";
import EndSpecificEndContractList from "../component/exits/SpecificTask/EndSpecificEndContractList";
import MutualAgreementList from "../component/exits/MutualAgrement/MutualAgreementList";
import RetrenchmentList from "../component/exits/Retrenchement/RetrenchmentList";
import AddSpecificTask from "../component/contractManagement/specific/addSpecific/addspecifictask";
import EditSpecificTask from "../component/contractManagement/specific/editSpecifictask/editspecific";
import ShowSpecificTask from "../component/contractManagement/specific/showSpecifictask/showspecific";
import DownloadSpecificTask from "../component/contractManagement/templateContracts/specific/specifictask";

// Terms and Condition 
import TermConditions from "../component/contractManagement/termsCondition/terms/termcondition";
import AddTermConditions from "../component/contractManagement/termsCondition/addTerms/addterm";
import EditTermConditions from "../component/contractManagement/termsCondition/editTerms/editterm";
import ShowTermConditions from "../component/contractManagement/termsCondition/showTerm/showterm";
import DownloadTermConditions from "../component/contractManagement/templateContracts/terms/termcondition";

//Leave Management
//Annual
import AnnualLeave from "../component/leave/annualleave/index";
import AddAnnualLeave from "../component/leave/annualleave/addannual";
import EditAnnualLeave from "../component/leave/annualleave/aditannual";
import ShowAnnualLeave from "../component/leave/annualleave/showleave";
// import DownloadAnnualLeave  from "../component/leaves/AnnualLeave/annualLeave";
//Emergency 

import AddEmergencyLeave from "../component/leave/emergencyleave/addemergencyleave";
import EditEmergencyLeave from "../component/leave/emergencyleave/editemergencyleave";
import ShowEmergencyLeave from "../component/leave/emergencyleave/showemergencyleave";

 //Sick
import SickLeave from "../component/leaves/SickLeave/Index";
import AddSickLeave from "../component/leaves/SickLeave/AddLeave";
import EditSickLeave from "../component/leaves/SickLeave/EditLeave";
import ShowSickLeave from "../component/leaves/SickLeave/ShowLeave";
import DownloadSickLeave from  "../component/leaves/SickLeave/Download"

//Maternity
import MaternityLeave from "../component/leaves/Maternity/Index";
import AddMaternityLeave from "../component/leaves/Maternity/AddMaternity";
import EditMaternityLeave from "../component/leaves/Maternity/EditMaternity";
import ShowMaternityLeave from "../component/leaves/Maternity/ShowMaternity";
import DownloadMaternityLeave from  "../component/leaves/Maternity/Download"

//Paternity
import PaternityLeave from "../component/leaves/Paternity/Index";
import AddPaternityLeave from "../component/leaves/Paternity/AddPaternity";
import EditPaternityLeave from "../component/leaves/Paternity/EditPaternity";
import ShowPaternityLeave from "../component/leaves/Paternity/ShowPaternity";
import DownloadPaternityLeave from  "../component/leaves/Paternity/Download"

// //Compansionate
import CompassionateLeave from "../component/leaves/Compassionate/Index";
import AddCompassionateLeave from "../component/leaves/Compassionate/AddCompassionate";
import EditCompassionateLeave from "../component/leaves/Compassionate/EditCompassionate";
import ShowCompassionateLeave from "../component/leaves/Compassionate/ShowCompassionate";
import DownloadCompassionateLeave from "../component/leaves/Compassionate/Download"

//attendances
import Attendance from "../component/attendances/NormalWorking/Index";
// import AddAttendance from "../component/attendances/NormalWorking/AddAttendance";
import EditAttendance from "../component/attendances/NormalWorking/Edit";
import ShowAttendance from "../component/attendances/NormalWorking/Show";
import OverTimeAttendance from "../component/attendances/OverTime/Index";
import EditOvertime from "../component/attendances/OverTime/Edit";
import ShowOvertime from "../component/attendances/OverTime/Show";

//Industrial Relation 
import Misconduct from "../component/industrialRelationship/Misconduct/Index";
import AddMisconduct from "../component/industrialRelationship/Misconduct/Add";
import EditMisconduct from "../component/industrialRelationship/Misconduct/Edit";
import ShowMisconduct from "../component/industrialRelationship/Misconduct/Show";

import PerfomanceReview from "../component/industrialRelationship/PerfomanceReview/Index";
import AddPerfomanceReview from "../component/industrialRelationship/PerfomanceReview/Add";
import EditPerfomanceReview from "../component/industrialRelationship/PerfomanceReview/Edit";
import ShowPerfomanceReview from "../component/industrialRelationship/PerfomanceReview/Show";

import PerfomanceCapacity from "../component/industrialRelationship/PerfomanceCapacity/Index";
import AddPerfomanceCapacity from "../component/industrialRelationship/PerfomanceCapacity/Add";
import EditPerfomanceCapacity from "../component/industrialRelationship/PerfomanceCapacity/Edit";
import ShowPerfomanceCapacity from "../component/industrialRelationship/PerfomanceCapacity/Show";
//assessment by Dr

import AddPerformanceAssessment from "../component/industrialRelationship/PerfomanceCapacity/AddAssessment";
import EditPerformanceAssessment from "../component/industrialRelationship/PerfomanceCapacity/EditAssessment";
import ShowPerformanceAssessment from "../component/industrialRelationship/PerfomanceCapacity/ShowAssessment";

import Disciplinary from "../component/industrialRelationship/Disciplinary/Index";
import AddDisciplinary from "../component/industrialRelationship/Disciplinary/Add";
import EditDisciplinary from "../component/industrialRelationship/Disciplinary/Edit";
import ShowDisciplinary from "../component/industrialRelationship/Disciplinary/ShowDisciplinary";





import Grievances from "../component/industrialRelationship/Grievances/Index";
import AddGrievances from "../component/industrialRelationship/Grievances/Add";
import EditGrievances from "../component/industrialRelationship/Grievances/Edit";
import ShowGrievances from "../component/industrialRelationship/Grievances/Show";




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

import Remixicons from "../component/icon/remixicons/remixicons";
import Tablericons from "../component/icon/tablericons/tablericons";


//component path END

export const RouteData = [

    // {/* Dashboard content */}

    { path: `${import.meta.env.BASE_URL}dashboards/normal`, element: <Normals />, title: '', roles : ['ALL'] },
    { path: `${import.meta.env.BASE_URL}dashboards/ecommerce`, element: <Ecommerce />, title: '' },
    { path: `${import.meta.env.BASE_URL}dashboards/hrm`, element: <Hrm />, title: '' },


    // {/* System Setting content */} ManageRoles
    { path: `${import.meta.env.BASE_URL}add_roles`, element: <AddRoles />, title: '', roles: ['DEV', 'SA'] },
    { path: `${import.meta.env.BASE_URL}manage_roles`, element: <ManageRoles />, title: '' },

    // {/* Employer/ Client content */}

    { path: `${import.meta.env.BASE_URL}employers/registrations/registrations`, element: <Registrations />, title: 'Employers' },
    { path: `${import.meta.env.BASE_URL}employers/registrations/addclients`, element: <AddClient />, title: 'AddClient' },
    { path: `${import.meta.env.BASE_URL}employers/registrations/editClients/:id`, element: <EditClient />, title: 'Edit Client' },
    { path: `${import.meta.env.BASE_URL}employers/registrations/show_client/:id`, element: <ShowClient />, title: 'Show Client' },
    // {/*Depertment and section  */}
    { path: `${import.meta.env.BASE_URL}employers/departments/departments`, element: <Departments />, title: '' },
    // { path: `${import.meta.env.BASE_URL}employers/attachments`, element: <Attachments /> , title: ''},
    
      // /**   **************************************  End of Employer block ******************************************************* */

    // {/*  Hiring Block   */}
    //Job application 
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/jobs`, element: <Jobs /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/add_job`, element: <AddJob /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/edit_job/:id`, element: <EditJob /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/show_job/:id`, element: <ShowJob /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/workflow/:id`, roles: [ 'DEV', 'VI', 'VA' ], element: <JobWorkflow /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/download_job/:id`, element: <DownloadJob /> },
    //   HR interview
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr_interviewed`, element: <HrInterview /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/add_assessment`, element: <AddAssessment /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/edit_assessment/:id`, element: <EditAssessment /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/show_assessment/:id`, element: <ShowAssessment /> },
    { path: `${import.meta.env.BASE_URL}hiring/hrinterview/download_assessment/:id`, element: < DownloadAssessment /> },

    //   Technical interview
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`, element: <TechnicalInterview /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical/add_candidate`, element: <AddCandidate /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical/edit_candidate/:id`, element: <EditCandidate /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical/edit_practical/:id`, element: <EditPractical /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/technical/show_candidate/:id`, element: <ShowCandidate /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/download_candidate/:id`, element: < DownloadCandidate /> },

    // /**   **************************************  End of hiring block ******************************************************* */

    // {/**    Starting of Employee registration  block */}

    //Employee Person Details
    { path: `${import.meta.env.BASE_URL}employees/personal/employee_list`, element: <PersonalDetails /> },
    { path: `${import.meta.env.BASE_URL}employees/personal/add_employee`, element: <AddEmployee /> },
    { path: `${import.meta.env.BASE_URL}employees/personal/edit_employee/:id`, element: <EditEmployee /> },
    { path: `${import.meta.env.BASE_URL}employees/personal/show_employee/:id`, element: <ShowEmployee /> },
    { path: `${import.meta.env.BASE_URL}employees/personal/download_employee/:id`, element: < DownloadEmployee /> },

    //Required Documentation 
    { path: `${import.meta.env.BASE_URL}employees/document/uploaded`, element: <DocumentDetails /> },
    { path: `${import.meta.env.BASE_URL}employees/document/upload_document/:id`, element: <UploadDocument /> },
    { path: `${import.meta.env.BASE_URL}employees/document/file_manager_list/:id`, element: <FileManagerList /> },
    { path: `${import.meta.env.BASE_URL}employees/document/file_details/:id/:file_id`, element: <FileDetail /> },

    // Exit Management (Resignations)
    { path: `${import.meta.env.BASE_URL}exits/resignations`, element: <ResignationList />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/resignations/add`, element: <AddResignation />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/resignations/edit/:id`, element: <EditResignation />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/resignations/view/:id`, element: <ViewResignation />, roles: ['ALL'] },

    // End Contract Management Routes
    { path: `${import.meta.env.BASE_URL}exits/endcontracts`, element: <EndContractList />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/endcontracts/add`, element: <AddEndContract />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/endcontracts/edit/:id`, element: <EditEndContract />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/endcontracts/view/:id`, element: <ViewEndContract />, roles: ['ALL'] },

    // End Specific Task Exit Management (under exits)
    { path: `${import.meta.env.BASE_URL}exits/end_specific_contracts`, element: <EndSpecificEndContractList />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/end_specific_contracts/add`, element: <AddEndSpecificTask />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/end_specific_contracts/add/:id`, element: <AddEndSpecificTask />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/end_specific_contracts/edit/:id`, element: <EditEndSpecificTask />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/end_specific_contracts/:id`, element: <ViewEndSpecificTask />, roles: ['ALL'] },
    
    // Mutual Agreement Management (under exits)
    // Support both /mutuals and /mutual_agreements for backward compatibility
    { path: `${import.meta.env.BASE_URL}exits/mutuals`, element: <MutualAgreementList />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutuals/add`, element: <AddMutualAgreement />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutuals/add/:id`, element: <AddMutualAgreement />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutuals/edit/:id`, element: <EditMutualAgreement />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutuals/:id`, element: <ViewMutualAgreement />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutual_agreements`, element: <MutualAgreementList />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutual_agreements/add`, element: <AddMutualAgreement />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutual_agreements/add/:id`, element: <AddMutualAgreement />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutual_agreements/edit/:id`, element: <EditMutualAgreement />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/mutual_agreements/:id`, element: <ViewMutualAgreement />, roles: ['ALL'] },
    
    // Retrenchment Management (under exits)
    { path: `${import.meta.env.BASE_URL}exits/retrenchments`, element: <RetrenchmentList />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/retrenchments/add`, element: <AddRetrenchment />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/retrenchments/add/:id`, element: <AddRetrenchment />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/retrenchments/edit/:id`, element: <EditRetrenchment />, roles: ['ALL'] },
    { path: `${import.meta.env.BASE_URL}exits/retrenchments/:id`, element: <ViewRetrenchment />, roles: ['ALL'] },

    //Social Record 
    { path: `${import.meta.env.BASE_URL}employees/socialrecords/details`, element: <SocialRecords /> },
    { path: `${import.meta.env.BASE_URL}employees/socialrecords/add_record/:id`, element: <AddSocialRecord /> },
    { path: `${import.meta.env.BASE_URL}employees/socialrecords/edit_record/:id`, element: <EditSocialRecord /> },
    { path: `${import.meta.env.BASE_URL}employees/socialrecords/show_record/:id`, element: <ShowSocialRecord /> },
    { path: `${import.meta.env.BASE_URL}employees/socialrecords/download_social_record/:id`, element: < DownloadSocialRecord /> },

    //Induction Training  employees/induction/induction_trainning
     { path: `${import.meta.env.BASE_URL}employees/induction/induction_trainning`, element: <InductionTraining /> },
    { path: `${import.meta.env.BASE_URL}employees/induction/add_induction_training/:id`, element: <AddInductionTraining /> },
    { path: `${import.meta.env.BASE_URL}employees/induction/edit_induction_training/:id`, element: <EditInductionTraining /> },
    { path: `${import.meta.env.BASE_URL}employees/induction/show_induction_training/:id`, element: <ShowInductionTraining /> },
    { path: `${import.meta.env.BASE_URL}employees/induction/download_induction_training/:id`, element: < DownloadInductionTraining /> },
    
    
    //Personnel ID Application
    { path: `${import.meta.env.BASE_URL}employees/applications/all_id_application`, element: <PersonnelApplication /> },
    { path: `${import.meta.env.BASE_URL}employees/applications/create_application/:id`, element: <AddApplication /> },
    { path: `${import.meta.env.BASE_URL}employees/applications/edit_application/:id`, element: <EditApplication /> },
    { path: `${import.meta.env.BASE_URL}employees/applications/show_application/:id`, element: <ShowApplication /> },
    { path: `${import.meta.env.BASE_URL}employees/applications/download_application/:id`, element: < DownloadApplication /> },
    
    //General Person Id application    create_general_id
    { path: `${import.meta.env.BASE_URL}employees/applications/create_general_id`, element: <AddGeneralId /> },
    { path: `${import.meta.env.BASE_URL}employees/applications/edit_general_application/:id`, element: <EditGeneralApplication /> },
    { path: `${import.meta.env.BASE_URL}employees/applications/show_general_application/:id`, element: <ShowGeneralApplication /> },
    { path: `${import.meta.env.BASE_URL}employees/applications/download_general_application/:id`, element: < DownloadGeneralApplication /> },

/** ************ End of Employee block ********************************************************************************** */


    /** Start of Contract block */
    //fetch all employee contracts   
      { path: `${import.meta.env.BASE_URL}contracts/employee_contracted`, element: <EmployeeContracts/> },  
    
        // Contract details
    { path: `${import.meta.env.BASE_URL}contracts/required_details`, element: <RequiredDetails /> },
   { path: `${import.meta.env.BASE_URL}contracts/required/add_contract_details/:id`, element: <AddRequiredDetails /> },
    { path: `${import.meta.env.BASE_URL}contracts/required/edit_details/:id`, element: <EditRequiredDetails /> },
    { path: `${import.meta.env.BASE_URL}contracts/required/show_detail/:id`, element: <ShowRequiredDetails /> },
    { path: `${import.meta.env.BASE_URL}contracts/required/download_contract_detail/:id`, element: < DownloadContractDetail /> },

    
    // Fixed Term Contract
    
    { path: `${import.meta.env.BASE_URL}contracts/fixed/fixed_contracts`, element: <FixedContract /> },
    { path: `${import.meta.env.BASE_URL}contracts/fixed/add_fixed_contract/:id`, element: <AddFixedContract /> },
    { path: `${import.meta.env.BASE_URL}contracts/fixed/edit_fixed/:id`, element: <EditFixedContract /> },
    { path: `${import.meta.env.BASE_URL}contracts/fixed/show_fixed/:id`, element: <ShowFixedContract /> },
    { path: `${import.meta.env.BASE_URL}contracts/fixed/download_fixed_contract/:id`, element: < DownloadFixedContract /> },

    //Specific Task contracts/specific/specific_task
    { path: `${import.meta.env.BASE_URL}contracts/specific/specific_task`, element: <SpecificTaskContract /> },
    { path: `${import.meta.env.BASE_URL}contracts/specific/add_specific_task/:id`, element: <AddSpecificTask /> },
    { path: `${import.meta.env.BASE_URL}contracts/specific/edit_specific_task/:id`, element: <EditSpecificTask /> },
    { path: `${import.meta.env.BASE_URL}contracts/specific/show_specific_task/:id`, element: <ShowSpecificTask /> },
    { path: `${import.meta.env.BASE_URL}contracts/specific/download_specific_task/:id`, element: < DownloadSpecificTask /> },
    
       //Terms and Conditions   
    { path: `${import.meta.env.BASE_URL}contracts/terms/term_conditions`, element: <TermConditions /> },
    { path: `${import.meta.env.BASE_URL}contracts/terms/add_term_condition/:id`, element: <AddTermConditions /> },
    { path: `${import.meta.env.BASE_URL}contracts/terms/edit_term_condition/:id`, element: <EditTermConditions /> },
    { path: `${import.meta.env.BASE_URL}contracts/terms/show_term_condition/:id`, element: <ShowTermConditions /> },
    { path: `${import.meta.env.BASE_URL}contracts/terms/download_term_condition/:id`, element: <DownloadTermConditions /> },
    
    
    
    
    //Leave Management   
    //   annual and emergenece leave
    { path: `${import.meta.env.BASE_URL}leaves/annual`, element: <AnnualLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/annual/create-leave`, element: <AddAnnualLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/annual/edit_leave/:id`, element: <EditAnnualLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/annual/show_annual_leave/:id`, element: <ShowAnnualLeave /> },
    // { path: `${import.meta.env.BASE_URL}leaves/annual/download_leave/:id`, element: <DownloadAnnualLeave /> },
    
    //Emergency Leave
    
     { path: `${import.meta.env.BASE_URL}leaves/emergency/create-emergency-leave`, element: <AddEmergencyLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/emergency/edit_emergency_leave/:id`, element: <EditEmergencyLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/emergency/show_emergency_leave/:id`, element: <ShowEmergencyLeave /> },
    // { path: `${import.meta.env.BASE_URL}leaves/emergency/download_emergency_leave/:id`, element: <DownloadEmergencyLeave /> },
    
    // sick leave 
    { path: `${import.meta.env.BASE_URL}leaves/sick-leave`, element: <SickLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/sick/create-leave`, element: <AddSickLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/sick/edit_sick_leave/:id`, element: <EditSickLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/sick/show_sick_leave/:id`, element: <ShowSickLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/sick/download_sick_leave/:id`, element: <DownloadSickLeave /> },
   

    
    // maternity
    { path: `${import.meta.env.BASE_URL}leaves/maternity`, element: <MaternityLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/maternity/create_maternity_leave`, element: <AddMaternityLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/maternity/edit_maternity_leave/:id`, element: <EditMaternityLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/maternity/show_maternity_leave/:id`, element: <ShowMaternityLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/maternity/download_maternity_leave/:id`, element: <DownloadMaternityLeave /> }, 
    
     // parternity
    { path: `${import.meta.env.BASE_URL}leaves/paternity`, element: <PaternityLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/paternity/create_paternity_leave`, element: <AddPaternityLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/paternity/edit_paternity_leave/:id`, element: <EditPaternityLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/paternity/show_paternity_leave/:id`, element: <ShowPaternityLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/paternity/download_paternity_leave/:id`, element: <DownloadPaternityLeave /> }, 
    
    //Compessionate
     { path: `${import.meta.env.BASE_URL}leaves/compassionate`, element: <CompassionateLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/compassionate/create_compassionate_leave`, element: <AddCompassionateLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/compassionate/edit_compassionate_leave/:id`, element: <EditCompassionateLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/compassionate/show_compassionate_leave/:id`, element: <ShowCompassionateLeave /> },
    { path: `${import.meta.env.BASE_URL}leaves/compassionate/download_compassionate_leave/:id`, element: <DownloadCompassionateLeave /> },
    
/** ************ End of Contracts block ********************************************************************************** */
    /** ************** Start Attendance block */

    { path: `${import.meta.env.BASE_URL}attendances/normal_attendance`, element: <Attendance /> },
    // { path: `${import.meta.env.BASE_URL}attendances/normal/create_normal_attendance`, element: <AddAttendance /> },
    { path: `${import.meta.env.BASE_URL}attendances/normal/edit_normal_attendance/:id`, element: <EditAttendance /> },
    { path: `${import.meta.env.BASE_URL}attendances/normal/show_normal_attendance/:id`, element: <ShowAttendance /> },
    { path: `${import.meta.env.BASE_URL}attendances/overtime`, element: <OverTimeAttendance /> },
    { path: `${import.meta.env.BASE_URL}attendances/overtime/edit_overtime/:id`, element: <EditOvertime /> },
     { path: `${import.meta.env.BASE_URL}attendances/overtime/show_overtime/:id`, element: <ShowOvertime /> },
    

    //Industrial Relation
     { path: `${import.meta.env.BASE_URL}industrials/misconducts`, element: <Misconduct /> },
    { path: `${import.meta.env.BASE_URL}industrials/add_misconducts`, element: <AddMisconduct /> },
    { path: `${import.meta.env.BASE_URL}industrials/edit_misconducts/:id`, element: <EditMisconduct /> },
    { path: `${import.meta.env.BASE_URL}industrials/show_misconducts/:id`, element: <ShowMisconduct /> },

    { path: `${import.meta.env.BASE_URL}industrials/perfomance_reviews`, element: <PerfomanceReview /> },
    { path: `${import.meta.env.BASE_URL}industrials/perfomance_reviews/create`, element: <AddPerfomanceReview /> },
    { path: `${import.meta.env.BASE_URL}industrials/perfomance_review/edit/:id`, element: <EditPerfomanceReview /> },
    { path: `${import.meta.env.BASE_URL}industrials/show_perfomance_review/:id`, element: <ShowPerfomanceReview /> },

    { path: `${import.meta.env.BASE_URL}industrials/perfomance_capacity`, element: <PerfomanceCapacity /> },
    { path: `${import.meta.env.BASE_URL}industrials/performance_capacity/create-incapacity`, element: <AddPerfomanceCapacity /> },
    { path: `${import.meta.env.BASE_URL}industrials/performance_capacity/edit/:id`, element: <EditPerfomanceCapacity /> },
    { path: `${import.meta.env.BASE_URL}industrials/performance_capacity/show/:id`, element: <ShowPerfomanceCapacity /> },
    //assessment
    
    { path: `${import.meta.env.BASE_URL}industrials/performance_capacity/create_assessment`, element: <AddPerformanceAssessment/> },
    { path: `${import.meta.env.BASE_URL}industrials/performance_capacity/edit_assessment/:id`, element: <EditPerformanceAssessment /> },
    { path: `${import.meta.env.BASE_URL}industrials/performance_capacity/show_assessment/:id`, element: <ShowPerformanceAssessment/> },
    
    
    
    
    

    { path: `${import.meta.env.BASE_URL}industrials/disciplinaries`, element: <Disciplinary /> },
    { path: `${import.meta.env.BASE_URL}industrials/disciplinaries/create_disciplinary`, element: <AddDisciplinary /> },
    { path: `${import.meta.env.BASE_URL}industrials/disciplinaries/edit_disciplinary/:id`, element: <EditDisciplinary /> },
    { path: `${import.meta.env.BASE_URL}industrials/disciplinaries/show_disciplinary/:id`, element: <ShowDisciplinary /> },

   { path: `${import.meta.env.BASE_URL}industrials/grievances`, element: <Grievances /> },
    { path: `${import.meta.env.BASE_URL}industrials/grievances/initiate-grievance`, element: <AddGrievances /> },
    { path: `${import.meta.env.BASE_URL}industrials/grievances/edit_grievance/:id`, element: <EditGrievances /> },
    { path: `${import.meta.env.BASE_URL}industrials/grievances/show_grievances/:id`, element: <ShowGrievances /> },


   















































    // {/* Component content */}

    { path: `${import.meta.env.BASE_URL}components/accordion`, element: <Accordion />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/alerts`, element: <Alerts />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/avatars`, element: <Avatars />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/badges`, element: <Badges />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/blockquotes`, element: <Blockquotes />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/buttons`, element: <Buttons />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/cards`, element: <Cards />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/collapse`, element: <Collapse />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/indicators`, element: <Indicators />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/list`, element: <List />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/listgroup`, element: <Listgroup />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/progress`, element: <Progress />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/skeletons`, element: <Skeletons />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/spinners`, element: <Spinners />, title: '' },
    { path: `${import.meta.env.BASE_URL}components/toasts`, element: <Toasts />, title: '' },

    // {/* Component content */}

    { path: `${import.meta.env.BASE_URL}elements/breadcrumbs`, element: <Breadcrumbs />, title: '' },
    { path: `${import.meta.env.BASE_URL}elements/columns`, element: <Columns />, title: '' },
    { path: `${import.meta.env.BASE_URL}elements/grids`, element: <Grids />, title: '' },
    { path: `${import.meta.env.BASE_URL}elements/megaMenu`, element: <MegaMenu />, title: '' },
    { path: `${import.meta.env.BASE_URL}elements/nav&tabs`, element: <NavTabs />, title: '' },
    { path: `${import.meta.env.BASE_URL}elements/navbar`, element: <Navbar />, title: '' },
    { path: `${import.meta.env.BASE_URL}elements/paginations`, element: <Paginations />, title: '' },

    // {/* Forms content */ }

    { path: `${import.meta.env.BASE_URL}forms/advancedforms`, element: <Advancedforms />, title: '' },
    { path: `${import.meta.env.BASE_URL}forms/fileuploads`, element: <Fileuploads />, title: '' },
    { path: `${import.meta.env.BASE_URL}forms/formcheckbox`, element: <Formcheckbox />, title: '' },
    { path: `${import.meta.env.BASE_URL}forms/formeditors`, element: <Formeditors />, title: '' },
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
 

    // {/* Profile content */ }

    { path: `${import.meta.env.BASE_URL}user/profile_setting`, element: <Profilesetting /> },

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

    { path: `${import.meta.env.BASE_URL}dashboards/normal`, element: <Normals />, title: 'normal' },
    { path: `${import.meta.env.BASE_URL}dashboards/ecommerce`, element: <Ecommerce />, title: 'ecommerce' },
    { path: `${import.meta.env.BASE_URL}dashboards/hrm`, element: <Hrm />, title: 'hrm' },


    // {/* System Settings content */}

    { path: `${import.meta.env.BASE_URL}add_roles`, element: <AddRoles />, title: 'Add Roles' },
    { path: `${import.meta.env.BASE_URL}manage_roles`, element: <ManageRoles />, title: 'Manage Roles' },
    // {/*Employer of client Registration content  */}
    { path: `${import.meta.env.BASE_URL}employers/registrations/registrations`, element: <Registrations />, title: 'employer' },
    { path: `${import.meta.env.BASE_URL}employers/departments/departments`, element: <Departments />, title: 'department' },
    { path: `${import.meta.env.BASE_URL}employers/registrations/editClients`, element: <EditClient />, title: 'Edit Client' },


    //hiring Block
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/jobs`, element: <Jobs /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/add_job`, element: <AddJob /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/edit_job/:id`, element: <EditJob /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/show_job/:id`, element: <ShowJob /> },
    { path: `${import.meta.env.BASE_URL}hiring/vacancies/download_job`, element: <DownloadJob /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitment/hr_interviews`, element: <HrInterview /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/add_assessment/`, element: <AddAssessment /> },
    { path: `${import.meta.env.BASE_URL}hiring/recruitments/hr/edit_assessment/:id`, element: <EditAssessment /> },


    // {/* Component content */}

    { path: `${import.meta.env.BASE_URL}components/accordion`, element: <Accordion />, title: 'accordion' },
    { path: `${import.meta.env.BASE_URL}components/alerts`, element: <Alerts />, title: 'alerts' },
    { path: `${import.meta.env.BASE_URL}components/avatars`, element: <Avatars />, title: 'avatars' },
    { path: `${import.meta.env.BASE_URL}components/badges`, element: <Badges />, title: 'badges' },
    { path: `${import.meta.env.BASE_URL}components/blockquotes`, element: <Blockquotes />, title: 'blockquotes' },
    { path: `${import.meta.env.BASE_URL}components/buttons`, element: <Buttons />, title: 'buttons' },
    { path: `${import.meta.env.BASE_URL}components/cards`, element: <Cards />, title: 'cards' },
    { path: `${import.meta.env.BASE_URL}components/collapse`, element: <Collapse />, title: 'collapse' },
    { path: `${import.meta.env.BASE_URL}components/indicators`, element: <Indicators />, title: 'indicators' },
    { path: `${import.meta.env.BASE_URL}components/list`, element: <List />, title: 'list' },
    { path: `${import.meta.env.BASE_URL}components/listgroup`, element: <Listgroup />, title: 'listgroup' },
    { path: `${import.meta.env.BASE_URL}components/progress`, element: <Progress />, title: 'progress' },
    { path: `${import.meta.env.BASE_URL}components/skeletons`, element: <Skeletons />, title: 'skeletons' },
    { path: `${import.meta.env.BASE_URL}components/spinners`, element: <Spinners />, title: 'spinners' },
    { path: `${import.meta.env.BASE_URL}components/toasts`, element: <Toasts />, title: 'toasts' },

    // {/* Component content */}

    { path: `${import.meta.env.BASE_URL}elements/breadcrumbs`, element: <Breadcrumbs />, title: 'breadcrumbs' },
    { path: `${import.meta.env.BASE_URL}elements/columns`, element: <Columns />, title: 'columns' },
    { path: `${import.meta.env.BASE_URL}elements/grids`, element: <Grids />, title: 'grids' },
    { path: `${import.meta.env.BASE_URL}elements/megaMenu`, element: <MegaMenu />, title: 'megaMenu' },
    { path: `${import.meta.env.BASE_URL}elements/nav&tabs`, element: <NavTabs />, title: 'nav&tabs' },
    { path: `${import.meta.env.BASE_URL}elements/navbar`, element: <Navbar />, title: 'navbar' },
    { path: `${import.meta.env.BASE_URL}elements/paginations`, element: <Paginations />, title: 'paginations' },

    // {/* Forms content */ }

    { path: `${import.meta.env.BASE_URL}forms/advancedforms`, element: <Advancedforms />, title: 'advancedforms' },
    { path: `${import.meta.env.BASE_URL}forms/fileuploads`, element: <Fileuploads />, title: 'fileuploads' },
    { path: `${import.meta.env.BASE_URL}forms/formcheckbox`, element: <Formcheckbox />, title: 'formcheckbox' },
    { path: `${import.meta.env.BASE_URL}forms/formeditors`, element: <Formeditors />, title: 'formeditors' },
    { path: `${import.meta.env.BASE_URL}forms/formelements`, element: <Formelements />, title: 'formelements' },
    { path: `${import.meta.env.BASE_URL}forms/forminputgroup`, element: <Forminputgroup />, title: 'forminputgroup' },
    { path: `${import.meta.env.BASE_URL}forms/formlayout`, element: <Formlayout />, title: 'formlayout' },
    { path: `${import.meta.env.BASE_URL}forms/formradio`, element: <Formradio />, title: 'formradio' },
    { path: `${import.meta.env.BASE_URL}forms/formselect`, element: <Formselect />, title: 'formselect' },
    { path: `${import.meta.env.BASE_URL}forms/formswitch`, element: <Formswitch />, title: 'formswitch' },
    { path: `${import.meta.env.BASE_URL}forms/formvalidation`, element: <Formvalidation />, title: 'formvalidation' },

    // {/* Advanced UI content */ }

    { path: `${import.meta.env.BASE_URL}advancedUi/calender`, element: <Calender />, title: 'calender' },
    { path: `${import.meta.env.BASE_URL}advancedUi/carousel`, element: <Carousel />, title: 'carousel' },
    { path: `${import.meta.env.BASE_URL}advancedUi/gallery`, element: <Gallery />, title: 'gallery' },
    { path: `${import.meta.env.BASE_URL}advancedUi/notification`, element: <Notification />, title: 'notification' },
    { path: `${import.meta.env.BASE_URL}advancedUi/rangeslider`, element: <Rangeslider />, title: 'rangeslider' },
    { path: `${import.meta.env.BASE_URL}advancedUi/rating`, element: <Rating />, title: 'rating' },
    { path: `${import.meta.env.BASE_URL}advancedUi/sweetalert`, element: <Sweetalert />, title: 'sweetalert' },
    { path: `${import.meta.env.BASE_URL}advancedUi/treeview`, element: <Treeview />, title: 'treeview' },

    // {/* File Manager content */ }

    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filedetails`, element: <Filedetails />, title: 'filedetails' },
    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filemanagerlist`, element: <Filemanagerlist />, title: 'filemanagerlist' },
    { path: `${import.meta.env.BASE_URL}advancedUi/filemanager/filemanagermain`, element: <Filemanagermain />, title: 'filemanagermain' },


    // {/* Table content */ }
    { path: `${import.meta.env.BASE_URL}basicUi/tables/basictable`, element: <Basictable />, title: 'basictable' },
    { path: `${import.meta.env.BASE_URL}basicUi/tables/datatable`, element: <Datatable />, title: 'datatable' },
    { path: `${import.meta.env.BASE_URL}basicUi/tables/tableEdit`, element: <TableEdit />, title: 'tableEdit' },

    // {/* Pages content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/contacts`, element: <Contacts />, title: 'contacts' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/pricingtables`, element: <Pricingtables />, title: 'pricingtables' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/timeline`, element: <Timeline />, title: 'timeline' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/team`, element: <Team />, title: 'team' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/todolist`, element: <Todolist />, title: 'todolist' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/tasks`, element: <Tasks />, title: 'tasks' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/reviews`, element: <Reviews />, title: 'reviews' },
    

    // {/* Profile content */ }

    { path: `${import.meta.env.BASE_URL}user/profile_setting`, element: <Profilesetting />, title: 'profilesetting' },

    // {/* Invoice content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/invoice/invoicedetails`, element: <Invoicedetails />, title: 'invoicedetails' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/invoice/invoicelist`, element: <Invoicelist />, title: 'invoicelist' },

 

    // {/* Mail content */ }

    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/chat`, element: <Chat />, title: 'chat' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/mailsettings`, element: <Mailsettings />, title: 'mailsettings' },
    { path: `${import.meta.env.BASE_URL}pagecomponent/mail/mainMail`, element: <MainMail />, title: 'mainMail' },

  

   

  
]