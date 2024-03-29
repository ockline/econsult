import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";



//universal attribute;
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL

export const RecruitmentData = [
    {
        job_title_id: '',
        cost_center_id: '',
        cost_number: '',
        date: '',
        firstname: '',
        middlename: '',
        lastname: '',
        interviewer: '',
        military_service: '',
        military_number: '',
        place_recruitment: '',
        year_experience: '',
        education_knowledge: '',
        relevant_experience: '',
        major_achievement: '',
        language_fluency_id: '',
        education_knowledge_remark: '',
        relevant_experience_remark: '',
        major_achievement_remark: '',
        language_fluency_remark: '',
        main_strength: '',
        main_weakness: '',
        birth_place: '',
        residence_place: '',
        relative_inside: '',
        relative_name: '',
        chronic_disease: '',
        chronic_remarks: '',
        pregnant: '',
        pregnancy_months: '',
        employed_before: '',
        reference_check: '',
        reference_remarks: '',
        current_packages: '',
        agreed_salary: '',
        required_notes: '',
        current_employed_entity: '',
        social_insuarance_status: '',
        work_site: '',
        reallocation_place: '',
        recruiter_recommendations: '',
        recommended_title: '',
        interactive_communication: '',
        accountability: '',
        work_excellence: '',
        planning_organizing: '',
        problem_solving: '',
        analytical_ability: '',
        attention_details: '',
        initiative: '',
        multi_tasking: '',
        continuous_improvement: '',
        compliance: '',
        creativity_innovation: '',
        negotiation: '',
        team_work: '',
        adaptability_flexibility: '',
        leadership: '',
        delegating_managing: '',
        managing_change: '',
        strategic_conceptual_thinking: '',
        interactive_communication_remark: '',
        accountability_remark: '',
        work_excellence_remark: '',
        planning_organizing_remark: '',
        problem_solving_remark: '',
        analytical_ability_remark: '',
        attention_details_remark: '',
        initiative_remark: '',
        multi_tasking_remark: '',
        continuous_improvement_remark: '',
        compliance_remark: '',
        creativity_innovation_remark: '',
        negotiation_remark: '',
        team_work_remark: '',
        adaptability_flexibility_remark: '',
        leadership_remark: '',
        delegating_managing_remark: '',
        managing_change_remark: '',
        strategic_conceptual_thinking_remark: '',
        overall_rating: '',
        military_attachment: null,
        error_list: [],
    },
   
    
];

