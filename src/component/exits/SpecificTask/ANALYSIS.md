# EndContract to SpecificTask Pattern Analysis

## Overview
This document analyzes the EndContract component patterns and identifies improvements to apply to SpecificTask components.

## Key Patterns from EndContract

### 1. Employee Search with Auto-fill
- **EndContract**: Sophisticated employee search by employee number with debounce
- **Auto-fills**: Employee name, department, job title, phone, employer details
- **API**: Uses `/leaves/retrieve_employee_detail/{employeeNumber}`
- **Current SpecificTask**: Uses employee_id from URL params, no search functionality

### 2. Multi-Step Form with Progress Indicator
- **EndContract**: 3-step form with visual progress indicator (numbered circles with connecting lines)
- **Step Navigation**: Save data between steps, can jump to any step
- **Current SpecificTask**: 2-step form with basic navigation, no visual progress

### 3. Save as Draft vs Submit for Review
- **EndContract**: Two separate actions - "Save as Draft" and "Submit for Review"
- **Different Endpoints**: `create_endcontract` (save) vs `submit_endcontract` (submit)
- **Current SpecificTask**: Only has submit action

### 4. Workflow Management
- **EndContract**: Comprehensive workflow with:
  - Status: Draft, Submitted, Under Review, Approved, Rejected
  - Stage: Initiated, HR Review, Manager Review, Final Approval, Completed
  - Actions: Review, Approve, Reject, Return
  - Role-based access control
- **Current SpecificTask**: Basic status tracking, no workflow stages

### 5. Role-Based Filtering and Access Control
- **EndContract**: Uses `roleHelper.jsx` utilities:
  - `getActiveRole()` - Get current role
  - `filterItemsByActiveRole()` - Filter items by role
  - `getAvailableActions()` - Get available actions for role
  - `canPerformWorkflowAction()` - Check if action is allowed
- **Current SpecificTask**: No role-based filtering

### 6. Enhanced List View
- **EndContract**: 
  - Role-based filtering
  - Status and Stage badges with colors
  - Workflow action buttons (Approve/Reject) in list
  - Submit for Review button for Draft items
  - Delete functionality for Draft items
- **Current SpecificTask**: Basic list with view/edit/complete actions

### 7. View Component with Workflow Timeline
- **EndContract**: 
  - Workflow timeline showing all actions
  - Action buttons (Review, Approve, Reject, Return) based on role
  - Comments field for workflow actions
  - File preview modals
  - Status badges
- **Current SpecificTask**: Basic view with tabs, no workflow timeline

### 8. Form Structure
- **EndContract**: Uses Ant Design Form components with validation
- **Current SpecificTask**: Uses basic HTML forms

## Recommended Improvements for SpecificTask

### Priority 1 (High Impact)
1. ✅ Add employee search functionality to Add/Edit components
2. ✅ Add step progress indicator to Add component
3. ✅ Implement Save as Draft vs Submit functionality
4. ✅ Add role-based filtering to List component
5. ✅ Enhance List component with status/stage badges and workflow actions

### Priority 2 (Medium Impact)
6. Add workflow management (Review/Approve/Reject) to View component
7. Add workflow timeline to View component
8. Improve form validation using Ant Design patterns

### Priority 3 (Low Impact)
9. Refactor to use Ant Design Form components
10. Add file preview modals similar to EndContract

## Implementation Notes

### API Endpoints to Check
- Employee search: `/leaves/retrieve_employee_detail/{employeeNumber}`
- Workflow actions: `/employees/exits/endcontract/{action}_endcontract`
- Submit: `/employees/exits/endcontract/submit_endcontract`
- Save: `/employees/exits/endcontract/create_endcontract`

### Dependencies to Add
- `roleHelper.jsx` utilities (already exists)
- Ant Design components (Form, Card, Tag, Timeline, etc.)

### State Management
- Track form data across steps
- Track selected employee
- Track workflow status and stage
- Track active role


