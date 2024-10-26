export const CardInicio = ({
    cardClass,
    imageWrapperClass,
    imageAlt,
    imageSrc,
    textWrapperClass,
    children,
    cover,
    ...rest
}) => {
    return (
        <div className={cardClass} {...rest}>
            <img className={imageWrapperClass} alt={imageAlt} src={imageSrc} />
            <div className={textWrapperClass}>
                {children}
            </div>
        </div>
    );
};