import { BodyShort, Heading, Link } from '@navikt/ds-react';
import { useContext } from 'react';
import { OppfolgingContext, Servicegruppe } from '../../contexts/oppfolging';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import Feedback from '../feedback/feedback';

function Kort1() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="xsmall">Hva slags hjelp kan jeg få?</Heading>
                <BodyShort className={'blokk-xs'}>
                    Vi har gjort en vurdering av svarene dine, og vi tror at du har gode muligheter til å skaffe deg
                    jobb på egenhånd.
                </BodyShort>

                <BodyShort>Vår vurdering er basert på:</BodyShort>
                <ul>
                    <li>dine svar fra registreringen</li>
                    <li>opplysningene NAV har om din situasjon</li>
                </ul>
            </div>
        </div>
    );
}

function Kort2() {
    const { servicegruppe } = useContext(OppfolgingContext).data;
    const amplitudeData = useAmplitudeData();

    const handleLesBrev = () => {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling: 'Går til min innboks',
            ...amplitudeData,
        });
    };

    const tittel = servicegruppe === Servicegruppe.IKVAL ? 'Du har mottatt et brev' : 'Du vil motta et brev';

    return (
        <div className="kortflate">
            <div>
                <Heading size="xsmall">{tittel}</Heading>
                <BodyShort className={'blokk-xs'}>
                    {servicegruppe === Servicegruppe.IKVAL ? (
                        <>
                            <Link onClick={handleLesBrev} href={'https://mininnboks.nav.no/'}>
                                Brevet
                            </Link>{' '}
                            inneholder vår vurdering av dine muligheter til å skaffe deg jobb på egenhånd.
                        </>
                    ) : (
                        'Brevet inneholder vår vurdering av dine muligheter til å skaffe deg jobb på egenhånd.'
                    )}
                </BodyShort>

                <BodyShort className={'blokk-m'}>
                    Dette brevet er ikke et svar på en eventuell søknad om dagpenger.
                </BodyShort>
            </div>
        </div>
    );
}

function Kort3() {
    const amplitudeData = useAmplitudeData();

    function loggLenkeKlikk(handling: string, url: string) {
        amplitudeLogger('veientilarbeid.intro', {
            intro: '14a',
            handling,
            ...amplitudeData,
        });
        window.location.assign(url);
    }

    return (
        <div className="kortflate">
            <div>
                <Heading size="xsmall">Hva er en veileder?</Heading>
                <BodyShort className={'blokk-xs'}>
                    Veilederens oppgave er å besvare spørsmål, bistå deg med å søke stillinger og tilby deg hjelp på
                    veien til arbeid.
                </BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Veilederne kan <strong>ikke</strong> svare på spørsmål om søknad om dagpenger, behandling av
                    dagpengesøknaden eller utbetaling av dagpenger.
                </BodyShort>

                <BodyShort className={'blokk-m'}>
                    Dersom du lurer på noe om dagpenger ber vi deg bruke{' '}
                    <Link
                        href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til STO fra 14a onboarding kort',
                                'https://mininnboks.nav.no/sporsmal/skriv/ARBD'
                            )
                        }
                    >
                        skriv til oss
                    </Link>{' '}
                    eller{' '}
                    <Link
                        href="https://www.nav.no/person/kontakt-oss/chat/"
                        onClick={() =>
                            loggLenkeKlikk(
                                'Går til Chat fra 14a onboarding kort',
                                'https://www.nav.no/person/kontakt-oss/chat/'
                            )
                        }
                    >
                        chat
                    </Link>
                    .
                </BodyShort>
            </div>
        </div>
    );
}

function Kort4() {
    return (
        <div className="kortflate">
            <div>
                <Heading size="xsmall">Ta kontakt om du trenger hjelp</Heading>
                <BodyShort className={'blokk-xs'}>Du kan få hjelp fra en veileder.</BodyShort>

                <BodyShort className={'blokk-xs'}>
                    Du kan når som helst kontakte oss ved å bruke dialogløsningen ovenfor.
                </BodyShort>
            </div>
        </div>
    );
}

function ForklaringNorsk() {
    return (
        <>
            <Kort1 />
            <Kort2 />
            <Kort3 />
            <Kort4 />
            <Feedback id={'hjelp-og-stotte-forklaring'} className="mt-2" />
        </>
    );
}

export default ForklaringNorsk;
