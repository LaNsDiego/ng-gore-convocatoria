export type AcademicTrainingEntity = {
  id : number
  employee_id : number

  educational_level : string
  education_country_id : number
  education_study_center : string
  // education_file : string

  academic_situation : string
  academic_situation_start_year : string
  academic_situation_end_year : string
  academic_situation_city_id : number


  academic_degree : string
  academic_degree_level : string
  academic_degree_specialty : string



  qualification_title : string
  qualification_specialty : string
  qualification_expedition_date : string
  qualification_entity_control : string
  qualification_registration_center : string
  qualification_registration_number : string
  qualification_registration_date : string
  qualification_resolution_date : string
  qualification_resolution_number : string
  qualification_file : string
  full_path_qualification_file : string

  tuition_school : string
  tuition_number : string
  tuition_date : string
  tuition_file : string
  full_path_tuition_file : string

  // authorization_certificate : string
  // authorization_start_date : string
  // authorization_end_date : string
  // authorization_file : string
  // full_path_authorization_file : string
}
