export default function Footer() {
    return (
        <>
            <footer className="pt-3 mt-4 text-muted border-top">
                ver: {import.meta.env.VITE_VER} (build: {import.meta.env.VITE_BUILD_DATE})
            </footer>
        </>
    )
}
