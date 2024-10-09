export interface IJob {
    id: string,
    created_at: string,
    recruiter_id: string,
    title: string,
    company_id: string,
    description: string,
    location: string,
    requirements: string,
    is_open: boolean,
    company?: any,
    applications?: any
}