import { BodyLong, Button, Heading, Panel } from '@navikt/ds-react';
import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { Success } from '@navikt/ds-icons';

const BekreftReaktivering = () => {
    return (
        <Panel className={`${spacingStyles.px1_5}`}>
            <div className={flexStyles.flex}>
                <span
                    style={{
                        marginRight: '0.5em',
                        position: 'relative',
                        top: '6px',
                        fontSize: 'var(--a-font-size-heading-medium)',
                    }}
                >
                    <Success />
                </span>
                <div className={spacingStyles.fullWidth}>
                    <Heading size="small" className={spacingStyles.mb1}>
                        Du er nå registrert som arbeidssøker på nytt
                    </Heading>
                    <BodyLong className={spacingStyles.mb1}>
                        Du sendte inn meldekortet for sent (for perioden) og ble derfor inaktivert som arbeidssøker.
                    </BodyLong>
                    <BodyLong className={spacingStyles.mb1}>
                        På siste innsendte meldekort sa du at du ønsket å være registrert, så du er derfor blitt
                        registrert på nytt.
                    </BodyLong>
                    <BodyLong className={spacingStyles.mb1}>
                        Er dette riktig at du fortsatt ønsker å være registrert?
                    </BodyLong>
                    <div className={spacingStyles.mb1}>
                        <Button variant={'primary'}>Ja, jeg ønsker å være registrert</Button>
                    </div>
                    <div className={spacingStyles.mb1}>
                        <Button variant={'secondary'}>Nei, jeg ønsker ikke å være registrert</Button>
                    </div>
                    <div>
                        <Button variant={'tertiary'}>Vet ikke</Button>
                    </div>
                </div>
            </div>
        </Panel>
    );
};

export default BekreftReaktivering;
