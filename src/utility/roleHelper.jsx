/**
 * Get the current active role from session storage
 */
export const getActiveRole = () => {
  return sessionStorage.getItem('activeRole') || null;
};

/**
 * Check if user can perform workflow action based on active role and workflow stage
 */
export const canPerformWorkflowAction = (activeRole, workflowStage, actionType) => {
  // Define role patterns and their permissions
  const rolePatterns = {
    // Reviewer roles - can review and return
    'reviewer': {
      pattern: /.*R$/i, // Ends with 'R' (Reviewer)
      stages: ['Submitted', 'Under Review', 'Initiated', 'Pending Review'],
      actions: ['review', 'return']
    },
    // Approver roles - can approve and reject
    'approver': {
      pattern: /.*A$/i, // Ends with 'A' (Approver)
      stages: ['Submitted', 'Under Review', 'Final Approval', 'Initiated', 'Pending Approval'],
      actions: ['approve', 'reject']
    },
    // Industrial Relations roles - can review, approve, reject, return
    'ir': {
      pattern: /^IR/i, // Starts with 'IR'
      stages: ['Submitted', 'HR Review', 'Manager Review', 'Initiated', 'Under Review'],
      actions: ['review', 'approve', 'reject', 'return']
    },
    // Admin roles - can do everything
    'admin': {
      pattern: /^(DEV|ADMIN|MD)$/i,
      stages: ['*'],
      actions: ['*']
    }
  };

  // Check if role matches any pattern
  for (const [roleType, config] of Object.entries(rolePatterns)) {
    if (config.pattern.test(activeRole)) {
      const canHandleStage = config.stages.includes('*') || config.stages.includes(workflowStage);
      const canPerformAction = config.actions.includes('*') || config.actions.includes(actionType);
      return canHandleStage && canPerformAction;
    }
  }

  // If no pattern matches, return false
  return false;
};

/**
 * Get items that the user can act on based on their active role
 */
export const filterItemsByActiveRole = (items, activeRole, stageField = 'stage') => {
  if (!activeRole || !items) {
    return items;
  }

  // Developer and Admin can see everything
  if (activeRole === 'DEV' || activeRole === 'ADMIN') {
    return items;
  }

  // Filter items based on workflow stage
  return items.filter(item => {
    const stage = item[stageField];
    const status = item.status || item.status_field || 'Draft';
    
    // For reviewers and IR roles
    if (activeRole.endsWith('R') || activeRole.startsWith('IR')) {
      // IR roles can see Draft (to edit/submit) and Submitted (to track)
      if (activeRole.startsWith('IR')) {
        return status === 'Draft' || status === 'Submitted' || status === 'Under Review';
      }
      // Other reviewers see only Submitted items
      return status === 'Submitted';
    }
    
    // For approvers, show items ready for approval
    if (activeRole.endsWith('A')) {
      return canPerformWorkflowAction(activeRole, stage, 'approve') || 
             canPerformWorkflowAction(activeRole, stage, 'reject');
    }
    
    // Default filtering
    return canPerformWorkflowAction(activeRole, stage, 'review') || 
           canPerformWorkflowAction(activeRole, stage, 'approve');
  });
};

/**
 * Get role display name
 */
export const getRoleDisplayName = (roleAlias) => {
  // Convert role alias to readable format
  if (!roleAlias) return roleAlias;
  
  // Handle common patterns
  const roleMap = {
    'DEV': 'Developer',
    'MD': 'Managing Director',
    'ADMIN': 'Administrator',
    'HR': 'Human Resources'
  };

  // If it's in the map, return mapped name
  if (roleMap[roleAlias]) {
    return roleMap[roleAlias];
  }

  // Convert role alias to readable format
  // Remove common prefixes and convert to readable format
  let displayName = roleAlias
    .replace(/^IR/, 'Industrial Relations ')
    .replace(/^IT/, 'Induction ')
    .replace(/^VR/, 'Vacancy ')
    .replace(/^LR/, 'Leave ')
    .replace(/^CR/, 'Contract ')
    .replace(/^SR/, 'Social ')
    .replace(/R$/, ' Reviewer')
    .replace(/A$/, ' Approver')
    .replace(/M$/, ' Manager')
    .replace(/GA$/, ' Grievance Approver')
    .replace(/MR$/, ' Misconduct Reviewer')
    .replace(/MA$/, ' Misconduct Approver');

  return displayName;
};

/**
 * Get workflow actions available for active role and item
 */
export const getAvailableActions = (activeRole, item, stageField = 'stage') => {
  const stage = item[stageField];
  const actions = [];

  if (canPerformWorkflowAction(activeRole, stage, 'review')) {
    actions.push('review');
  }
  if (canPerformWorkflowAction(activeRole, stage, 'approve')) {
    actions.push('approve');
  }
  if (canPerformWorkflowAction(activeRole, stage, 'reject')) {
    actions.push('reject');
  }
  if (canPerformWorkflowAction(activeRole, stage, 'return')) {
    actions.push('return');
  }

  return actions;
};

