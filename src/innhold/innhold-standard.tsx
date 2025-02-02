import { useEgenvurderingData } from '../contexts/egenvurdering';
import { useArbeidssokerPerioder } from '../contexts/arbeidssoker';

import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import RegistrertTittel from '../komponenter/registrert-tittel/registrert-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';
import GjelderFraDato from '../komponenter/gjelder-fra-dato/GjelderFraDato';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';
import HjelpOgStotte from '../komponenter/hjelp-og-stotte/hjelp-og-stotte';
import Aktivitetsplan from '../komponenter/aktivitetsplan/aktivitetsplan';
import KvitteringEgenvurdering from '../komponenter/kvitteringer/kvittering-egenvurdering';
import Behovsavklaring from '../komponenter/behovsavklaring-oppfolging/behovsavklaring-oppfolging';
import beregnArbeidssokerperioder from '../lib/beregn-arbeidssokerperioder';

import styles from './innhold.module.css';

const InnholdStandard = () => {
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const egenvurderingData = useEgenvurderingData();
    const harEgenvurderingbesvarelse = egenvurderingData !== null;
    const { harAktivArbeidssokerperiode, aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const harSistSvartDato =
        harEgenvurderingbesvarelse && egenvurderingData.sistOppdatert
            ? new Date(egenvurderingData.sistOppdatert)
            : null;
    const harPeriodeStart = harAktivArbeidssokerperiode === 'Ja' ? new Date(aktivPeriodeStart) : null;
    const harGyldigEgenvurderingsbesvarelse = harSistSvartDato && harPeriodeStart && harSistSvartDato > harPeriodeStart;

    const visBehovsAvklaring = !harGyldigEgenvurderingsbesvarelse;

    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="AiA i viewport" />
            <div className={styles.limit}>
                <ReaktiveringKvittering />
                <KvitteringEgenvurdering />
                <RegistrertTittel />
                {visBehovsAvklaring ? <Behovsavklaring /> : <HjelpOgStotte />}
                <DagpengerOgYtelser />
                <Meldekort />
                {visBehovsAvklaring ? null : <Aktivitetsplan />}
                <GjelderFraDato />
            </div>
            <InViewport loggTekst="AiA i viewport - bunnen" />
        </>
    );
};

export default InnholdStandard;
