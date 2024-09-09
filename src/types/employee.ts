export type LocalEmployee = {
    id: number,
    first_name: string,
    last_name: string,
    age: number,
    position: string,
    years_worked: number,
    email: string,
    facebook_link: string,
    avatar_link: string,
    rating: number,
}

export type ApiEmployee = {
    id: number,
    first_name: string,
    last_name: string,
    age: number,
    date_of_birth: string,
    position: string,
    profession: string,
    years_worked: number,
    phone_number: string,
    email: string,
    facebook_link: string,
    avatar_link: string,
    rating: number,
}

export type ApiEmployeeError = {
    message: string,
    documentation_url: string,
}
