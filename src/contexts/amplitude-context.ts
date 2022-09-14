import { createContext, useContext } from 'react';
import { AmplitudeData } from '../metrics/amplitude-utils';
import { InnloggingsNiva } from './autentisering';
import { DinSituasjonSvar } from './brukerregistrering';

export const initialState: AmplitudeData = {
    brukergruppe: 'ukjent',
    geografiskTilknytning: 'INGEN_VERDI',
    ukerRegistrert: 'INGEN_DATO',
    dagerRegistrert: 'INGEN_DATO',
    nivaa: InnloggingsNiva.LEVEL_3,
    kanReaktiveres: 'nei',
    formidlingsgruppe: 'INGEN_VERDI',
    servicegruppe: 'IVURD',
    foreslattInnsatsgruppe: 'INGEN_VERDI',
    rettighetsgruppe: 'INGEN_VERDI',
    registreringType: 'INGEN_VERDI',
    underOppfolging: 'nei',
    gitVersion: 'INGEN_VERDI',
    buildTimestamp: new Date().toISOString(),
    erSykmeldtMedArbeidsgiver: 'ukjent',
    dinSituasjon: DinSituasjonSvar.INGEN_VERDI,
    reservasjonKRR: 'ukjent',
    aktiveFeatureToggles: [],
    sprakValgFraCookie: 'IKKE_VALGT',
    harAktivArbeidssokerperiode: 'INGEN_DATA',
    antallDagerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
    antallUkerSidenSisteArbeidssokerperiode: 'INGEN_DATA',
    antallUkerMellomSisteArbeidssokerperioder: 'INGEN_DATA',
};

const AmplitudeContext = createContext<AmplitudeData>(initialState);

function useAmplitudeData() {
    const context = useContext(AmplitudeContext);
    if (context === undefined) {
        throw new Error('useAmplitudeData må brukes under en AmplitudeProvider');
    }
    return context;
}

export { AmplitudeContext, useAmplitudeData };
