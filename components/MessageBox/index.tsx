import { useContext } from "react";
import { StatusMsg } from "../../src/App";

export default function MessageBox() {
    const { statusCode, setStatusCode } = useContext(StatusMsg);

    // 4秒後にメッセージを消す
    setTimeout(() => {
        statusCode && statusCode.toString().startsWith("2") && setStatusCode(0);
    }, 2500);

    switch (statusCode) {
        case 0: // Not yet
            return <></>;
        case 200: // OK
            return (
                <>
                    <div className="container py-2">
                        <div className="alert alert-success" role="alert">
                            <p className="mb-0">データ取得に成功しました。</p>
                        </div>
                    </div>
                </>
            );
        case 201:
            return (
                <>
                    <div className="container py-2">
                        <div className="alert alert-success" role="alert">
                            <p className="mb-0">操作は正常に実行されました。</p>
                        </div>
                    </div>
                </>
            );
        case 400:
            return (
                <>
                    <div className="container py-2">
                        <div className="alert alert-danger" role="alert">
                            <p>リクエストが不正です。</p>
                            <p className="mb-0">エラーが解決しない場合は、開発者にお問い合わせください。</p>
                        </div>
                    </div>
                </>
            );
        case 404:
            return (
                <>
                    <div className="container py-2">
                        <div className="alert alert-danger" role="alert">
                            <p>データが見つかりませんでした。</p>
                            <p className="mb-0">学籍番号が正しいかご確認ください。</p>
                        </div>
                    </div>
                </>
            );
        case 405:
            return (
                <>
                    <div className="container py-2">
                        <div className="alert alert-info" role="alert">
                            <p>正しい学籍番号を入力してください。</p>
                            <p className="mb-0">8桁入力されているかご確認ください。</p>
                        </div>
                    </div>
                </>
            );
        case 500:
            return (
                <>
                    <div className="container py-2">
                        <div className="alert alert-danger" role="alert">
                            <p>サーバーでエラーが発生しました。</p>
                            <p className="mb-0">エラーが解決しない場合は、開発者にお問い合わせください。</p>
                        </div>
                    </div>
                </>
            );
        default:
            return (
                <>
                    <div className="container py-2">
                        <div className="alert alert-danger" role="alert">
                            <p>例外が発生しました。開発者にご連絡ください。</p>
                        </div>
                    </div>
                </>
            );
    }
}
