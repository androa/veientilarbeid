import * as React from 'react';
import { injectIntl, InjectedIntlProps, FormattedMessage } from 'react-intl';
import Kalender from './kalender';
import * as moment from 'moment';
import { Moment } from 'moment';
import 'moment/locale/nb';
import DatoInputfelt from './dato-inputfelt';
import { momentAsISO } from '../moment-utils';
import { Normaltekst } from 'nav-frontend-typografi';

interface OwnProps {
    velgDato: (dato: Moment) => void;
    dato: Moment;
    className?: string;
    inputErGyldig: (erGyldig: boolean) => void;
}

interface State {
    visKalender: boolean;
    inputErRiktigFormatert: boolean;
}

type Props = OwnProps & InjectedIntlProps;

class Datovelger extends React.Component<Props, State> {
    private kalenderKnapp: HTMLButtonElement | null;

    constructor(props: Props) {
        super(props);
        moment.locale('nb');
        this.state = {
            visKalender: false,
            inputErRiktigFormatert: true,
        };
    }

    velgDato(dato: Moment) {
        this.setState({
            ...this.state,
            visKalender: false,
            inputErRiktigFormatert: true,
        });
        this.props.inputErGyldig(true);
        this.props.velgDato(dato);
    }

    toggleKalender() {
        this.setState({
            ...this.state,
            visKalender: !this.state.visKalender,
        });
    }

    lukkKalender() {
        this.setState({
            ...this.state,
            visKalender: false,
        });
    }

    settRiktigFormatert(riktigFormatert: boolean) {
        this.setState({
            ...this.state,
            inputErRiktigFormatert: riktigFormatert,
        });
        this.props.inputErGyldig(riktigFormatert);
    }

    render() {
        const {inputErRiktigFormatert, visKalender} = this.state;
        const classNameFraProps = this.props.className ? this.props.className : '';
        return (
            <div className={`datovelger__outer ${classNameFraProps}`}>
                <div className="datovelger">
                    <div className="datovelger__inner">
                        <div className="datovelger__inputContainer">
                            <DatoInputfelt
                                valgtDato={this.props.dato}
                                velgDato={(dato: Moment) => this.velgDato(dato)}
                                inputErRiktigFormatert={(riktigFormatert) => this.settRiktigFormatert(riktigFormatert)}
                                className={inputErRiktigFormatert ? '' : 'datovelger__input--harFeil'}
                            />
                            <button
                                ref={node => this.kalenderKnapp = node}
                                className="js-toggle datovelger__toggleDayPicker"
                                onClick={() => this.toggleKalender()}
                                aria-pressed={this.state.visKalender}
                                type="button"
                            />
                        </div>
                        {visKalender &&
                            <Kalender
                                valgtDato={this.props.dato.toDate()}
                                velgDato={(dato: Date) => {
                                    this.velgDato(momentAsISO(dato));
                                    if (this.kalenderKnapp) {
                                        this.kalenderKnapp.focus();
                                    }
                                }}
                                lukk={() => this.lukkKalender()}
                            />
                        }
                    </div>
                </div>
                {!inputErRiktigFormatert &&
                    <div
                        role="alert"
                        aria-live="assertive"
                        className="datovelger__feilmelding"
                    >
                        <Normaltekst>
                            <FormattedMessage id="dagpenger.soketidspunkt.dato.feilmelding.ugyldig-input"/>
                        </Normaltekst>
                    </div>
                }
            </div>
        );
    }
}

export default injectIntl(Datovelger);