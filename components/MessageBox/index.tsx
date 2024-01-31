import { useContext } from "react";
import { StateStore } from "../../src/App";
import { ErrorCodeList}  from "../../src/types";

export default function MessageBox() {
    const { statusCode, setStatusCode } = useContext(StateStore);

    // 4秒後にメッセージを消す
    setTimeout(() => {
        if(statusCode && statusCode === 201) return;
        statusCode && statusCode.toString().startsWith("2") && setStatusCode(1);
    }, 5000);

    const message = ErrorCodeList.find((element) => element.code === statusCode)?.message;
    const subMessage = ErrorCodeList.find((element) => element.code === statusCode)?.subMessage;

    // ステータスコードが未定義、0、1の場合は、非表示
    if (statusCode === 0 || statusCode === 1) return <></>;

    // ステータスコードが2xxの場合は、成功メッセージを表示
    if (statusCode.toString().startsWith("2")) {
        return (
            <div className="container py-2">
                <div className="alert alert-success" role="alert">
                    <p className="mb-0">{message ? message : ""}</p>
                </div>
            </div>
        )
    }

    // ステータスコードが405の場合は、情報メッセージを表示
    if (statusCode === 405) {
        return (
            <div className="container py-2">
                <div className="alert alert-info" role="alert">
                    <p className="mb-0">{message ? message : ""}</p>
                    <p className="mb-0">{subMessage ? subMessage : ""}</p>
                </div>
            </div>
        )
    }

    // ステータスコードが4xxの場合は、エラーメッセージを表示
    if (statusCode.toString().startsWith("4")) {
        return (
            <div className="container py-2">
                <div className="alert alert-danger" role="alert">
                    <p className="mb-0">{message ? message : ""}</p>
                    <p className="mb-0">{subMessage ? subMessage : ""}</p>
                </div>
            </div>
        )
    }

    // ステータスコードが5xxの場合は、エラーメッセージを表示
    if (statusCode.toString().startsWith("5")) {
        return (
            <div className="container py-2">
                <div className="alert alert-danger" role="alert">
                    <p className="mb-0">{message ? message : ""}</p>
                    <p className="mb-0">{subMessage ? subMessage : ""}</p>
                </div>
            </div>
        )
    }

    // それ以外の場合は、非表示
    return <></>
}
