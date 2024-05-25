import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "./component/Authentication/signin/cover1/signincover1";
import Signup from "./component/Authentication/signup/cover1/signupcover1";


// import Dashboard from "./views/Dashboard";
// import NotFound from "./views/NotFound";
import DefaultLayout from "./component/components/DefaultLayout";
import GuestLayout from "./component/components/GuestLayout";
// import Signup from "./views/Signup";




import Calender from "./component/advancedUi/calender/calender";
import Hrm from "./component/dashboards/hrm/hrm";
import Normal from "./component/dashboards/normal/normal";
//Employer Registration
import Registrations from "./component/employers/registrations/registrations";
import AddClient from "./component/employers/registrations/addclients/AddClient";
import EditClient from "./component/employers/registrations/editClients/editClient";
import ShowClient from "./component/employers/registrations/showClients/showclient";

// Department and section
import Departments from "./component/employers/departments/departments";


//Hiring Process block   ######################
//** job */
import Jobs from "./component/hiring/vacancies/newjob";
import AddJob from "./component/hiring/vacancies/addjobs/addjob";
import EditJob from "./component/hiring/vacancies/editjobs/editjob";
import ShowJob from "./component/hiring/vacancies/showjob";
import DownloadJob from "./component/hiring/templatesamples/vacancies/jobtemplate";

//Recruitment  (HR and Technical Interview)
//HR
import HrInterview from "./component/hiring/recruitments/hrInterviews/interviewed";
import AddAssessment from "./component/hiring/recruitments/hrInterviews/addAssessment/assessment";
import EditAssessment from "./component/hiring/recruitments/hrInterviews/editAssessment/editassessment";
import ShowAssessment from "./component/hiring/recruitments/hrInterviews/showAssessment/showassessment";
import DownloadAssessment from "./component/hiring/templatesamples/hrinterviews/assessmenttemplate";

//Technical 
import TechnicalInterview from "./component/hiring/recruitments/techInterviews/interviewed";
import AddCandidate from "./component/hiring/recruitments/techInterviews/addCandidate/addcandidate";
import EditCandidate from "./component/hiring/recruitments/techInterviews/editCandidate/editcandidate";
import EditPractical from "./component/hiring/recruitments/techInterviews/editCandidate/editpracticaltest";
import ShowCandidate from "./component/hiring/recruitments/techInterviews/showCandidate/showcandidate";
import DownloadCandidate from "./component/hiring/templatesamples/technicalinterview/candidatetemplate";

//************ End of Hiring block ******************************

//{/**  start of Employee REgistration */}  step 1
import PersonalDetails from "./component/employees/personal/personalDetail/personaldetail";
import AddEmployee from "./component/employees/personal/addEmployee/addemployee";
import EditEmployee from "./component/employees/personal/editEmployee/editemployee";
import ShowEmployee from "./component/employees/personal/showEmployee/showemployee";
import DownloadEmployee from "./component/employees/templateDocument/personal/personaldetail";

//Reduired Documentation step 2
import DocumentDetails from "./component/employees/documentRequired/uploaded/uploaded";
import UploadDocument from "./component/employees/documentRequired/uploadDocument/uploaddocument";
import FileManagerList from "./component/employees/documentRequired/fileManagerlist/filemanagers";
import FileDetail from "./component/employees/documentRequired/fileDetails/filedetails";
// *********** End of block *********************

//Social Records step 3
import SocialRecords from "./component/employees/social/socialRecord/details";
import AddSocialRecord from "./component/employees/social/addRecord/addrecord";
import EditSocialRecord from "./component/employees/social/editRecord/editrecord";
import ShowSocialRecord from "./component/employees/social/showRecord/showrecord";
import DownloadSocialRecord from "./component/employees/templateDocument/social/socialrecord";


//Induction Training  step 4
import InductionTraining from "./component/employees/induction/training/inductionTraining";
import AddInductionTraining from "./component/employees/induction/addInduction/addtraining";
import EditInductionTraining from "./component/employees/induction/editInduction/edittraining";
import ShowInductionTraining from "./component/employees/induction/showInduction/showtraining";
import DownloadInductionTraining from "./component/employees/templateDocument/induction/inductiontraining";

// Personnel ID Aplication  ******* its after contract generation step 6
import PersonnelApplication from "./component/employees/application/idApplication/application";
import AddApplication from "./component/employees/application/addApplication/addapplication";
import EditApplication from "./component/employees/application/editApplication/editapplication";
import ShowApplication from "./component/employees/application/showApplication/showapplication";
import DownloadApplication from "./component/employees/templateDocument/application/personnelapplication";

/** *******  End of Employee Registration Block *********************************************************************** */


/**  Start of contract Block  step  5*/
import EmployeeContracts from "./component/contractManagement/Contracted/employeeContract";

