import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import Panel from 'nav-frontend-paneler';
import { Nesteknapp, Tilbakeknapp } from 'nav-frontend-ikonknapper';
import { AmplitudeContext } from '../../ducks/amplitude-context';
import * as Brukerregistrering from '../../ducks/brukerregistrering';
import * as Meldekort from '../../ducks/meldekort';
import * as Oppfolging from '../../ducks/oppfolging';
import * as BrukerInfo from '../../ducks/bruker-info';
import { FeaturetoggleContext } from '../../ducks/feature-toggles';
import { AmplitudeData, amplitudeLogger } from '../../metrics/amplitude-utils';
import './meldekort-intro.less';
import { fjernFraBrowserStorage, hentFraBrowserStorage, settIBrowserStorage } from '../../utils/browserStorage-utils';

import { StandardStartkort, StandardKortliste } from './standard';
import { SituasjonsbestemtStartkort, SituasjonsbestemtKortliste } from './situasjonsbestemt';
import Sluttkort from './Sluttkort';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from '../../lib/er-situasjonsbestemt-innsatsgruppe';
import { kanViseMeldekortStatus } from '../../lib/kan-vise-meldekort-status';

const MELDEKORT_INTRO_KEY = 'meldekortintro';

interface MeldekortIntroProps {
    amplitudeData: AmplitudeData;
    ferdigMedIntroCB: () => void;
    hoppOverPreState: boolean;
}

function MeldekortIntro(props: MeldekortIntroProps) {
    const startkort = props.hoppOverPreState ? 1 : 0;
    const [gjeldendeKortIndex, setGjeldendeKortIndex] = useState(startkort);
    const forrigeKortRef = useRef(gjeldendeKortIndex);
    const nesteknappIntro = props.amplitudeData.eksperimenter.includes('nesteknappIntro');

    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const brukerregistreringData = registreringData?.registrering ?? null;

    const onboardingForSituasjonsbestemtToggle = featuretoggleData['veientilarbeid.meldekort-intro.situasjonsbestemt'];
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });
    const skalViseOnboardingForSituasjonsbestemt =
        onboardingForSituasjonsbestemtToggle && erSituasjonsbestemtInnsatsgruppe;

    const introKort = skalViseOnboardingForSituasjonsbestemt
        ? [
              <SituasjonsbestemtStartkort startIntroCB={nesteKort} hoppOverIntroCB={hoppOverIntro} />,
              ...SituasjonsbestemtKortliste,
          ]
        : [<StandardStartkort startIntroCB={nesteKort} hoppOverIntroCB={hoppOverIntro} />, ...StandardKortliste];
    function nesteKort() {
        if (gjeldendeKortIndex < introKort.length - 1) {
            setGjeldendeKortIndex(gjeldendeKortIndex + 1);
        }
    }

    const forrigeKort = () => {
        if (gjeldendeKortIndex > 0) {
            setGjeldendeKortIndex(gjeldendeKortIndex - 1);
        }
    };
    const avsluttIntro = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: 'meldekort',
            handling: 'Fullfører introduksjon',
            ...props.amplitudeData,
        });
        props.ferdigMedIntroCB();
    };

    function hoppOverIntro() {
        amplitudeLogger('veientilarbeid.intro', {
            intro: 'meldekort',
            handling: 'Hopper over introduksjon',
            ...props.amplitudeData,
        });
        props.ferdigMedIntroCB();
    }

    useEffect(() => {
        if (forrigeKortRef.current !== gjeldendeKortIndex) {
            const handling =
                forrigeKortRef.current === 0
                    ? `Starter meldekortintroduksjonen`
                    : `Går fra ${forrigeKortRef.current} til kort ${gjeldendeKortIndex}`;
            amplitudeLogger('veientilarbeid.intro', {
                intro: 'meldekort',
                handling,
                ...props.amplitudeData,
            });
            forrigeKortRef.current = gjeldendeKortIndex;
        }
    }, [gjeldendeKortIndex, props.amplitudeData]);

    return (
        <>
            <div className={'kortwrapper'}>
                <div className={'kortinnhold'}>{introKort[gjeldendeKortIndex]}</div>
            </div>
            {gjeldendeKortIndex !== 0 ? (
                <div className={'knapper'}>
                    <Tilbakeknapp mini disabled={gjeldendeKortIndex === 1} onClick={forrigeKort}>
                        Forrige
                    </Tilbakeknapp>
                    {gjeldendeKortIndex !== introKort.length - 1 ? (
                        <Nesteknapp mini onClick={nesteKort}>
                            {' '}
                            Neste{' '}
                        </Nesteknapp>
                    ) : (
                        <Nesteknapp mini onClick={avsluttIntro}>
                            {nesteknappIntro ? 'Neste' : 'Fullfør'}
                        </Nesteknapp>
                    )}
                </div>
            ) : null}
        </>
    );
}

function MeldekortIntroWrapper() {
    const amplitudeData = React.useContext(AmplitudeContext);
    const { data: meldekortData } = React.useContext(Meldekort.MeldekortContext);
    const { data: registreringData } = React.useContext(Brukerregistrering.BrukerregistreringContext);
    const { data: oppfolgingData } = React.useContext(Oppfolging.OppfolgingContext);
    const { data: brukerInfoData } = React.useContext(BrukerInfo.BrukerInfoContext);

    const [harSettIntro, setHarSettIntro] = React.useState<boolean>(!!hentFraBrowserStorage(MELDEKORT_INTRO_KEY));
    const [tvingVisningAvIntro, setTvingVisningAvIntro] = React.useState<boolean>(false);

    const erNyregistrert = amplitudeData.ukerRegistrert === 0;
    const rendreIntro = tvingVisningAvIntro || (erNyregistrert && !harSettIntro);
    const hoppOverPreState = harSettIntro || tvingVisningAvIntro;

    const { data: featuretoggleData } = React.useContext(FeaturetoggleContext);

    useEffect(() => {
        if (harSettIntro) {
            settIBrowserStorage(MELDEKORT_INTRO_KEY, 'true');
        } else {
            fjernFraBrowserStorage(MELDEKORT_INTRO_KEY);
        }
    }, [harSettIntro]);

    if (
        !kanViseMeldekortStatus({ meldekortData, oppfolgingData, brukerInfoData, registreringData, featuretoggleData })
    ) {
        fjernFraBrowserStorage(MELDEKORT_INTRO_KEY);
        return null;
    }

    const ferdigMedIntroCB = () => {
        setHarSettIntro(true);
        setTvingVisningAvIntro(false);
    };
    const lesIntroPaaNyttCB = () => {
        setTvingVisningAvIntro(true);
    };

    return (
        <div className={'meldekort-intro-omslutning'}>
            <Panel className={'meldekort-intro'} border>
                <div className={'overall-wrapper'}>
                    {rendreIntro ? (
                        <MeldekortIntro
                            hoppOverPreState={hoppOverPreState}
                            ferdigMedIntroCB={ferdigMedIntroCB}
                            amplitudeData={amplitudeData}
                        />
                    ) : (
                        <Sluttkort
                            amplitudeData={amplitudeData}
                            meldekortData={meldekortData}
                            lesIntroPaaNyttCB={lesIntroPaaNyttCB}
                        />
                    )}
                </div>
            </Panel>
        </div>
    );
}

export default MeldekortIntroWrapper;