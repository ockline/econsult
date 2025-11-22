import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';

const RolePanel = ({ local_varaiable }) => {
  const userRoles = local_varaiable?.roles || [];
  const [activeRole, setActiveRole] = useState(null);
  const [activeModule, setActiveModule] = useState(null);

  // Module definitions with icons
  const modules = {
    'Exit Management': {
      icon: 'ri-logout-box-line',
      roles: ['IR', 'IRHR', 'IRM'],
      description: 'Manage employee exits and resignations'
    },
    'Induction Management': {
      icon: 'ri-user-add-line',
      roles: ['ITR', 'ITAr'],
      description: 'Handle employee induction processes'
    },
    'Leave Management': {
      icon: 'ri-calendar-line',
      roles: ['LR', 'LA'],
      description: 'Process leave requests and approvals'
    },
    'Recruitment Management': {
      icon: 'ri-user-search-line',
      roles: ['VR', 'VA', 'HRI', 'TI'],
      description: 'Manage recruitment and hiring'
    },
    'Industrial Relations': {
      icon: 'ri-team-line',
      roles: ['IRGA', 'IRMR', 'IRMA'],
      description: 'Handle grievances and misconduct'
    },
    'Contract Management': {
      icon: 'ri-file-text-line',
      roles: ['CR', 'CA'],
      description: 'Manage employment contracts'
    },
    'Social Records': {
      icon: 'ri-file-list-line',
      roles: ['SR', 'SA'],
      description: 'Maintain social records'
    },
    'System Administration': {
      icon: 'ri-settings-line',
      roles: ['DEV', 'MD', 'HR', 'ADMIN'],
      description: 'System administration and management'
    }
  };

  // Role display names
  const roleNames = {
    'DEV': 'Developer',
    'IR': 'Industrial Relations Officer',
    'IRHR': 'IR HR Reviewer',
    'IRM': 'IR Manager',
    'ITR': 'Induction Reviewer',
    'ITAr': 'Induction Approver',
    'VR': 'Vacancy Reviewer',
    'VA': 'Vacancy Approver',
    'IRGA': 'Grievance Approver',
    'IRMR': 'Misconduct Reviewer',
    'IRMA': 'Misconduct Approver',
    'MD': 'Managing Director',
    'SR': 'Social Reviewer',
    'SA': 'Social Approver',
    'CR': 'Contract Reviewer',
    'CA': 'Contract Approver',
    'LR': 'Leave Reviewer',
    'LA': 'Leave Approver',
    'HR': 'Human Resources',
    'ADMIN': 'Administrator',
  };

  // Get available modules for user
  const getAvailableModules = () => {
    return Object.entries(modules).filter(([moduleName, moduleData]) => 
      moduleData.roles.some(role => userRoles.includes(role))
    );
  };

  // Get roles for active module
  const getModuleRoles = () => {
    if (!activeModule) return [];
    return userRoles.filter(role => modules[activeModule]?.roles.includes(role));
  };

  useEffect(() => {
    // Set default active role and module
    const storedRole = sessionStorage.getItem('activeRole');
    const storedModule = sessionStorage.getItem('activeModule');
    
    if (storedRole && userRoles.includes(storedRole)) {
      setActiveRole(storedRole);
    } else if (userRoles.length > 0) {
      setActiveRole(userRoles[0]);
      sessionStorage.setItem('activeRole', userRoles[0]);
    }

    if (storedModule && modules[storedModule]) {
      setActiveModule(storedModule);
    } else {
      const availableModules = getAvailableModules();
      if (availableModules.length > 0) {
        setActiveModule(availableModules[0][0]);
        sessionStorage.setItem('activeModule', availableModules[0][0]);
      }
    }
  }, [userRoles]);

  const handleModuleChange = (moduleName) => {
    setActiveModule(moduleName);
    sessionStorage.setItem('activeModule', moduleName);
    
    // Set first available role for this module
    const moduleRoles = userRoles.filter(role => modules[moduleName]?.roles.includes(role));
    if (moduleRoles.length > 0) {
      setActiveRole(moduleRoles[0]);
      sessionStorage.setItem('activeRole', moduleRoles[0]);
    }
  };

  const handleRoleChange = (role) => {
    setActiveRole(role);
    sessionStorage.setItem('activeRole', role);
    // Trigger a custom event to notify components of role change
    window.dispatchEvent(new CustomEvent('roleChanged', { detail: { newRole: role } }));
  };

  const handleSignOut = () => {
    sessionStorage.clear();
    window.location.href = '/login';
  };

  if (userRoles.length === 0) {
    return null;
  }

  const availableModules = getAvailableModules();
  const moduleRoles = getModuleRoles();

  return (
    <div id="role-panel" className="hs-overlay hidden ti-offcanvas ti-offcanvas-right">
      <div className="ti-offcanvas-header z-10 relative">
        <h3 className="ti-offcanvas-title" style={{ color: '#b2000a', fontWeight: 'bold' }}>
          Account & Activities
        </h3>
        <button 
          type="button" 
          className="ti-btn ti-btn-ghost-secondary !p-2 hover:bg-gray-100 dark:hover:bg-black/20"
          data-hs-overlay="#role-panel"
        >
          <i className="ri-close-line text-lg"></i>
        </button>
      </div>
      
      <div className="ti-offcanvas-body">
        {/* Switch Module Section */}
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-4" style={{ color: '#b2000a' }}>
            Switch Module
          </h4>
          <div className="space-y-2">
            {availableModules.map(([moduleName, moduleData]) => (
              <button
                key={moduleName}
                onClick={() => handleModuleChange(moduleName)}
                className={`w-full flex items-center p-3 rounded-lg border transition-all ${
                  activeModule === moduleName 
                    ? 'border-red-600 bg-red-50 dark:bg-red-900/20' 
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5'
                }`}
              >
                <i className={`${moduleData.icon} text-lg mr-3`} style={{ color: '#b2000a' }}></i>
                <div className="text-left">
                  <div className="font-medium text-gray-900 dark:text-white">{moduleName}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{moduleData.description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Roles Table */}
        <div className="mb-6">
          <h4 className="text-lg font-bold mb-4" style={{ color: '#b2000a' }}>
            Available Roles
          </h4>
          <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-white/10">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-white/10">
              <thead style={{ backgroundColor: '#b2000a' }}>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Sn
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    Valid To
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-bgdark divide-y divide-gray-200 dark:divide-white/10">
                {moduleRoles.map((role, index) => (
                  <tr 
                    key={role}
                    className={`cursor-pointer transition-colors ${
                      activeRole === role 
                        ? 'bg-red-100 dark:bg-red-900/30 border-l-4 border-red-600' 
                        : 'hover:bg-gray-50 dark:hover:bg-white/5'
                    }`}
                    onClick={() => handleRoleChange(role)}
                  >
                    <td className={`px-4 py-3 text-sm ${
                      activeRole === role 
                        ? 'text-red-700 dark:text-red-300 font-bold' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {index + 1}
                    </td>
                    <td className={`px-4 py-3 text-sm font-medium ${
                      activeRole === role 
                        ? 'text-red-700 dark:text-red-300 font-bold' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {roleNames[role] || role}
                      {activeRole === role && (
                        <span className="ml-2 text-red-600 dark:text-red-400">
                          ✓
                        </span>
                      )}
                    </td>
                    <td className={`px-4 py-3 text-sm ${
                      activeRole === role 
                        ? 'text-red-600 dark:text-red-400' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}>
                      31 Dec 2025
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sign Out Button */}
        <div className="mt-auto">
          <button
            onClick={handleSignOut}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <LogoutOutlined className="mr-2" />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  local_varaiable: state
});

export default connect(mapStateToProps)(RolePanel);
