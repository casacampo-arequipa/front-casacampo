export const Card = ({
    children,
    ...rest
}) => {
    return (
        <div className="h-max p-4 bg-white rounded-xl shadow-md border" {...rest}>
            {children}
        </div>
    );
};