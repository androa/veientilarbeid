/// <reference types="react" />
import * as React from 'react';
import { CollapseProps } from 'react-collapse';
import 'nav-frontend-ekspanderbartpanel-style';
export interface EkspanderbartpanelBasePureProps {
    heading: React.ReactNode;
    className?: string;
    onClick: (event: React.SyntheticEvent<HTMLButtonElement>) => void;
    ariaTittel: string;
    apen: boolean;
    children?: React.ReactNode;
    collapseProps?: Partial<CollapseProps>;
}
declare class EkspanderbartpanelBasePure extends React.Component<EkspanderbartpanelBasePureProps, {}> {
    private isCloseAnimation;
    componentWillReceiveProps(nextProps: any): void;
    onRestProxy: () => void;
    tabHandler(event: any): void;
    render(): JSX.Element;
}
export default EkspanderbartpanelBasePure;