//Required Details || Taarifa za MWajiriwa kwaajili ya mikataba - kitambulisho
import RequiredDetails from "./component/contractManagement/requiredDetails/details";
import AddRequiredDetails from "./component/contractManagement/requiredDetails/addDetails/adddetail";
import EditRequiredDetails from "./component/contractManagement/requiredDetails/editDetails/editdetail";
import ShowRequiredDetails from "./component/contractManagement/requiredDetails/showDetails/showdetail";
import DownloadContractDetail from "./component/contractManagement/templateContracts/contractDetail/contract";

// Fixed Term Contract    
import FixedContract from "./component/contractManagement/fixed/contractFixed/fixedContract";
import AddFixedContract from "./component/contractManagement/fixed/addFixed/addFixed";
import EditFixedContract from "./component/contractManagement/fixed/editFixed/editFixed";
import ShowFixedContract from "./component/contractManagement/fixed/showFixed/showFixed";
import DownloadFixedContract from "./component/contractManagement/templateContracts/contractFixed/fixed";

//Specific Task //SpecificTaskContract
import SpecificTaskContract from "./component/contractManagement/specific/specificTask/specific";
import AddSpecificTask from "./component/contractManagement/specific/addSpecific/addspecifictask";
import EditSpecificTask from "./component/contractManagement/specific/editSpecifictask/editspecific";
import ShowSpecificTask from "./component/contractManagement/specific/showSpecifictask/showspecific";
import DownloadSpecificTask from "./component/contractManagement/templateContracts/specific/specifictask";

// Terms and Condition 
import TermConditions from "./component/contractManagement/termsCondition/terms/termcondition";
import AddTermConditions from "./component/contractManagement/termsCondition/addTerms/addterm";
import EditTermConditions from "./component/contractManagement/termsCondition/editTerms/editterm";
import ShowTermConditions from "./component/contractManagement/termsCondition/showTerm/showterm";
import DownloadTermConditions from "./component/contractManagement/templateContracts/terms/termcondition";
import Normals from "./component/dashboards/normal/normal";

//notification block
import Cart from "./component/pagecomponent/Ecommerce/cart/cart";
import Checkout from "./component/pagecomponent/Ecommerce/checkout/checkout";