export const DataToSubmit = RecruitmentData.map((data) => ({
  job_title_id: data?.job_title_id,
                cost_center_id: RecruitmentData?.cost_center_id,
                cost_number: RecruitmentData?.cost_number,
                date: RecruitmentData?.date,
                firstname: RecruitmentData?.firstname,
                middlename: RecruitmentData.middlename,
                lastname: RecruitmentData?.lastname,
                interviewer: RecruitmentData?.interviewer,
                military_service: RecruitmentData?.military_service,
                military_number: RecruitmentData.military_number,
                place_recruitment: RecruitmentData?.place_recruitment,
                year_experience: RecruitmentData?.year_experience,
                education_knowledge: RecruitmentData?.education_knowledge,
                relevant_experience: RecruitmentData?.relevant_experience,
                major_achievement: RecruitmentData?.major_achievement,
                language_fluency_id: RecruitmentData?.language_fluency_id,
                education_knowledge_remark: RecruitmentData?.education_knowledge_remark,
                relevant_experience_remark: RecruitmentData?.relevant_experience_remark,
                major_achievement_remark: RecruitmentData?.major_achievement_remark,
                language_fluency_remark: RecruitmentData?.language_fluency_remark,
                main_strength: RecruitmentData?.main_strength,
                main_weakness: RecruitmentData?.main_weakness,
                birth_place: RecruitmentData?.birth_place,
                residence_place: RecruitmentData?.residence_place,
                relative_inside: RecruitmentData?.relative_inside,
                relative_name: RecruitmentData?.relative_name,
                chronic_disease: RecruitmentData?.chronic_disease,
                chronic_remarks: RecruitmentData?.chronic_remarks,
                pregnant: RecruitmentData?.pregnant,
                pregnancy_months: RecruitmentData.pregnancy_months,
                employed_before: RecruitmentData?.employed_before,
                reference_check: RecruitmentData?.reference_check,
                reference_remarks: RecruitmentData.reference_remarks,
                current_packages: RecruitmentData.current_packages,
                agreed_salary: RecruitmentData?.agreed_salary,
                required_notes: RecruitmentData.required_notes,
                current_employed_entity: RecruitmentData?.current_employed_entity,
                social_insuarance_status: RecruitmentData?.social_insuarance_status,
                work_site: RecruitmentData?.work_site,
                reallocation_place: RecruitmentData?.reallocation_place,
                recruiter_recommendations: RecruitmentData?.recruiter_recommendations,
                recommended_title: RecruitmentData?.recommended_title,
                interactive_communication: RecruitmentData?.interactive_communication,
                accountability: RecruitmentData?.accountability,
                work_excellence      : RecruitmentData?.work_excellence,   
                planning_organizing: RecruitmentData?.planning_organizing,         
                problem_solving: RecruitmentData?.problem_solving,         
                analytical_ability: RecruitmentData?.analytical_ability,          
                attention_details: RecruitmentData?.attention_details,           
                initiative: RecruitmentData?.initiative,          
                multi_tasking: RecruitmentData?.multi_tasking,           
                continuous_improvement: RecruitmentData?.continuous_improvement,          
                compliance: RecruitmentData?.compliance,          
                creativity_innovation: RecruitmentData?.creativity_innovation,           
                negotiation: RecruitmentData?.negotiation,         
                team_work: RecruitmentData?.team_work,           
                adaptability_flexibility: RecruitmentData?.adaptability_flexibility,            
                leadership: RecruitmentData?.leadership,          
                delegating_managing: RecruitmentData?.delegating_managing,         
                managing_change: RecruitmentData?.managing_change,         
                strategic_conceptual_thinking: RecruitmentData?.strategic_conceptual_thinking, 
                overall_rating: RecruitmentData?.overall_rating, 
                interactive_communication_remark: RecruitmentData?.interactive_communication_remark,
                accountability_remark: RecruitmentData?.accountability_remark,
                work_excellence_remark: RecruitmentData?.work_excellence_remark,
                planning_organizing_remark: RecruitmentData?.planning_organizing_remark,
                problem_solving_remark: RecruitmentData?.problem_solving_remark,
                analytical_ability_remark: RecruitmentData?.analytical_ability_remark,
                attention_details_remark: RecruitmentData?.attention_details_remark,
                initiative_remark: RecruitmentData?.initiative_remark,
                multi_tasking_remark: RecruitmentData?.multi_tasking_remark,
                continuous_improvement_remark: RecruitmentData?.continuous_improvement_remark,
                compliance_remark: RecruitmentData?.compliance_remark,
                creativity_innovation_remark: RecruitmentData?.creativity_innovation_remark,
                negotiation_remark: RecruitmentData?.negotiation_remark,
                team_work_remark: RecruitmentData?.team_work_remark,
                adaptability_flexibility_remark: RecruitmentData?.adaptability_flexibility_remark,
                leadership_remark: RecruitmentData?.leadership_remark,
                delegating_managing_remark: RecruitmentData?.delegating_managing_remark,
                managing_change_remark: RecruitmentData?.managing_change_remark,
                strategic_conceptual_thinking_remark: RecruitmentData?.strategic_conceptual_thinking_remark,    
                military_attachment: RecruitmentData.military_attachment,

}));



// ****************************************************************************************
      //Interviewed Candidate Details
export const fetchAssessedCandidate = async () => {
    
  try {
    const res = await axios.get(`${apiBaseUrl}/hiring/hr_interview/show_candidate`);
    return res.data.assessment;
  } catch (error) {
    throw new Error('Failed to fetch assessed candidates: ' + error.message);
  }
};


// ****************************************************************************************
      //Interviewed Candidate Details
export const fetchTechnicalCandidate = async () => {
    
  try {
    const res = await axios.get(`${apiBaseUrl}/hiring/technical_interview/show_candidate`);
    return res.data.candidate;
  } catch (error) {
    throw new Error('Failed to fetch technical assessed candidates: ' + error.message);
  }
};


// const usermchongo = await fetchAssessedCandidate();
// console.log('welimba');
// console.log(usermchongo);

// *************************************
//Get Specific assessed candidet by id
// recruitmentdata.jsx
export const getAssessedCandidate = async (id) => {
   
  try {
    const res = await axios.get(`${apiBaseUrl}/hiring/hr_interview/edit_assessment/` + id);
    return res.data.assessed_candidate;
  } catch (error) {
    throw new Error('Failed to fetch assessed candidates: ' + error.message);
  }
};






// export const getAssessedCandidate = async () => {
//   const { id } = useParams();
//   useEffect(() => {
//     try {
//       const res = await axios.get(`${apiBaseUrl}/hiring/hr_interview/edit_assessment/${id}`).then((res) => {
//         return res.data.assessment;
//       })
//     } catch (error) {
//       throw new Error('Failed to fetch assessed candidates: ' + error.message);
//     }
//   },[id])
// };















