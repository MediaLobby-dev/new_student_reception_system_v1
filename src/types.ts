export type StudentData = {
    studentId: string;
    studentName: string;
    pseudonym: string;
    department: string;
    remarks: string;
}
export type queryProps = {
    isLoading: boolean,
    data: StudentData | null,
}
