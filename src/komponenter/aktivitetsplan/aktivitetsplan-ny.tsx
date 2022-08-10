import { BodyLong, Heading, Link, Panel } from '@navikt/ds-react';

import { loggAktivitet } from '../../metrics/metrics';
import { aktivitetsplanLenke } from '../../innhold/lenker';
import { useAmplitudeData } from '../../contexts/amplitude-context';
import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import { Task } from '@navikt/ds-icons';
import { useFeatureToggleData } from '../../contexts/feature-toggles';

const TEKSTER = {
    nb: {
        'aktivitetsplan.overskrift': 'Aktivitetsplanen din',
        'aktivitetsplan.bruke': 'Du kan bruke',
        'aktivitetsplan.lenketekst': 'aktivitetsplanen',
        'aktivitetsplan.holde-orden': 'til å holde orden på aktiviteter du gjør i samarbeid med NAV',
    },
    en: {
        'aktivitetsplan.overskrift': 'Your planned activities',
        'aktivitetsplan.bruke': 'You can use',
        'aktivitetsplan.lenketekst': 'your planned activities',
        'aktivitetsplan.holde-orden': 'to track activities you do in collaboration with NAV',
    },
};
const Aktivitetsplan = () => {
    const amplitudeData = useAmplitudeData();
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const featuretoggleData = useFeatureToggleData();

    const handleClick = () => {
        loggAktivitet({ aktivitet: 'Går til aktivitetsplanen', ...amplitudeData });
    };

    if (!featuretoggleData['veientilarbeid.ny-standardvisning']) return null;

    return (
        <Panel className="flex pb-2">
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--navds-font-size-heading-medium)',
                }}
            >
                <Task />
            </span>
            <div>
                <Heading size="medium">{tekst('aktivitetsplan.overskrift')}</Heading>
                <BodyLong>
                    {tekst('aktivitetsplan.bruke')}{' '}
                    <Link href={aktivitetsplanLenke} onClick={() => handleClick()}>
                        {tekst('aktivitetsplan.lenketekst')}
                    </Link>{' '}
                    {tekst('aktivitetsplan.holde-orden')}
                </BodyLong>
            </div>
        </Panel>
    );
};

export default Aktivitetsplan;
