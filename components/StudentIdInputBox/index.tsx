import { useContext, useRef } from "react"
import { StatusMsg } from "../../src/App"
import Button from "../Button"
import { StudentDataStore } from "../../src/App"

import { GrPowerReset } from "react-icons/gr";
import { GrCheckboxSelected } from "react-icons/gr";

type Props = {
    studentId: string,
    setStudentId: React.Dispatch<React.SetStateAction<string>>
}

export default function StudentIdInputBox({ studentId, setStudentId }: Props) {
    const { statusCode, setStatusCode } = useContext(StatusMsg);
    const { data } = useContext(StudentDataStore);
    
    const inputEl = useRef<HTMLInputElement>(null)

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length === 0) {
            reset()
        }
        setStudentId(e.target.value);
    }

    // 学籍番号の入力ボックスをリセット
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

    // ユーザ存在チェック
    function checkUser() {
        if (statusCode === 200) {
            return false
        }
        return true
    }

    // レシートプリント
    function print() {
        // プリントページを開く
        const printPage = window.open(`https://script.google.com/macros/s/${import.meta.env.VITE_PRINT_SERVICE_PAGE_ID}/exec?studentId=${studentId}&studentName=${data?.studentName}&pseudonym=${data?.pseudonym}&department=${data?.department}&timestamp=${new Date().getTime()}`)

        // 3秒後にプリントページを閉じる
        setTimeout(() => {
            if (printPage) {
                printPage.close()
                reset()
            }
            else {
                alert("印刷に失敗しました。")
            }
        }, 3000);
    }

    return (
        <>
            <div className="row g-3 align-items-center py-3">
                <div className="col-auto">
                    <label className="col-form-label">学籍番号</label>
                </div>
                <div className="col-auto">
                    <input ref={inputEl} type="text" autoFocus={true} className="form-control" onChange={handleInput} />
                </div>
                <div className="col-auto">
                    <span id="passwordHelpInline" className="form-text">
                        バーコードを読み取るか、学籍番号を入力してください。
                    </span>
                </div>
                <div className="col-auto">
                    <Button onClick={() => reset()}>
                        <GrPowerReset /> リセット
                    </Button>
                    <Button status="success" onClick={() => { print() }} disabled={checkUser()} >
                        <GrCheckboxSelected /> 確認済み
                    </Button>
                </div>
            </div>
        </>
    )
}
