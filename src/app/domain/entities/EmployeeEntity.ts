export type EmployeeEntity = {
    id : number
    first_name : string
    mother_last_name : string
    father_last_name : string
    sex : string
    marital_status : string
    date_of_birth : string
    phone_number : string
    email : string
    file_data_employee : string
    full_path_file_data_employee : string

    birth_city_id : number
    file_place_of_birth : string
    full_path_file_place_of_birth : string

    address_city_id : number
    file_address : string
    full_path_file_address : string

    bank : string
    account_number : string
    cci : string
    account_type : string
    file_bank_account : string
    full_path_file_bank_account : string


    document_type : string
    document_number : string
    created_at : string
    updated_at : string
}
