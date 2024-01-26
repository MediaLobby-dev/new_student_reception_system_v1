import { useContext, useRef } from "react"
import { StatusMsg } from "../../src/App"
import Button from "../Button"
import { StudentDataStore } from "../../src/App"
import { make_accepted_processing } from "../../src/gas"

import { GrPowerReset } from "react-icons/gr";
import { GrCheckboxSelected } from "react-icons/gr";

type Props = {
    studentId: string,
    setStudentId: React.Dispatch<React.SetStateAction<string>>
}

if (import.meta.env.VITE_PRINT_SERVICE_DEPLOY_ID === undefined || import.meta.env.VITE_PRINT_SERVICE_DEPLOY_ID === "") {
    throw new Error("[Error] VITE_PRINT_SERVICE_DEPLOY_ID を設定してください。")
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

    // 確認済みボタンの無効化
    function disabledCheck() {
        // ステータスコードが0の場合は、無効にする
        if (statusCode === 0) {
            return true
        }

        // ステータスコードが4xxで始まる場合は、無効にする
        if (statusCode.toString().startsWith("4")) {
            return true
        }

        // ステータスコードが5xxで始まる場合は、無効にする
        if (statusCode.toString().startsWith("5")) {
            return true
        }

        // 受付済みの場合は再度確認を無効にする
        if (data?.receptionStatus === true) {
            return true
        }

        return false
    }

    // レシートプリント
    async function print() {
        // プリントページを開く
        const printPage = window.open(`https://script.google.com/macros/s/${import.meta.env.VITE_PRINT_SERVICE_DEPLOY_ID}/exec?studentId=${studentId}&studentName=${data?.studentName}&kana=${data?.kana}`)

        // GASで行塗りつぶしの受付処理を行う
        const res = await make_accepted_processing(studentId)

        if (res === false) {
            alert("[Error] 受付処理(GAS側)の最中にエラーが発生しました。")
        }

        // 3秒後にプリントページを閉じる
        setTimeout(async () => {
            if (printPage !== null) {
                printPage.close()
                reset()
            }
            else {
                alert("[Error] プリントページを閉じることができませんでした。手動で閉じてください。")
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
                    <Button status="success" onClick={() => { print() }} disabled={disabledCheck()} >
                        <GrCheckboxSelected /> 確認済み
                    </Button>
                </div>
            </div>
        </>
    )
}
