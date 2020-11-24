import React from 'react';
import LenkepanelMedIkon from '../lenkepanel-med-ikon/lenkepanel-med-ikon';
import { loggAktivitet } from '../../metrics/metrics';
import EmailText from './email-text';
import { meldekortLenke } from '../../innhold/lenker';
import { AmplitudeAktivitetContext } from '../../ducks/amplitude-aktivitet-context';
import { BrukerInfoContext } from '../../ducks/bruker-info';
import { UnderOppfolgingContext } from '../../ducks/under-oppfolging';

const Meldekort = () => {
    const amplitudeAktivitetsData = React.useContext(AmplitudeAktivitetContext);
    const { erSykmeldtMedArbeidsgiver } = React.useContext(BrukerInfoContext).data;
    const { erBrukerUnderOppfolging } = React.useContext(UnderOppfolgingContext).data;

    const kanViseKomponent = !erSykmeldtMedArbeidsgiver && erBrukerUnderOppfolging;

    React.useEffect(() => {
        if (kanViseKomponent) {
            loggAktivitet({ aktivitet: 'Viser til meldekortet', ...amplitudeAktivitetsData });
        }
    }, [kanViseKomponent, amplitudeAktivitetsData]);

    if (!kanViseKomponent) {
        return null;
    }

    const overskrift = 'meldekort-overskrift';
    const ingress = 'meldekort-ingress';

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til meldekortet', ...amplitudeAktivitetsData });
    };

    return (
        <LenkepanelMedIkon
            href={meldekortLenke}
            className="meldekort"
            alt=""
            onClick={handleClick}
            overskrift={overskrift}
            ingress={ingress}
        >
            <EmailText />
        </LenkepanelMedIkon>
    );
};

export default Meldekort;
