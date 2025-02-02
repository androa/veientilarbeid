import { BodyLong, Heading, Link, Panel } from '@navikt/ds-react';
import { Bandage, Dialog, Email, Laptop, Task } from '@navikt/ds-icons';

import { useAmplitudeData } from '../hent-initial-data/amplitude-provider';
import { useBrukerinfoData } from '../../contexts/bruker-info';
import { useEgenvurderingData } from '../../contexts/egenvurdering';
import { useSprakValg } from '../../contexts/sprak';
import { useArbeidssokerPerioder } from '../../contexts/arbeidssoker';

import lagHentTekstForSprak from '../../lib/lag-hent-tekst-for-sprak';
import { aktivitetsplanLenke, dialogLenke, omMeldekortLenke, sykefravaerLenke } from '../../innhold/lenker';
import { loggAktivitet } from '../../metrics/metrics';
import Behovsavklaring from '../behovsavklaring-oppfolging/behovsavklaring-oppfolging';
import Egenvurdering from '../situasjonsbestemt/egenvurdering';
import beregnArbeidssokerperioder from '../../lib/beregn-arbeidssokerperioder';

import spacingStyles from '../../spacing.module.css';
import flexStyles from '../../flex.module.css';
import styles from './situasjonsbestemt.module.css';

const TEKSTER = {
    nb: {
        'aktivitetsplan.overskrift': 'Aktivitetsplanen din',
        'aktivitetsplan.bruke': 'Du kan bruke',
        'aktivitetsplan.lenketekst': 'aktivitetsplanen',
        'aktivitetsplan.holde-orden': 'til å holde orden på aktiviteter du gjør i samarbeid med NAV',
        'meldekort.overskrift': 'Meldekort',
        'meldekort.ingress': 'Send inn, endre og se innsendte meldekort',
        'sykefravaer.overskrift': 'Ditt sykefravær',
        'sykefravaer.ingress': 'Se sykemeldingene dine og annen informasjon om sykefraværet ditt',
        'dialog.overskrift': 'Dialog',
        'dialog.ingress': 'Gå til dialog',
        'sporsmal.overskrift': 'Har du spørsmål om å søke eller motta pengestøtte?',
        sporsmal: 'Har du spørsmål om ytelser må du bruke',
        skrivTilOss: 'skriv til oss',
        eller: 'eller',
        chat: 'chat',
        'les-om-hjelp': 'Du kan lese om hva NAV kan hjelpe deg med på forsiden av',
        'ny-fane': 'åpner i ny fane',
    },
    en: {
        'aktivitetsplan.overskrift': 'Your planned activities',
        'aktivitetsplan.bruke': 'You can use',
        'aktivitetsplan.lenketekst': 'your planned activities',
        'aktivitetsplan.holde-orden': 'to track activities you do in collaboration with NAV',
        'meldekort.overskrift': 'Employment status form',
        'meldekort.ingress': 'Submit, edit and see your employment status forms',
        'sykefravaer.overskrift': 'Your sick leave',
        'sykefravaer.ingress': 'See information about your sick leave',
        'dialog.overskrift': 'Dialogue',
        'dialog.ingress': 'Go to the dialogue app',
        'sporsmal.overskrift': 'Do you have questions about applying for or receiving financial support?',
        sporsmal: 'You can ask questions about benefits via',
        skrivTilOss: 'write to us',
        eller: 'or',
        chat: 'chat',
        'les-om-hjelp': 'You can read about situations in which NAV can help on',
        'ny-fane': 'opens in new tab',
    },
};

export const ListeElement = (ikon: JSX.Element, innhold: JSX.Element) => {
    return (
        <li className={`${flexStyles.flex} ${spacingStyles.mb2}`}>
            <span
                style={{
                    marginRight: '0.5em',
                    position: 'relative',
                    top: '6px',
                    fontSize: 'var(--a-font-size-heading-medium)',
                }}
            >
                {ikon}
            </span>
            <div>{innhold}</div>
        </li>
    );
};

