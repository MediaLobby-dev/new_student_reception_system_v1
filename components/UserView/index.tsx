import { useEffect, useState, useContext } from 'react'
import { getStudentData } from '../../src/gas'
import RemarkInputBox from '../RemarkInputBox'
import { StatusMsg } from '../../src/App'

import styles from './styles.module.scss'
import { StudentData } from '../../src/types'

export default function UserView({ studentId }: { studentId: string }) {
    const [userData, setUserData] = useState<StudentData>();
    const { setStatusCode } = useContext(StatusMsg);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = (async () => {
            await getStudentData(studentId).then((data) => {
                if (data.studentId === "") {
                    setStatusCode(404);
                    setIsLoading(false);
                    setUserData(undefined);
                } else {
                    setUserData({
                        studentId: data.studentId,
                        studentName: data.studentName,
                        pseudonym: data.pseudonym,
                        department: data.department,
                        remarks: data.remarks,
                    });
                    setStatusCode(200);
                    setIsLoading(false);
                }
            }).catch((err) => {
                console.log(err);
            });
        });
        setStatusCode(0);
        setIsLoading(true);
        fetchData();
    }, [studentId, setStatusCode]);

    if (isLoading) {
        return (
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        );
    }

    if(userData === undefined) return <></>;

    return (
        <div className="container py-4">
            <div className="row py-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">氏名</h6>
                            <div className={styles.viewBox}>{userData?.studentName ? userData.studentName : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">読み仮名</h6>
                            <div className={styles.viewBox}>{userData?.pseudonym ? userData.pseudonym : ""}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">学部</h6>
                            <div className={styles.viewBox}>{userData?.department ? userData.department : ""}</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    {userData?.remarks ? <RemarkInputBox studentId={userData.studentId} originalRemarks={userData.remarks} /> : ""}
                </div>
            </div>
        </div>
    )
}
