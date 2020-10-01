import * as React from 'react';
import Lenke from 'nav-frontend-lenker';
import Panel from 'nav-frontend-paneler';
import { Normaltekst, Systemtittel } from 'nav-frontend-typografi';
import { uniLogger } from '../../metrics/uni-logger';
import { loggAktivitet } from '../../metrics/metrics';
import './melding.less';
import { AmplitudeAktivitetsProps } from '../../metrics/amplitude-utils';

const TrekkDagpengeSoknad = (props: AmplitudeAktivitetsProps) => {
    const { amplitudeAktivitetsData } = props;

    const handleClick = () => {
        uniLogger('trekk-dp-soknad.click');
        loggAktivitet({ aktivitet: 'Går til trekk dagpengesøknad', ...amplitudeAktivitetsData });
    }
    
    return (
        <div className="wrapper">
            <Panel border className="ramme blokk-s">
                <section className="paminnelse">
                    <div className="innhold">
                        <Systemtittel tag="h2" className="blokk-xs">
                            Trekk dagpengesøknaden
                        </Systemtittel>
                        <Normaltekst className="blokk-xs">
                            Har det skjedd endringer som gjør at du ønsker å trekke dagpengesøknaden?
                        </Normaltekst>
                        <Normaltekst className="blokk-xs">
                            Du kan kontakte oss skriftlig og oppgi grunn for at du ønsker å trekke søknaden, så vil vi hjelpe deg.
                        </Normaltekst>
                        <Normaltekst className="blokk-xs">
                            Ønsker du senere likevel å søke dagpenger må du da sende inn en ny søknad.
                        </Normaltekst>
                        <Normaltekst className="blokk-m">
                            Du kan tidligst få utbetalt dagpenger fra den dagen du sender ny søknad.
                        </Normaltekst>
                        <Lenke href="https://tjenester.nav.no/mininnboks/sporsmal/skriv/ARBD" onClick={handleClick} target='_blank'>Jeg ønsker å trekke søknaden min</Lenke>
                    </div>
                </section>
            </Panel>
        </div>
    );
}

export default TrekkDagpengeSoknad;

