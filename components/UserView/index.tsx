import RemarkInputBox from '../RemarkInputBox'
import { useStudentData } from '../../hooks/useStudentData'

import styles from './styles.module.scss'

export default function UserView({ studentId }: { studentId: string }) {

    const {data, isLoading} = useStudentData(studentId);

    // データ取得中
    if (isLoading) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    // データが存在しない
    if (!data) return <></>;

    return (
        <div className="container py-4">
            <div className="row py-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">氏名</h6>
                            <div className={styles.viewBox}>{data?.studentName ? data.studentName : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">読み仮名</h6>
                            <div className={styles.viewBox}>{data?.pseudonym ? data.pseudonym : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">学部</h6>
                            <div className={styles.viewBox}>{data?.department ? data.department : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {data.remarks ? <RemarkInputBox studentId={data.studentId} originalRemarks={data.remarks} /> : ""}
                </div>
            </div>
        </div>
    )
}
