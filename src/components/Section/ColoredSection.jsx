import React from 'react';
import * as S from './SectionStyles';
import Container from '../Container/Container';

const ColoredSection = ({
    children,
    backgroundColor,
    ...containerProps
}) => {
    return (
        <S.StyledColoredSection $backgroundColor={backgroundColor}>
            <Container {...containerProps}>
                <div className="content">{children}</div>
            </Container>
        </S.StyledColoredSection>
    );
};

export default ColoredSection;