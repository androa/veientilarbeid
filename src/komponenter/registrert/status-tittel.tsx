import { createRef, useCallback, useEffect, useState } from 'react';
import { Heading, Panel } from '@navikt/ds-react';
import { Success, SuccessColored } from '@navikt/ds-icons';

import useErInnloggetArbeidssoker from '../../hooks/useErInnloggetArbeidssoker';
import InnsynLesMer from '../innsyn/innsyn-les-mer';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';

const TEKSTER = {
    nb: {
        registrert: 'Du er registrert som arbeidssøker',
        registrertNy: 'Du er nå registrert som arbeidssøker',
    },
    en: {
        registrert: 'You are registered as job seeker',
        registrertNy: 'You are now registered as job seeker',
    },
};

const StatusTittel = () => {
    const kanViseKomponent = useErInnloggetArbeidssoker();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const containerRef = createRef<HTMLDivElement>();
    const [erNyRegistrert, settErNyRegistrert] = useState<boolean>(false);

    const scrollToRegistrering = useCallback(() => {
        const goto = new URLSearchParams(window.location.search).get('goTo');
        if (goto === 'registrering' && containerRef.current) {
            containerRef.current.scrollIntoView();
            settErNyRegistrert(true);
        }
    }, [containerRef]);

    useEffect(() => {
        scrollToRegistrering();
    }, [scrollToRegistrering]);

    if (!kanViseKomponent) {
        return null;
    }

    return (
        <div ref={containerRef}>
            <Panel>
                <div className="flex">
                    <span
                        style={{
                            marginRight: '0.5em',
                            position: 'relative',
                            top: '6px',
                            fontSize: 'var(--navds-font-size-heading-medium)',
                        }}
                    >
                        {erNyRegistrert ? <SuccessColored /> : <Success />}
                    </span>
                    <div>
                        <Heading size="medium">{tekst(erNyRegistrert ? 'registrertNy' : 'registrert')}</Heading>
                        <InnsynLesMer />
                    </div>
                </div>
            </Panel>
        </div>
    );
};

export default StatusTittel;
