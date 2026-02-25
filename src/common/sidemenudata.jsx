import React from "react";

//Svg icons of Dashboard
const Dashboardsvg = <i className="ri-home-8-line side-menu__icon"></i>
const SettingsSvg = <i className="ri-tools-line side-menu__icon"></i>
    //client registration
const EmployersSvg = <i className="ri-apps-2-line side-menu__icon"></i>
const HiringsSvg = <i className="ri-advertisement-line side-menu__icon"></i>

     //employee Registration 
const EmployeesSvg  = <i className="ri-creative-commons-by-line side-menu__icon"></i>
const ContractMangementSvg =  <i className="ri-attachment-line side-menu__icon"></i>
const AttendancesSvg =  <i className="ri-calendar-2-line side-menu__icon"></i>
const LeavesSvg = <i className="ri-community-line side-menu__icon"></i>
const IndustrialRelationshipSvg = <i className="ri-links-fill side-menu__icon"></i>
const CompliancesSvg = <i className="ri-service-line side-menu__icon"></i>
const ExitsSvg = <i className="ri-send-plane-2-line side-menu__icon"></i>
const ReportsSvg = <i className="ri-bar-chart-grouped-line side-menu__icon"></i>
const PagesSvg = <i className="ri-book-open-line side-menu__icon"></i>

