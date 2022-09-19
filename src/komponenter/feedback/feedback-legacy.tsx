import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { BodyShort, Detail, Popover } from '@navikt/ds-react';

import { useAmplitudeData } from '../../contexts/amplitude-context';
import { amplitudeLogger } from '../../metrics/amplitude-utils';
import { useFeatureToggleData } from '../../contexts/feature-toggles';
import { useBrowserStorage } from '../../hooks/use-browserstorage';
import lagHentTekstForSprak, { Tekster } from '../../lib/lag-hent-tekst-for-sprak';
import { useSprakValg } from '../../contexts/sprak';
import styles from './feedback.module.css';

const TEKSTER: Tekster<string> = {
    nb: {
        varDetteNyttig: 'Var dette nyttig å lese?',
        ja: 'Ja',
        nei: 'Nei',
        hvorforNei: 'Hvorfor svarte du nei?',
        gammeltNytt: 'Visste det fra før',
        forstodIkke: 'Forstår ikke innholdet',
        uviktig: 'Føles ikke viktig',
        andreGrunner: 'Andre grunner',
        vetIkke: 'Vet ikke',
    },
    en: {
        varDetteNyttig: 'Was this information useful?',
        ja: 'Yes',
        nei: 'No',
        hvorforNei: 'Why did you answer No?',
        gammeltNytt: 'I already knew this',
        forstodIkke: 'I did not understand it',
        uviktig: 'Felt unimportant',
        andreGrunner: 'Other reasons',
        vetIkke: 'Uncertain',
    },
};

interface Props {
    id?: string;
    className?: string;
    sporsmal?: string;
}

function erOppdatertForOver12TimerSiden(dato: string): Boolean {
    if (!dato) return false;
    const iDag = new Date().getTime();
    const sistOppdatert = new Date(dato).getTime();
    return iDag - sistOppdatert > 43200000;
}

function Feedback({ id, className, sporsmal }: Props) {
    const [feedback, setFeedback] = useBrowserStorage(`vta-feedback-intro-${id}`, {
        updated: new Date(),
        valgt: '',
    });
    const [valgt, setValgt] = useState('');
    const [oppdatert, setOppdatert] = useState('');
    const [visPopover, setVisPopover] = useState<HTMLElement | undefined>(undefined);
    const feedbackNeiKnappRef = useRef(null);
    const amplitudeData = useAmplitudeData();
    const featuretoggledata = useFeatureToggleData();

    const tekst = lagHentTekstForSprak(TEKSTER, useSprakValg().sprak);

    useEffect(() => {
        const { valgt, updated } = feedback;
        setValgt(valgt);
        setOppdatert(updated);
    }, [feedback]);

    if (!id) return null;
    if (!featuretoggledata['veientilarbeid.feedback']) return null;
    if (erOppdatertForOver12TimerSiden(oppdatert)) return null;

    const handleFeedback = (feedback: string) => {
        amplitudeLogger('veientilarbeid.feedback.intro', {
            kort: id,
            feedback,
            ...amplitudeData,
        });
        setFeedback({
            updated: new Date(),
            valgt: feedback,
        });
        if (feedback === 'nei') {
            const neiKnapp = document.getElementById('nei-knapp');
            setVisPopover(neiKnapp || undefined);
        } else {
            setVisPopover(undefined);
        }
    };

    const jaKnapp = classNames({
        [styles.valgt]: valgt === 'ja',
        [styles.feedbackKnapp]: true,
    });

    const neiKnapp = classNames({
        [styles.valgt]: /nei/.test(valgt),
        [styles.feedbackKnapp]: true,
    });

    const vetIkkeKnapp = classNames({
        [styles.valgt]: valgt === 'vet ikke',
        [styles.feedbackKnapp]: true,
    });

    return (
        <>
            <div className={`${className ? className : ''} ${styles.feedbackContainer}`}>
                <Detail size="small" className={styles.feedbackTittel}>
                    {sporsmal ? sporsmal : tekst('varDetteNyttig')}
                </Detail>
                <div className={styles.valg}>
                    <button onClick={() => handleFeedback('ja')} className={jaKnapp}>
                        <Detail size="small">{tekst('ja')}</Detail>
                    </button>
                    <span className={styles.feedbackSpace} aria-hidden="true">
                        |
                    </span>
                    <button
                        onClick={() => handleFeedback('nei')}
                        className={neiKnapp}
                        id="nei-knapp"
                        ref={feedbackNeiKnappRef}
                    >
                        <Detail size="small">{tekst('nei')}</Detail>
                    </button>
                    <Popover
                        id="popover-nei"
                        anchorEl={feedbackNeiKnappRef.current}
                        onClose={() => setVisPopover(undefined)}
                        open={visPopover !== undefined}
                        tabIndex={-1}
                        arrow={false}
                    >
                        <Popover.Content>
                            <BodyShort className={styles.feedbackUtdyping}>{tekst('hvorforNei')}</BodyShort>
                            <ul className={styles.feedbackGrunner}>
                                <li>
                                    <button onClick={() => handleFeedback('nei - visste det fra før')}>
                                        {tekst('gammeltNytt')}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleFeedback('nei - forstår ikke innholdet')}>
                                        {' '}
                                        {tekst('forstodIkke')}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleFeedback('nei - føles ikke viktig')}>
                                        {' '}
                                        {tekst('uviktig')}
                                    </button>
                                </li>
                                <li>
                                    <button onClick={() => handleFeedback('nei - andre grunner')}>
                                        {tekst('andreGrunner')}
                                    </button>
                                </li>
                            </ul>
                        </Popover.Content>
                    </Popover>
                    <span className={styles.feedbackSpace} aria-hidden="true">
                        |
                    </span>
                    <button onClick={() => handleFeedback('vet ikke')} className={vetIkkeKnapp}>
                        <Detail size="small">{tekst('vetIkke')}</Detail>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Feedback;
