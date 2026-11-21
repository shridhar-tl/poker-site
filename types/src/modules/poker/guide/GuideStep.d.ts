import type { ReactNode } from 'react';
interface GuideStepProps {
    index: number;
    title: string;
    text: string;
    done?: boolean;
    children?: ReactNode;
}
export default function GuideStep({ index, title, text, done, children }: GuideStepProps): import("react").JSX.Element;
export {};
