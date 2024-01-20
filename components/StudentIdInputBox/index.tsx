import { useContext, useRef } from "react"
import { StatusMsg } from "../../src/App"

type Props = {
    setStudentId: React.Dispatch<React.SetStateAction<string>>
}

export default function StudentIdInputBox({ setStudentId }: Props) {
    const { setStatusCode } = useContext(StatusMsg);
    const inputEl = useRef<HTMLInputElement>(null)

    function reset() {
        // ステータスコードをリセット
        setStatusCode(0)
        // 学籍番号をリセット
        setStudentId('')
        // フォーカスをリセット
        if (inputEl.current) {
            inputEl.current.value = ''
            inputEl.current.focus()
        }
    }

    return (
        <>
            <div className="row g-3 align-items-center py-3">
                <div className="col-auto">
                    <label className="col-form-label">学籍番号</label>
                </div>
                <div className="col-auto">
                    <input ref={inputEl} type="text" autoFocus={true} className="form-control" onChange={(e) => setStudentId(e.target.value)} />
                </div>
                <div className="col-auto">
                    <span id="passwordHelpInline" className="form-text">
                        バーコードを読み取るか、学籍番号を入力してください。
                    </span>
                </div>
                <button className="btn btn-secondary col-auto" onClick={() => reset()}>リセット</button>
            </div>
        </>
    )
}
