import { combineReducers } from 'redux';
import oppfolging, { State as OppfolgingState } from './ducks/oppfolging';
import featureToggles, { State as FeatureTogglesState } from './ducks/feature-toggles';
import servicegruppe, { State as ServicegruppeState } from './ducks/servicegruppe';
import sykeforloepMetadata, { State as SykeforloepMetadata } from './ducks/sykeforloep-metadata';
import jobbsokerbesvarelse, { State as JobbsokerbesvarelseState } from './ducks/jobbsokerbesvarelse';

export interface AppState {
    oppfolging: OppfolgingState;
    featureToggles: FeatureTogglesState;
    servicegruppe: ServicegruppeState;
    sykeforloepMetadata: SykeforloepMetadata;
    jobbsokerbesvarelse: JobbsokerbesvarelseState;
}

export default combineReducers<AppState>({
    oppfolging,
    featureToggles,
    servicegruppe,
    sykeforloepMetadata,
    jobbsokerbesvarelse,
});
