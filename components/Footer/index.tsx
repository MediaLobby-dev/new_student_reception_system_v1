import { GrHelpBook, GrPrint } from "react-icons/gr";
import Button from '../Button';
import { printTest } from '../../src/printSystem';

import styles from './styles.module.scss'

export default function Footer() {
    return (
        <>
            <footer className="pt-3 mt-4 text-muted border-top">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-10">
                            <div>ver: {__APP_VERSION__} (build: {__BUILD_DATE__})</div>
                            ※外観・仕様は開発中または改良のため、各種仕様は予告なく変更される場合があります。
                        </div>
                        <div className="col-sm-2">
                            <div className={styles.toolBox}>
                                <Button onClick={() => { window.open("https://github.com/MediaLobby-dev/new_student_reception_system") }}>
                                    <GrHelpBook />
                                </Button>
                                <Button onClick={() => { printTest() }}>
                                    <GrPrint />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}
