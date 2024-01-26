export default function Footer() {

    return (
        <>
            <footer className="pt-3 mt-4 text-muted border-top">
                <div>ver: {__APP_VERSION__} (build: {__BUILD_DATE__})</div>

                ※外観・仕様は開発中または改良のため、各種仕様は予告なく変更される場合があります。
            </footer>
        </>
    )
}
