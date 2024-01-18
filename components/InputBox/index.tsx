export default function InputBox() {
    return (
        <>
            <div className="row g-3 align-items-center py-3">
                <div className="col-auto">
                    <label className="col-form-label">学籍番号</label>
                </div>
                <div className="col-auto">
                    <input type="text" className="form-control"/>
                </div>
                <div className="col-auto">
                    <span id="passwordHelpInline" className="form-text">
                        バーコードを読み取るか、学籍番号を入力してください。
                    </span>
                </div>
            </div>
        </>
    )
}
