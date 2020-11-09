import merge from 'merge-deep';
import * as Autentisering from '../ducks/autentisering';
import * as Brukerregistrering from '../ducks/brukerregistrering';
import * as FeatureToggle from '../ducks/feature-toggles';
import * as Egenvurdering from '../ducks/egenvurdering';
import * as Oppfolging from '../ducks/oppfolging';
import * as UlesteDialoger from '../ducks/ulestedialoger';
import * as Jobbsokerbesvarelse from '../ducks/jobbsokerbesvarelse';
import * as BrukerInfo from '../ducks/bruker-info';
import * as React from 'react';

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type ProviderProps = {
    autentisering?: DeepPartial<Autentisering.Data>;
    brukerregistrering?: DeepPartial<Brukerregistrering.Data>;
    featureToggle?: DeepPartial<FeatureToggle.Data>;
    egenvurdering?: DeepPartial<Egenvurdering.Data>;
    oppfolging?: DeepPartial<Oppfolging.Data>;
    ulesteDialoger?: DeepPartial<UlesteDialoger.Data>;
    jobbsokerbesvarelse?: DeepPartial<Jobbsokerbesvarelse.Data>;
    brukerInfo?: DeepPartial<BrukerInfo.Data>;
};

export const contextProviders = function (props: ProviderProps): React.FunctionComponent {
    return ({ children }) => (
        <Autentisering.AutentiseringContext.Provider
            value={merge(Autentisering.initialState, props.autentisering && { data: props.autentisering })}
        >
            <Brukerregistrering.BrukerregistreringContext.Provider
                value={merge(
                    Brukerregistrering.initialState,
                    props.brukerregistrering && { data: props.brukerregistrering }
                )}
            >
                <UlesteDialoger.UlesteDialogerContext.Provider
                    value={merge(UlesteDialoger.initialState, props.ulesteDialoger && { data: props.ulesteDialoger })}
                >
                    <Jobbsokerbesvarelse.JobbsokerbesvarelseContext.Provider
                        value={merge(
                            Jobbsokerbesvarelse.initialState,
                            props.jobbsokerbesvarelse && { data: props.jobbsokerbesvarelse }
                        )}
                    >
                        <Egenvurdering.EgenvurderingContext.Provider
                            value={merge(
                                Egenvurdering.initialState,
                                props.egenvurdering && { data: props.egenvurdering }
                            )}
                        >
                            <Oppfolging.OppfolgingContext.Provider
                                value={merge(Oppfolging.initialState, props.oppfolging && { data: props.oppfolging })}
                            >
                                <FeatureToggle.FeaturetoggleContext.Provider
                                    value={merge(
                                        FeatureToggle.initialState,
                                        props.featureToggle && { data: props.featureToggle }
                                    )}
                                >
                                    <BrukerInfo.BrukerInfoContext.Provider
                                        value={merge(
                                            BrukerInfo.initialState,
                                            props.brukerInfo && { data: props.brukerInfo }
                                        )}
                                    >
                                        {children}
                                    </BrukerInfo.BrukerInfoContext.Provider>
                                </FeatureToggle.FeaturetoggleContext.Provider>
                            </Oppfolging.OppfolgingContext.Provider>
                        </Egenvurdering.EgenvurderingContext.Provider>
                    </Jobbsokerbesvarelse.JobbsokerbesvarelseContext.Provider>
                </UlesteDialoger.UlesteDialogerContext.Provider>
            </Brukerregistrering.BrukerregistreringContext.Provider>
        </Autentisering.AutentiseringContext.Provider>
    );
};
