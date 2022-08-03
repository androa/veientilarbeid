import './innhold.css';
import Rad from './rad';
import ReaktiveringKort from '../komponenter/reaktivering/reaktivering-kort';
import Egenvurdering from '../komponenter/egenvurdering/egenvurdering';
import Motestotte from '../komponenter/motestotte/motestotte';
import KrrMelding from '../komponenter/krr-melding/krr-melding';
import Registrert from '../komponenter/registrert/registrert';
import AktivitetDialogMeldekort from './aktivitet-dialog-meldekort';
import InnholdMetrics from './innhold-metrics';
import InViewport from '../komponenter/in-viewport/in-viewport';
import StatusTittel from '../komponenter/registrert/status-tittel';
import ReaktiveringKvittering from '../komponenter/reaktivering/reaktivering-kvittering';

const InnholdView = () => {
    return (
        <>
            <InnholdMetrics />
            <InViewport loggTekst="Veien til arbeid i viewport" />
            <Rad>
                <ReaktiveringKort />
                <KrrMelding />
                <StatusTittel />
                <ReaktiveringKvittering />
                <Registrert />
                <Egenvurdering />
                <Motestotte />
                <AktivitetDialogMeldekort />
            </Rad>
            <InViewport loggTekst="Bunnen av veien til arbeid - andre i viewport" />
        </>
    );
};

export default InnholdView;
