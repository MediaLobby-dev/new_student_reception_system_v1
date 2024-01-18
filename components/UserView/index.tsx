import styles from './styles.module.scss'

export default function UserView() {
    return (
        <div className="container py-4">
            <div className="row py-2">
                <div className="col">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-body-secondary">氏名</h6>
                            <div className={styles.viewBox}>田中太郎</div>
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
                            <div className={styles.viewBox}>特になし</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
