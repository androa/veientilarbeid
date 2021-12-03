// import { Data as FeaturetoggleData } from '../ducks/feature-toggles';
import * as Brukerregistrering from '../contexts/brukerregistrering';
import * as Meldekort from '../contexts/meldekort';
import * as Oppfolging from '../contexts/oppfolging';
import * as BrukerInfo from '../contexts/bruker-info';
import * as FeatureToggles from '../contexts/feature-toggles';
import erStandardInnsatsgruppe from './er-standard-innsatsgruppe';
import sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe from './er-situasjonsbestemt-innsatsgruppe';
import { AmplitudeData } from '../metrics/amplitude-utils';

export function kanViseMeldekortStatus({
    meldekortData,
    brukerInfoData,
    oppfolgingData,
    registreringData,
    featuretoggleData,
}: {
    meldekortData: Meldekort.Data | null;
    brukerInfoData: BrukerInfo.Data;
    oppfolgingData: Oppfolging.Data;
    registreringData: Brukerregistrering.Data | null;
    featuretoggleData: FeatureToggles.Data;
    amplitudeData: AmplitudeData;
}): boolean {
    const meldekortliste = meldekortData?.meldekort ?? [];
    const harMeldekort = meldekortliste.length > 0;
    if (!harMeldekort) return false;

    const erAAP = brukerInfoData.rettighetsgruppe === 'AAP';
    const harDagpengerEllerArbeidssokerMeldekort =
        meldekortliste.filter((meldekort) => ['DAGP', 'ARBS'].includes(meldekort.meldegruppe ?? 'NULL')).length > 0;

    const brukerregistreringData = registreringData?.registrering ?? null;
    const erSituasjonsbestemtInnsatsgruppe = sjekkOmBrukerErSituasjonsbestemtInnsatsgruppe({
        brukerregistreringData,
        oppfolgingData,
    });

    const MeldekortintroForSituasjonsbestemtToggle =
        featuretoggleData['veientilarbeid.onboardingMeldekort.situasjonsbestemt'];

    const skalViseMeldekortintroForSituasjonsbestemt =
        erSituasjonsbestemtInnsatsgruppe && MeldekortintroForSituasjonsbestemtToggle;

    const kanViseKomponent =
        !erAAP &&
        harDagpengerEllerArbeidssokerMeldekort &&
        (erStandardInnsatsgruppe({ brukerregistreringData, oppfolgingData }) ||
            skalViseMeldekortintroForSituasjonsbestemt) &&
        !oppfolgingData.kanReaktiveres;

    return kanViseKomponent;
}
