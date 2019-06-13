import * as React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';
import { Systemtittel, Normaltekst } from 'nav-frontend-typografi';
import { klikkPaSoknadDagpenger, visInfoOmDagpenger } from '../../metrics';
import { visRettTilDagPenger } from '../../utils/utils';
import './dagpenger.less';
import { dagpengerSoknadLenke } from '../../innhold/lenker';
import tekster from '../../tekster/tekster';

class Dagpenger extends React.Component<{}> {

    constructor(props: {}) {
        super(props);
    }

    componentDidMount() {
        if (visRettTilDagPenger(location.search)) {
            this.scrollTilInformasjonsmodul();
            visInfoOmDagpenger();
        }
    }

    handleButtonClick = () => {
        klikkPaSoknadDagpenger(visRettTilDagPenger(location.search));
        window.location.href = dagpengerSoknadLenke;
    }

    scrollTilInformasjonsmodul() {
        setTimeout(
            () => {
                const isSupported = 'scrollBehavior' in document.documentElement.style;
                const target = document.getElementById('informasjonsmodul');
                if (target) {
                    if (isSupported) {
                        window.scrollTo({'behavior': 'smooth', 'top': target.offsetTop});
                    } else {
                        window.scrollTo(0, target.offsetTop);
                    }
                }
            },
            400
        );
    }

    render() {
        return (
            <Panel border className="dagpenger-ramme">
                <section className="dagpenger" id="informasjonsmodul">
                    <div className="innhold">
                        <Systemtittel tag="h1" className="blokk-xs">
                            {tekster['dagpenger-tittel']}
                        </Systemtittel>
                        <Normaltekst className="blokk-m dagpenger__tekst">
                            {tekster['dagpenger-tekst']}
                        </Normaltekst>
                        <Knapp onClick={this.handleButtonClick}>
                            {tekster['dagpenger-lenke-tekst']}
                        </Knapp>
                    </div>
                </section>
            </Panel>
        );
    }
}

export default Dagpenger;