export const MenuItems = [
	{ id: 1, menutitle: "MAIN", roles: ['MD', 'DEV','SA', 'ALL','OM', 'RI','RR','RA'], Items: [

			{ id: 2,icon: Dashboardsvg, title: "Dashboards", type: "sub", active: false, selected: false, roles: ['MD', 'DEV', 'ALL'], children: [

					{ id: 3, path: `${import.meta.env.BASE_URL}dashboards/normal`, type: "link", active: false, selected: false, title: "Normal", roles: ['ALL'] },
				{ id: 4, path: `${import.meta.env.BASE_URL}dashboards/hrm`, type: "link", active: false, selected: false, title: "Executive", roles: ['MD', 'DEV', 'OM'] },
				],
			},

			
		{
		id: 70, icon: SettingsSvg, title: "System Settings", type: "sub", active: false, selected: false, roles: ['DEV', 'SA'], children: [

					{ id: 71, path: `${import.meta.env.BASE_URL}add_roles`, type: "link", active: false, selected: false, title: "Add Roles", roles: ['DEV', 'SA'] },
				{ id: 72, path: `${import.meta.env.BASE_URL}manage_roles`, type: "link", active: false, selected: false, title: "Manage Roles", roles: ['DEV','SA' ] },
				],
	},
	// { id: 7, path: `${import.meta.env.BASE_URL}add_role`, icon: SettingsSvg, title: "System setting", type: "link", active: false, roles: ['MD', 'DEV', 'ALL', 'SA'], selected: false },

		
		]
	},
	

			
	{
		menutitle: "GENERAL", Items: [
	
			{
				id: 6, icon: EmployersSvg, title: "Employers", type: "sub", active: false, selected: false, roles: ['MD', 'DEV', 'OM','RI','RR','RA'],  children: [
					{ id: 7, path: `${import.meta.env.BASE_URL}employers/registrations/registrations`, type: "link", active: false, selected: false, roles: ['MD', 'DEV', 'OM','RI','RR','RA'], title: "Registration" },
					// { id: 8, path: `${import.meta.env.BASE_URL}employers/departments/departments`, type: "link", active: false, selected: false, title: "Departments" },
					// { id: 9, path: `${import.meta.env.BASE_URL}employers/attachments`, type: "link", active: false, selected: false, title: "Attachments" },
				]
			},
			{
				//Hiring block
				id: 10, icon: HiringsSvg, title: "Hiring", type: "sub", active: false, roles: ['MD', 'DEV', 'VI', 'VA', 'II', 'IA', 'IC','IV','INA' ], selected: false, children: [

					{ id: 11, path: `${import.meta.env.BASE_URL}hiring/vacancies/jobs`, type: "link", active: false, selected: false, roles: [ 'DEV', 'VI', 'VA', 'II', 'IA', 'IC','IV','INA' ], title: "Job Vacancy" },
					{ id: 12, path: `${import.meta.env.BASE_URL}hiring/recruitments/hr_interviewed`, type: "link", active: false, selected: false, title: "HR Competency Interviews", roles: [ 'DEV', 'VI', 'VA', 'II', 'IA', 'IC','IV','INA' ]},
					{ id: 13, path: `${import.meta.env.BASE_URL}hiring/recruitments/technical_interviewed`, type: "link", active: false, selected: false, title: "Technical Interviews", roles: [ 'DEV', 'VI', 'VA', 'II', 'IA', 'IC','IV','INA' ], },
				]
			},
			
			{
				id: 14, icon: EmployeesSvg, title: "Employee Registrations", type: "sub", active: false, selected: false, roles: [ 'DEV', 'II', 'IA', 'IC','IV','INA','HI','HC','HA',
'SI','SR','ITI','ITR','ITAr'], children: [

					{ id: 15, path: `${import.meta.env.BASE_URL}employees/personal/employee_list`, type: "link", active: false, selected: false, title: "Personnel Details",roles: [ 'DEV', 'II', 'IA', 'IC','IV','INA','HI','HC','HA', 'SI','SR' ] },
					{ id: 16, path: `${import.meta.env.BASE_URL}employees/document/uploaded`, type: "link", active: false, selected: false, title: "Required Documents", roles: [ 'DEV', 'II', 'IA', 'IC','IV','INA' ,'HI','HC','HA' ] },
					{ id: 17, path: `${import.meta.env.BASE_URL}employees/socialrecords/details`, type: "link", active: false, selected: false, title: "Social Records", roles: [ 'DEV', 'SI','SR' ] },
					{ id: 18, path: `${import.meta.env.BASE_URL}employees/induction/induction_trainning`, type: "link", active: false, selected: false, title: "Induction Training",roles: [ 'DEV', 'ITI','ITR','ITAr'] },
					{ id: 19, path: `${import.meta.env.BASE_URL}employees/applications/all_id_application`, type: "link", active: false, selected: false, title: "ID Application",roles: [ 'DEV', 'II', 'IA', 'IC','IV','INA' ,'HI','HC','HA',
'SI','SR'] },
				]
			},
			{
				id: 20, icon: ContractMangementSvg, title: "Contracts", type: "sub", active: false, selected: false, roles: [ 'DEV', 'CI','CR','CA' ], children: [
					{ id: 21, path: `${import.meta.env.BASE_URL}contracts/employee_contracted`, type: "link", active: false, selected: false, title: "Contracts", roles: [ 'DEV', 'CI' ], },
					{ id: 20, path: `${import.meta.env.BASE_URL}contracts/required_details`, type: "link", active: false, selected: false, title: "Required Details" ,roles: [ 'DEV', 'CI','CR','CA' ],},
					{ id: 21, path: `${import.meta.env.BASE_URL}contracts/fixed/fixed_contracts`, type: "link", active: false, selected: false, title: "Fixed Term",roles: [ 'DEV', 'CI','CR','CA' ], },
					{ id: 22, path: `${import.meta.env.BASE_URL}contracts/specific/specific_task`, type: "link", active: false, selected: false, title: "Specific Task",roles: [ 'DEV', 'CI','CR','CA' ], },
					// { id: 23, path: `${import.meta.env.BASE_URL}contracts/unspecified/unspecified`, type: "link", active: false, selected: false, title: "Unspecified" },
					{ id: 24, path: `${import.meta.env.BASE_URL}contracts/terms/term_conditions`, type: "link", active: false, selected: false, title: "Terms & Contitions", roles: [ 'DEV', 'CI','CR','CA' ], },
				]
			},
			//******************************** */
			
			// {/* Will be implemented and released according to priotization and  release plan*/}
			
			//************************************* */
			{
				id: 25, icon: AttendancesSvg, title: "Attendances", type: "sub", active: false, selected: false,roles: [ 'DEV', 'SA','MD','AF' ], children: [

					{
						id: 26, path: `${import.meta.env.BASE_URL}attendances/normal_attendance`, type: "link", active: false, selected: false, title: "Normal Working Hours",
						roles: ['DEV', 'SA', 'MD', 'AF']
					},
					{
						id: 27, path: `${import.meta.env.BASE_URL}attendances/overtime`, type: "link", active: false, selected: false, title: "Overtime Processing",
						roles: ['DEV', 'SA', 'MD', 'AF']
					},
				]
			},
			{
				id: 28, icon: LeavesSvg, title: "Leaves", type: "sub", active: false, selected: false, roles: ['DEV', 'SA', 'MD', 'AF'],
				children: [

					{ id: 29, path: `${import.meta.env.BASE_URL}leaves/annual`, type: "link", active: false, selected: false, title: "Annual",  },
					{ id: 34, path: `${import.meta.env.BASE_URL}leaves/sick-leave`, type: "link", active: false, selected: false, title: "Sick Leave", roles: ['DEV', 'SA', 'MD', 'AF'] },
						{ id: 32, path: `${import.meta.env.BASE_URL}leaves/maternity`, type: "link", active: false, selected: false, title: "Maternity", roles: ['DEV', 'SA', 'MD', 'AF']  },
					{ id: 33, path: `${import.meta.env.BASE_URL}leaves/paternity`, type: "link", active: false, selected: false, title: "Partenity", roles: ['DEV', 'SA', 'MD', 'AF']  },
					{ id: 31, path: `${import.meta.env.BASE_URL}leaves/compassionate`, type: "link", active: false, selected: false, title: "Compasionate", roles: ['DEV', 'SA', 'MD', 'AF']  },
				
					
					// { id: 35, path: `${import.meta.env.BASE_URL}leaves/sickhalfpaid`, type: "link", active: false, selected: false, title: "Sick Half Paid", roles: [ 'DEV', 'SA','AF' ]  },
					// { id: 36, path: `${import.meta.env.BASE_URL}leaves/sickunpaid`, type: "link", active: false, selected: false, title: "Sick Unpaid", roles: [ 'DEV', 'SA','AF' ]  },
				]
			},
			{ id: 37, icon: CompliancesSvg, title: "Compliance", type: "sub", active: false, selected: false, roles: [ 'DEV', 'SA','AF' ],  children: [

				{ id: 38, path: `${import.meta.env.BASE_URL}compliances/templategeneration`, type: "link", active: false, selected: false, title: "Template Generation", roles: [ 'DEV', 'SA','AF' ]  },
				{ id: 39, path: `${import.meta.env.BASE_URL}compliances/occupational`, type: "link", active: false, selected: false, title: "Occupational Reconciliation", roles: [ 'DEV', 'SA','AF' ]  },
			]
			},
			{ id: 39, icon: ExitsSvg, title: "Exits", type: "sub", active: false, selected: false, roles: [ 'DEV', 'SA','AF', 'MD', 'IR', 'ALL' ], children: [

					{ id: 40, path: `${import.meta.env.BASE_URL}exits/resignations`, type: "link", active: false, selected: false, title: "Resignations", roles: [ 'DEV', 'SA','AF', 'ALL' ]  },
					{ id: 41, path: `${import.meta.env.BASE_URL}exits/endcontracts`, type: "link", active: false, selected: false, title: "End of Contract", roles: [ 'DEV', 'SA','AF', 'ALL' ]  },
					{ id: 42, path: `${import.meta.env.BASE_URL}exits/end_specific_contracts`, type: "link", active: false, selected: false, title: "End of Specific Task", roles: [ 'DEV', 'SA','AF' ]  },
					{ id: 43, path: `${import.meta.env.BASE_URL}exits/mutuals`, type: "link", active: false, selected: false, title: "Mutual Aggrement", roles: [ 'DEV', 'SA','AF' ]  },
					{ id: 44, path: `${import.meta.env.BASE_URL}exits/retrenchments`, type: "link", active: false, selected: false, title: "Retrenchment", roles: [ 'DEV', 'SA','AF' ]  },
				]
			},
			{ id: 45, icon: IndustrialRelationshipSvg, title: "Industrial Relationship", type: "sub", active: false, selected: false, children: [

					{ id: 46, path: `${import.meta.env.BASE_URL}industrials/misconducts`, type: "link", active: false, selected: false, title: "Misconducts" },
					{ id: 47, path: `${import.meta.env.BASE_URL}industrials/perfomance_reviews`, type: "link", active: false, selected: false, title: "Perfomance Reviews" },
					{ id: 48, path: `${import.meta.env.BASE_URL}industrials/perfomance_capacity`, type: "link", active: false, selected: false, title: "Perfomance Capacity" },
					{ id: 49, path: `${import.meta.env.BASE_URL}industrials/disciplinaries`, type: "link", active: false, selected: false, title: "Disciplinary" },
					{ id: 50, path: `${import.meta.env.BASE_URL}industrials/grievances`, type: "link", active: false, selected: false, title: "Grievances" },
				]
			},
			{ id: 59, icon: ReportsSvg, title: "Reports", type: "sub", active: false, selected: false, children: [

					{ id: 60, path: `${import.meta.env.BASE_URL}reports/hirings`, type: "link", active: false, selected: false, title: "Hiring" },
					{ id: 61, path: `${import.meta.env.BASE_URL}reports/employees`, type: "link", active: false, selected: false, title: "Employee Registration" },
					{ id: 62, path: `${import.meta.env.BASE_URL}reports/clients`, type: "link", active: false, selected: false, title: "Employer or Clients" },
					{ id: 63, path: `${import.meta.env.BASE_URL}reports/contracts`, type: "link", active: false, selected: false, title: "Contracts" },
					{ id: 64, path: `${import.meta.env.BASE_URL}reports/industrials`, type: "link", active: false, selected: false, title: "Industrial Relation" },
					{ id: 66, path: `${import.meta.env.BASE_URL}reports/attendances`, type: "link", active: false, selected: false, title: "Attendances" }
				]
			},


			
			//******************************** */
			
			// {/* End of block   */}
			
			//************************************* */		
		]
	},
	
	
	{ menutitle: "MANAGE PROFILES", Items: [
			{ id: 86, icon: PagesSvg, title: "Profiles", type: "sub", active: false, selected: false, children: [
					{ id: 87, title: "Profile", type: "sub", active: false, selected: false, children: [

							{ id: 88, path: `${import.meta.env.BASE_URL}user/profile/home`, type: "link", active: false, selected: false, title: "Home" },
							{ id: 89, path: `${import.meta.env.BASE_URL}user/profile/setting`, type: "link", active: false, selected: false, title: "Profile Settings" },

						]
					},
					
					// { id: 97, title: "Mail", type: "sub", active: false, selected: false, children: [

					// 		{ id: 98, path: `${import.meta.env.BASE_URL}pagecomponent/mail/mainMail`, type: "link", active: false, selected: false, title: "Mail" },
					// 		{ id: 99, path: `${import.meta.env.BASE_URL}pagecomponent/mail/chat`, type: "link", active: false, selected: false, title: "Chat" },
					// 		{ id: 100, path: `${import.meta.env.BASE_URL}pagecomponent/mail/mailsettings`, type: "link", active: false, selected: false, title: "Mail-settings" },

					// 	]
					// },
					
				]
			},
		]
	},

];
export default MenuItems
