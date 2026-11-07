import { type ReactElement } from 'react';
interface LabeledFieldProps {
    label: string;
    required?: boolean;
    error?: string;
    hint?: string;
    children: ReactElement<{
        id?: string;
    }>;
}
export default function LabeledField({ label, required, error, hint, children }: LabeledFieldProps): import("react").JSX.Element;
export {};
