import { Dialog } from '@navikt/ds-icons';
import { BodyLong, Detail, Heading, Panel, ReadMore } from '@navikt/ds-react';

import { useSprakValg } from '../../contexts/sprak';
import { useBehovForVeiledning } from '../../contexts/behov-for-veiledning';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import ReadMoreVeileder from './readmore-veileder';
import ErRendret from '../er-rendret/er-rendret';
import InViewport from '../in-viewport/in-viewport';
import { ForeslattInnsatsgruppe } from '../../contexts/brukerregistrering';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import { AktivitetsplanLenke, DialogLenke, GaaTilDialogKnapp } from './lenker';

const TEKSTER = {
    nb: {
        overskrift: 'Hjelp og støtte',
        headingEnig: 'Du ønsker å klare deg selv',
        headingUenig: 'Du har sagt at du ønsker hjelp',
        beskrivelseEnig: 'Du har ansvar for å aktivt lete etter jobber og å søke på relevante stillinger på egenhånd.',
        hvaTenkerDu: 'Hva tenker du?',
        klareDegSelv: 'Ønsker du å klare deg selv?',
        readMoreHeadingEnig: 'Gi beskjed dersom du likevel ønsker veiledning',
        readMoreInnholdEnig: 'Du kan når som helst ta kontakt for å starte samhandling med en veileder.',
    },
    en: {
        heading: 'Get in touch if you need help',
        readMoreHeading: 'What kind of help can I get?',
    },
};

function EnigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - enig - standard" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <Dialog />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('overskrift')}
                </Detail>
                <Heading className={spacingStyles.mb1} size="medium">
                    {tekst('headingEnig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>{tekst('beskrivelseEnig')}</BodyLong>
                <ReadMore size="medium" header={tekst('readMoreHeadingEnig')} className={spacingStyles.mb1}>
                    <BodyLong className={spacingStyles.mb1}>{tekst('readMoreInnholdEnig')}</BodyLong>
                    <GaaTilDialogKnapp />
                </ReadMore>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <DialogLenke aktivitet={'Behovsavklaring - svart - standard - enig - går til dialogen'} />
                </BodyLong>
                <BodyLong className={spacingStyles.mt1}>
                    <AktivitetsplanLenke
                        aktivitet={'Behovsavklaring - svart - standard - enig - går til aktivitetsplanen'}
                    />
                </BodyLong>
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - svart - enig - standard i viewport" />
        </Panel>
    );
}

function UenigMedProfilering() {
    const sprak = useSprakValg().sprak;
    const tekst = lagHentTekstForSprak(TEKSTER, sprak);

    return (
        <Panel className={`${flexStyles.flex} ${spacingStyles.px1_5}`}>
            <ErRendret loggTekst="Rendrer behovsavklaringkomponent - svart - uenig - standard" />
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                <Dialog />
            </span>
            <div className={spacingStyles.fullWidth}>
                <Detail uppercase style={{ marginTop: '-1rem' }}>
                    {tekst('overskrift')}
                </Detail>
                <Heading className={spacingStyles.blokkXs} size="medium">
                    {tekst('headingUenig')}
                </Heading>
                <BodyLong className={spacingStyles.mb1}>
                    En veileder vil ta stilling til hva slags hjelp du kan få. Du vil få et vedtaksbrev om dette.
                </BodyLong>
                <BodyLong className={spacingStyles.mb1}>
                    Om du ønsker å skrive til veilederen om det du ønsker hjelp til kan du gjøre det via dialogen.
                </BodyLong>
                <BodyLong className={spacingStyles.mb1}>
                    <GaaTilDialogKnapp />
                </BodyLong>
                <ReadMoreVeileder />
                <BodyLong className={spacingStyles.mt1}>
                    <DialogLenke aktivitet={'Behovsavklaring - svart - standard uenig - går til dialogen'} />
                </BodyLong>
                <BodyLong className={spacingStyles.mt1}>
                    <AktivitetsplanLenke
                        aktivitet={'Behovsavklaring - svart - standard - uenig - går til aktivitetsplanen'}
                    />
                </BodyLong>
            </div>
            <InViewport loggTekst="Viser behovsavklaringkomponent - svart - uenig - standard i viewport" />
        </Panel>
    );
}

function BehovsavklaringSvartStandard() {
    const { behovForVeiledning } = useBehovForVeiledning();
    return !behovForVeiledning || behovForVeiledning?.oppfolging === ForeslattInnsatsgruppe.STANDARD_INNSATS ? (
        <EnigMedProfilering />
    ) : (
        <UenigMedProfilering />
    );
}

export default BehovsavklaringSvartStandard;
