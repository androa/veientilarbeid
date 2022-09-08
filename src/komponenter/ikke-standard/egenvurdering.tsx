import { BodyShort, Button, Heading, Panel } from '@navikt/ds-react';

import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useAutentiseringData } from '../../contexts/autentisering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import { useSprakValg } from '../../contexts/sprak';

import { loggAktivitet } from '../../metrics/metrics';
import { behovsvurderingLenke } from '../../innhold/lenker';
import { kanViseIVURDEgenvurdering } from '../../lib/kan-vise-IVURD-egenvurdering';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useArbeidssoker } from '../../contexts/arbeidssoker';

const TEKSTER: Tekster<string> = {
    nb: {
        tittel: 'Hva trenger du for å komme i jobb?',
        'lenke-tekst': 'SVAR HER',
        innhold:
            'Du har krav på en skriftlig vurdering av behovet ditt for hjelp fra NAV. Derfor vil vi vite hva du selv mener.',
    },
};

const Egenvurdering = () => {
    const amplitudeData = useAmplitudeData();
    const registreringData = useBrukerregistreringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const arbeidssokerData = useArbeidssoker();
    const underOppfolging = arbeidssokerData?.underoppfolging.underoppfolging;
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    const skalViseEgenvurderingLenke = kanViseIVURDEgenvurdering({
        underOppfolging,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });

    const handleButtonClick = () => {
        loggAktivitet({ aktivitet: 'Går til egenvurdering', ...amplitudeData });
        window.location.assign(behovsvurderingLenke);
    };

    if (!skalViseEgenvurderingLenke) {
        return null;
    }

    return (
        <Panel border className="blokk-s">
            <Heading level="2" size="medium" className="blokk-xs">
                {tekst('tittel')}
            </Heading>
            <BodyShort className="blokk-s">{tekst('innhold')}</BodyShort>
            <Button variant="primary" onClick={handleButtonClick} className="blokk-xs">
                {tekst('lenke-tekst')}
            </Button>
        </Panel>
    );
};

export default Egenvurdering;
