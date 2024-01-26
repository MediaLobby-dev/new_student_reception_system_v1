export type StudentData = {
    studentId: string;
    studentName: string;
    kana: string;
    department: string;
    remarks: string;
    supplyList: string[];
    receptionStatus: boolean;
}
export type queryProps = {
    isLoading: boolean,
    data: StudentData | null,
}

export type departmentColor = {
    departmentName: string,
    styleName: string,
}

export type departmentColorList = departmentColor[];
