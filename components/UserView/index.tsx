import RemarkInputBox from '../RemarkInputBox'
import { useStudentData } from '../../hooks/useStudentData'
import styles from './styles.module.scss'
import { departmentColorList } from '../../src/types';
import SupplyViewBox from '../SupplyViewBox';

const colorList: departmentColorList = [
    {
        departmentName: "BS",
        styleName: styles.bs,
    },
    {
        departmentName: "MS",
        styleName: styles.ms,
    },
    {
        departmentName: "CS",
        styleName: styles.cs,
    },
    {
        departmentName: "ES",
        styleName: styles.es,
    },
    {
        departmentName: "HS",
        styleName: styles.hs,
    },
    {
        departmentName: "DS",
        styleName: styles.ds,
    }
]

export default function UserView({ studentId }: { studentId: string }) {

    const { data, isLoading } = useStudentData(studentId);

    function getDepartmentColor(departmentName: string) {
        const color = colorList.find((element) => element.departmentName === departmentName)
        if (!color) return styles.departmentdefault;
        return color?.styleName
    }

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
        <div className="container">
            <div className="row">
                <div className="col-sm-6">
                    <div className="card mb-2">
                        <div className="card-body"
                            data-tooltip-id="receptionStatusTooltip"
                            data-tooltip-content="受付票の印字ミスなどで受付取消を行う場合はシートを直接編集してください。"
                            data-tooltip-place="top">
                            <h6
                                className="card-subtitle mb-2 text-body-secondary">
                                受付状況
                            </h6>
                            <div className={styles.viewBox}>
                                {data?.receptionStatus ? <div className={styles.doneReception}>受付済</div> : <div>未受付</div>}
                                {data?.receptionStatus && <div className={styles.description}>※受付票の印字ミスなどで受付取消を行う場合はシートを直接編集してください。</div>}
                            </div>
                        </div>
                    </div>
                    <div className="card mb-2">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">氏名</h6>
                            <div className={styles.viewBox}>{data?.studentName ? data.studentName : "NaN"}</div>
                        </div>
                    </div>

                    <div className="card mb-2">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">読み仮名</h6>
                            <div className={styles.viewBox}>{data?.kana ? data.kana : "NaN"}</div>
                        </div>
                    </div>

                    <div className="card mb-2">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">学部</h6>
                            <div className={styles.viewBox}>
                                <span className={getDepartmentColor(data.department)}>
                                    {data?.department ? data.department : "NaN"}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="col-sm-6">
                    <SupplyViewBox supplyLists={data?.supplyList ? data.supplyList : []} />
                </div>
            </div>

            <div className="row">
                <div className="col py-2">
                    <RemarkInputBox studentId={data.studentId} originalRemarks={data?.remarks ? data.remarks : ""} />
                </div>
            </div>
        </div>
    )
}
