import { useState } from "react";
import { editRemarks } from "../../src/gas";

export default function RemarkInputBox({ studentId, originalRemarks }: { studentId: string, originalRemarks: string }) {
    const [remarks, setRemarks] = useState<string>(originalRemarks);

    async function updateRemarks(): Promise<void> {
        await editRemarks(studentId, remarks);
    }

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-body-secondary">備考欄</h6>
                    <textarea className="form-control" rows={3} value={remarks} onChange={(e) => { setRemarks(e.target.value) }}></textarea>
                    <button className="btn btn-primary mt-2" onClick={() => updateRemarks()}>更新</button>
                </div>
            </div>
        </>
    );
}
