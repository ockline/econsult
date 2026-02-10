# Mutual Agreement and Retrenchment Components Analysis

## Overview
This document outlines the components needed for Mutual Agreement and Retrenchment exit management, based on the SpecificTask pattern.

## Components to Create

### Mutual Agreement
1. ✅ MutualAgreementList.jsx - List all mutual agreements
2. ⏳ AddMutualAgreement.jsx - Create new mutual agreement
3. ⏳ EditMutualAgreement.jsx - Edit existing mutual agreement
4. ⏳ ViewMutualAgreement.jsx - View mutual agreement details

### Retrenchment
1. ✅ RetrenchmentList.jsx - List all retrenchments
2. ⏳ AddRetrenchment.jsx - Create new retrenchment
3. ⏳ EditRetrenchment.jsx - Edit existing retrenchment
4. ⏳ ViewRetrenchment.jsx - View retrenchment details

## Key Differences from SpecificTask

### API Endpoints
- **Mutual Agreement**: `/employees/exits/mutual_agreement/`
- **Retrenchment**: `/employees/exits/retrenchment/`
- **Specific Task**: `/employees/exits/end_specific_contract/`

### Routes
- **Mutual Agreement**: `/exits/mutual_agreements`
- **Retrenchment**: `/exits/retrenchments`
- **Specific Task**: `/exits/end_specific_contracts`

### Exit Type
- **Mutual Agreement**: `exit_type = 'mutual_agreement'`
- **Retrenchment**: `exit_type = 'retrenchment'`
- **Specific Task**: `contract_type_id = 2`

### Titles and Labels
- Replace "End Specific Task" with "Mutual Agreement" or "Retrenchment"
- Replace "Specific Task Contract" with "Mutual Agreement" or "Retrenchment"

## Implementation Notes

All components should follow the same pattern as SpecificTask:
- Employee search functionality
- Multi-step form with progress indicator
- Save as Draft vs Submit for Review
- Workflow management (Review, Approve, Reject)
- Role-based access control
- PDF generation and document management

