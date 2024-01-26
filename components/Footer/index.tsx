export default function Footer() {

    function dateFormater(date: Date) {
        return date.getFullYear() + "." + (date.getMonth() + 1) + "." + date.getDate() + "." + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();
    }

    return (
        <>
            <footer className="pt-3 mt-4 text-muted border-top">
                <div>ver: 1.0.0β (build: {dateFormater(new Date())})</div>

                ※外観・仕様は開発中または改良のため、各種仕様は予告なく変更される場合があります。
            </footer>
        </>
    )
}
