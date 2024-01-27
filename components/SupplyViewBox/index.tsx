import styles from './styles.module.scss'

export default function SupplyViewBox({ supplyLists }: { supplyLists: string[] }) {

    if(supplyLists.length === 0){
        return (
            <div className="card">
                <div className="card-body">
                    <h6 className="card-subtitle mb-2 text-body-secondary">サプライ品</h6>
                    <div className={styles.viewBox}>
                        なし
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="card">
            <div className="card-body">
                <h6 className="card-subtitle mb-2 text-body-secondary">サプライ品 ( {supplyLists.length}品目 )</h6>
                <div className={styles.supplyBox}>
                    <ul className="list-group list-group-flush">
                        {supplyLists.map((supply, index) => {
                            return (
                                <li className="list-group-item" key={index}>
                                    {supply}
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}