const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            { path: '/', element: <Navigate to="/dashboards/normal" /> },
            {
                path: `/dashboards/normal`, element: <Normal />
            },
            { path: '/dashboards/hrm', element: <Hrm /> },

            // System Setting content
            // { path: '/settings', element: <Settings /> },

            // Employer/ Client content
            { path: '/employers/registrations/registrations', element: <Registrations /> },
            { path: '/employers/registrations/addclients', element: <AddClient /> },
            { path: '/employers/registrations/editClients/:id', element: <EditClient /> },
            { path: '/employers/registrations/show_client/:id', element: <ShowClient /> },
            { path: '/employers/departments/departments', element: <Departments /> },

            // Hiring Block
            // Job application
            { path: `/hiring/vacancies/jobs`, element: <Jobs /> },
            { path: `/hiring/vacancies/add_job`, element: <AddJob /> },
            { path: `/hiring/vacancies/edit_job/:id`, element: <EditJob /> },
            { path: `/hiring/vacancies/show_job/:id`, element: <ShowJob /> },
            { path: `/hiring/vacancies/download_job/:id`, element: <DownloadJob /> },
            //   HR interview
            { path: `/hiring/recruitments/hr_interviewed`, element: <HrInterview /> },
            { path: `/hiring/recruitments/hr/add_assessment`, element: <AddAssessment /> },
            { path: `/hiring/recruitments/hr/edit_assessment/:id`, element: <EditAssessment /> },
            { path: `/hiring/recruitments/hr/show_assessment/:id`, element: <ShowAssessment /> },
            { path: `/hiring/hrinterview/download_assessment/:id`, element: < DownloadAssessment /> },
            //   Technical interview
            { path: `/hiring/recruitments/technical_interviewed`, element: <TechnicalInterview /> },
            { path: `/hiring/recruitments/technical/add_candidate`, element: <AddCandidate /> },
            { path: `/hiring/recruitments/technical/edit_candidate/:id`, element: <EditCandidate /> },
            { path: `/hiring/recruitments/technical/edit_practical/:id`, element: <EditPractical /> },
            { path: `/hiring/recruitments/technical/show_candidate/:id`, element: <ShowCandidate /> },
            { path: `/hiring/recruitments/download_candidate/:id`, element: < DownloadCandidate /> },

            // /**   **************************************  End of hiring block ******************************************************* */

            // {/**    Starting of Employee registration  block */}

            //Employee Person Details
            { path: `/employees/personal/employee_list`, element: <PersonalDetails /> },
            { path: `/employees/personal/add_employee`, element: <AddEmployee /> },
            { path: `/employees/personal/edit_employee/:id`, element: <EditEmployee /> },
            { path: `/employees/personal/show_employee/:id`, element: <ShowEmployee /> },
            { path: `/employees/personal/download_employee/:id`, element: < DownloadEmployee /> },

            //Required Documentation
            { path: `/employees/document/uploaded`, element: <DocumentDetails /> },
            { path: `/employees/document/upload_document/:id`, element: <UploadDocument /> },
            { path: `/employees/document/file_manager_list/:id`, element: <FileManagerList /> },
            { path: `/employees/document/file_details/:id/:file_id`, element: <FileDetail /> },

            //Social Record
            { path: `/employees/socialrecords/details`, element: <SocialRecords /> },
            { path: `/employees/socialrecords/add_record/:id`, element: <AddSocialRecord /> },
            { path: `/employees/socialrecords/edit_record/:id`, element: <EditSocialRecord /> },
            { path: `/employees/socialrecords/show_record/:id`, element: <ShowSocialRecord /> },
            { path: `/employees/socialrecords/download_social_record/:id`, element: < DownloadSocialRecord /> },

            //Induction Training  employees/induction/induction_trainning
            { path: `/employees/induction/induction_trainning`, element: <InductionTraining /> },
            { path: `/employees/induction/add_induction_training/:id`, element: <AddInductionTraining /> },
            { path: `/employees/induction/edit_induction_training/:id`, element: <EditInductionTraining /> },
            { path: `/employees/induction/show_induction_training/:id`, element: <ShowInductionTraining /> },
            { path: `/employees/induction/download_induction_training/:id`, element: < DownloadInductionTraining /> },


            //Personnel ID Application
            { path: `/employees/applications/all_id_application`, element: <PersonnelApplication /> },
            { path: `/employees/applications/create_application/:id`, element: <AddApplication /> },
            { path: `/employees/applications/edit_application/:id`, element: <EditApplication /> },
            { path: `/employees/applications/show_application/:id`, element: <ShowApplication /> },
            { path: `/employees/applications/download_application/:id`, element: < DownloadApplication /> },

            /** ************ End of Employee block ********************************************************************************** */


            /** Start of Contract block */
            //fetch all employee contracts
            { path: `/contracts/employee_contracted`, element: <EmployeeContracts /> },

            // Contract details
            { path: `/contracts/required_details`, element: <RequiredDetails /> },
            { path: `/contracts/required/add_contract_details/:id`, element: <AddRequiredDetails /> },
            { path: `/contracts/required/edit_details/:id`, element: <EditRequiredDetails /> },
            { path: `/contracts/required/show_detail/:id`, element: <ShowRequiredDetails /> },
            { path: `/contracts/required/download_contract_detail/:id`, element: < DownloadContractDetail /> },


            // Fixed Term Contract

            { path: `/contracts/fixed/fixed_contracts`, element: <FixedContract /> },
            { path: `/contracts/fixed/add_fixed_contract/:id`, element: <AddFixedContract /> },
            { path: `/contracts/fixed/edit_fixed/:id`, element: <EditFixedContract /> },
            { path: `/contracts/fixed/show_fixed/:id`, element: <ShowFixedContract /> },
            { path: `/contracts/fixed/download_fixed_contract/:id`, element: < DownloadFixedContract /> },

            //Specific Task contracts/specific/specific_task
            { path: `/contracts/specific/specific_task`, element: <SpecificTaskContract /> },
            { path: `/contracts/specific/add_specific_task/:id`, element: <AddSpecificTask /> },
            { path: `/contracts/specific/edit_specific_task/:id`, element: <EditSpecificTask /> },
            { path: `/contracts/specific/show_specific_task/:id`, element: <ShowSpecificTask /> },
            { path: `/contracts/specific/download_specific_task/:id`, element: < DownloadSpecificTask /> },

            //Terms and Conditions
            { path: `/contracts/terms/term_conditions`, element: <TermConditions /> },
            { path: `/contracts/terms/add_term_condition/:id`, element: <AddTermConditions /> },
            { path: `/contracts/terms/edit_term_condition/:id`, element: <EditTermConditions /> },
            { path: `/contracts/terms/show_term_condition/:id`, element: <ShowTermConditions /> },
            { path: `/contracts/terms/download_term_condition/:id`, element: <DownloadTermConditions /> },
            
            //other for Notification 
            { path: `/pagecomponent/Ecommerce/cart`, element: <Cart /> },
            { path: `/pagecomponent/Ecommerce/checkout`, element: <Checkout /> },
            
            
            
            
            {
                path: '/signup',
                element: <Signup />
            },
                

        ],

    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            
        ]
    },
    


   
])
 export default router


// const router = createBrowserRouter([
//     {
//         path:'/',
//         element:<DefaultLayout />,
//         children:[
//             {
//                 path:'/',
//                 element:<Navigate to="/normal" />
//             },
//             {
//                 path:'/normal',
//                 element:<Normal />
//             },
           
//         ]
//     },
//     {
//         path:'/',
//         element:<GuestLayout />,
//         children:[
//             {
//                 path:'/login',
//                 element:<Login />
//             }
//         ]
//     },

// ])

// export default router