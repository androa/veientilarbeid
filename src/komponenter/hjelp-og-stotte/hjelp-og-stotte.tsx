import { useState } from 'react';
import { Dialog } from '@navikt/ds-icons';
import { Detail, Heading, Panel, ReadMore } from '@navikt/ds-react';

import { useBrukerregistreringData } from '../../contexts/brukerregistrering';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useUnderOppfolgingData } from '../../contexts/under-oppfolging';
import { useAutentiseringData } from '../../contexts/autentisering';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import { useOppfolgingData } from '../../contexts/oppfolging';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { useUlesteDialogerData } from '../../contexts/ulestedialoger';
import { useSprakValg } from '../../contexts/sprak';

import RegistrertTeller from './registrert-teller';
import { dialogLenke } from '../../innhold/lenker';
import DialogKnapp from './dialog-knapp';
import EgenvurderingKort, { AVSLAATT_EGENVURDERING } from './egenvurderingIVURD';
import { kanViseIVURDEgenvurdering } from '../../lib/kan-vise-IVURD-egenvurdering';
import { hentFraBrowserStorage } from '../../utils/browserStorage-utils';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { loggAktivitet } from '../../metrics/metrics';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import Forklaring from './forklaring';

const TEKSTER = {
    nb: {
        heading: 'Om du ønsker hjelp fra oss må du gi beskjed',
        readMoreHeading: 'Hva slags hjelp kan jeg få?',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'Do you agree with how NAV has assessed your need for help and support?',
    },
};

function HjelpOgStotte() {
    const [clickedLesMer, setClickedLesMer] = useState(false);
    const amplitudeData = useAmplitudeData();
    const { ukerRegistrert } = amplitudeData;

    const registreringData = useBrukerregistreringData();
    const featuretoggleData = useFeatureToggleData();
    const underOppfolgingData = useUnderOppfolgingData();
    const autentiseringData = useAutentiseringData();
    const egenvurderingData = useEgenvurderingData();
    const oppfolgingData = useOppfolgingData();

    const { antallUleste } = useUlesteDialogerData();

    const brukNyKomponent = featuretoggleData['veientilarbeid.ny-standardvisning'];

    const registrertDato = registreringData?.registrering?.opprettetDato;

    const featuretoggleEgenvurderingAktivert =
        featuretoggleData && featuretoggleData['veientilarbeid.vis-egenvurdering-med-14a'];

    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    const handleClickLesMer = () => {
        if (!clickedLesMer) {
            loggAktivitet({ aktivitet: 'Åpner forklaringen for hjelp og støtte', ...amplitudeData });
            setClickedLesMer(true);
        }
    };

    if (!brukNyKomponent) return null;

    const EgenVurderingMedLesLink = () => {
        return <EgenvurderingKort />;
    };

    const skalViseEgenvurdering = kanViseIVURDEgenvurdering({
        underOppfolgingData,
        registreringData,
        autentiseringData,
        egenvurderingData,
        oppfolgingData,
    });
    const harAvslattEgenvurdering = hentFraBrowserStorage(AVSLAATT_EGENVURDERING);

    const skalViseEgenvurderingIVURD =
        featuretoggleEgenvurderingAktivert && skalViseEgenvurdering && !harAvslattEgenvurdering;

    const DefaultInnhold = () => {
        return (
            <>
                <Heading className={'blokk-xs'} size="medium">
                    {tekst('heading')}
                </Heading>
                <RegistrertTeller ukerRegistrert={ukerRegistrert} registrertDato={registrertDato} />
                <DialogKnapp amplitudeData={amplitudeData} href={dialogLenke} antallUlesteDialoger={antallUleste} />
            </>
        );
    };

    return (
        <Panel className="flex px-1_5">
            <ErRendret loggTekst="Rendrer hjelp og støtte-komponent" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Dialog />
            </span>
            <div className="full-width">
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    Hjelp og støtte
                </Detail>
                {skalViseEgenvurderingIVURD ? <EgenVurderingMedLesLink /> : <DefaultInnhold />}
                <ReadMore size="medium" header={tekst('readMoreHeading')} onClick={handleClickLesMer}>
                    <Forklaring />
                </ReadMore>
            </div>
            <InViewport loggTekst="Viser hjelp og støtte-komponent i viewport" />
        </Panel>
    );
}

export default HjelpOgStotte;
