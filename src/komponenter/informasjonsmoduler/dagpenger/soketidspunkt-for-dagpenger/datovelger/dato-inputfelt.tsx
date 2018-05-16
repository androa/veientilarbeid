import * as React from 'react';
import MaskedInput from 'react-maskedinput';
import {
    erGyldigFormattertDato,
    inputDatostringTilISODate,
    ISODateTilInputDatostring
} from '../moment-utils';
import { Moment } from 'moment';

interface Props {
    valgtDato: Moment;
    velgDato: (dato: Moment) => void;
    inputErRiktigFormatert: (riktigFormatert: boolean) => void;
    className: string;
}

class DatoInputfelt extends React.Component<Props> {
    endreDatoHvisGyldigFormattert(datostring: string) {
        if (erGyldigFormattertDato(datostring)) {
            this.props.velgDato(inputDatostringTilISODate(datostring));
            this.props.inputErRiktigFormatert(true);
        } else {
            this.props.inputErRiktigFormatert(false);
        }
    }

    render() {
        return (
            <MaskedInput
                type="tel"
                mask="11.11.1111"
                autoComplete="off"
                placeholder="dd.mm.åååå"
                className={`datovelger__input ${this.props.className}`}
                value={ISODateTilInputDatostring(this.props.valgtDato)}
                onChange={event => this.endreDatoHvisGyldigFormattert(event.target.value)}
            />
        );
    }
}

export default DatoInputfelt;