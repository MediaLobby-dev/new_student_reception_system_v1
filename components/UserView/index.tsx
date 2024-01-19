import { useEffect, useState } from 'react'
import { getStudentData } from '../../src/gas'

import styles from './styles.module.scss'
import { StudentData } from '../../src/types'


export default function UserView({ studentId }: { studentId: string }) {

    const [userData, setUserData] = useState<StudentData>();

    useEffect(() => {
        const fetchData = (async () => {
            const data = await getStudentData(studentId);
            setUserData(data);
        });
        fetchData();
    }, [studentId]);

    if(!userData) return <p>Loading</p>;

    return (
        <div className="container py-4">
            <div className="row py-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">氏名</h6>
                            <div className={styles.viewBox}>{userData?.studentName}</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">読み仮名</h6>
                            <div className={styles.viewBox}>たなかたろう</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row py-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">学部</h6>
                            <div className={styles.viewBox}>ES</div>
                        </div>
                    </div>
                </div>
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">備考欄</h6>
                            <textarea className="form-control" rows={3}></textarea>
                            <button className="btn btn-primary mt-2">更新</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
