import styles from './innhold.module.css';
import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import BekreftReaktivering from '../komponenter/reaktivering/bekreft-reaktivering';
import DagpengerOgYtelser from '../komponenter/dagpenger/dagpenger-og-ytelser';
import Meldekort from '../komponenter/meldekort/meldekort';

const InnholdAutomatiskReaktivert = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="AiA i viewport" />
            <div className={styles.limit}>
                <BekreftReaktivering />
                <DagpengerOgYtelser />
                <Meldekort />
            </div>
            <InViewport loggTekst="AiA i viewport - bunnen" />
        </>
    );
};

export default InnholdAutomatiskReaktivert;
