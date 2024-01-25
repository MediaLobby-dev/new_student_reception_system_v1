import { StudentData } from "./types";

declare let google: any;

// GAS側からスプシ上のデータを走査して、該当するデータを返す関数を呼び出す
export function getStudentData (studentId: string): Promise<StudentData> {
    return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler((studentData: StudentData) => resolve(studentData))
            .withFailureHandler((e: any) => reject(e)) 
            .getStudentData(studentId);
    });
}

// GAS側からWebパネルから受け取った位置情報の行の色を変更する関数を呼び出す
export function fillingLine(studentId: string): Promise<string> {
    return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler((msg: string) => resolve(msg))
            .withFailureHandler((e: any) => reject(e)) 
            .fillingLine(studentId);
    });
}

// 備考欄の編集を行う関数を呼び出す
export function editRemarks(studentId: string, remarks: string) {
    return new Promise((resolve, reject) => {
        google.script.run
            .withSuccessHandler((msg: string) => resolve(msg))
            .withFailureHandler((e: any) => reject(e)) 
            .editRemarks({studentId, remarks});
    });
}
