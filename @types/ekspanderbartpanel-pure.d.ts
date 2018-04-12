/// <reference types="react" />
import * as React from 'react';
export interface EkspanderbartpanelPureProps {
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    tittel: string;
    tittelProps?: string;
    apen: boolean;
}
declare class EkspanderbartpanelPure extends React.PureComponent<EkspanderbartpanelPureProps> {
    static defaultProps: Partial<EkspanderbartpanelPureProps>;
    render(): JSX.Element;
}
export default EkspanderbartpanelPure;
