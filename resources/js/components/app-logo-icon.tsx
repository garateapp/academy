import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    const { className, ...rest } = props;

    return (
        <img
            src="/logo-academy.png"
            alt="Greenex Academy"
            className={`object-contain ${className ?? ''}`}
            {...rest}
        />
    );
}