function Situasjonsbestemt() {
    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);
    const { amplitudeData } = useAmplitudeData();
    const { erSykmeldtMedArbeidsgiver } = useBrukerinfoData();
    const egenvurderingData = useEgenvurderingData();
    const arbeidssokerperioderData = useArbeidssokerPerioder();
    const harEgenvurderingbesvarelse = egenvurderingData !== null;
    const { harAktivArbeidssokerperiode, aktivPeriodeStart } = beregnArbeidssokerperioder(arbeidssokerperioderData);
    const harSistSvartDato =
        harEgenvurderingbesvarelse && egenvurderingData.sistOppdatert
            ? new Date(egenvurderingData.sistOppdatert)
            : null;
    const harPeriodeStart = harAktivArbeidssokerperiode === 'Ja' ? new Date(aktivPeriodeStart) : null;
    const harGyldigEgenvurderingsbesvarelse = harSistSvartDato && harPeriodeStart && harSistSvartDato > harPeriodeStart;

    const visBehovsAvklaring = !harGyldigEgenvurderingsbesvarelse;

    const handleClick = (action: string) => {
        loggAktivitet({ aktivitet: action, ...amplitudeData });
    };

    const Meldekort = () => {
        return ListeElement(
            <Email />,
            <div>
                <Heading size="medium">{tekst('meldekort.overskrift')}</Heading>
                <BodyLong>
                    <Link href={omMeldekortLenke} onClick={() => handleClick('Går til meldekortet fra ikke-standard')}>
                        {tekst('meldekort.ingress')}
                    </Link>{' '}
                </BodyLong>
            </div>
        );
    };

    const DittSykefravaer = () => {
        return ListeElement(
            <Bandage />,
            <div>
                <Heading size="medium">{tekst('sykefravaer.overskrift')}</Heading>
                <BodyLong>
                    <Link
                        href={sykefravaerLenke}
                        onClick={() => handleClick('Går til ditt sykefravær fra ikke-standard')}
                    >
                        {tekst('sykefravaer.ingress')}
                    </Link>
                </BodyLong>
            </div>
        );
    };

    const DialogPanel = () => {
        return ListeElement(
            <Dialog />,
            <div>
                <Heading size="medium">{tekst('dialog.overskrift')}</Heading>
                <Link href={dialogLenke} onClick={() => handleClick('Går til dialogen fra ikke-standard')}>
                    {tekst('dialog.ingress')}
                </Link>{' '}
            </div>
        );
    };

    return (
        <>
            <Panel className={`${styles.mtn1} ${spacingStyles.mb1}`}>
                <ul className={styles.ikkeStandardListe}>
                    {visBehovsAvklaring ? <Behovsavklaring /> : <DialogPanel />}
                    {!visBehovsAvklaring &&
                        ListeElement(
                            <Task />,
                            <div>
                                <Heading size="medium">{tekst('aktivitetsplan.overskrift')}</Heading>
                                <BodyLong>
                                    {tekst('aktivitetsplan.bruke')}{' '}
                                    <Link
                                        href={aktivitetsplanLenke}
                                        onClick={() => handleClick('Går til aktivitetsplanen fra situasjonsbestemt')}
                                    >
                                        {tekst('aktivitetsplan.lenketekst')}
                                    </Link>{' '}
                                    {tekst('aktivitetsplan.holde-orden')}
                                </BodyLong>
                            </div>
                        )}
                    {erSykmeldtMedArbeidsgiver ? <DittSykefravaer /> : <Meldekort />}
                    {ListeElement(
                        <Laptop />,
                        <div>
                            <Heading size="medium">{tekst('sporsmal.overskrift')}</Heading>
                            <BodyLong>
                                {tekst('sporsmal')}{' '}
                                <Link
                                    href="https://mininnboks.nav.no/sporsmal/skriv/ARBD"
                                    onClick={() => handleClick(`Går til STO fra situasjonsbestemt`)}
                                >
                                    {tekst('skrivTilOss')}
                                </Link>{' '}
                                {tekst('eller')}{' '}
                                <Link
                                    href="https://www.nav.no/person/kontakt-oss/chat/"
                                    onClick={() => handleClick(`Går til chat fra fra situasjonsbestemt`)}
                                >
                                    {tekst('chat')}
                                </Link>
                                {'. '}
                                {tekst('les-om-hjelp')}{' '}
                                <Link
                                    href={'https://www.nav.no'}
                                    target="_blank"
                                    onClick={() => handleClick('Går til nav.no fra fra situasjonsbestemt')}
                                >
                                    nav.no ({tekst('ny-fane')})
                                </Link>
                                .
                            </BodyLong>
                        </div>
                    )}
                </ul>
            </Panel>
            {!visBehovsAvklaring && <Egenvurdering />}
        </>
    );
}

export default Situasjonsbestemt;
