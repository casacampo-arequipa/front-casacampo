import styled from 'styled-components';

export const StyledColoredSection = styled.section`
    display: flex;
    flex-direction: column;
    background: ${({ $backgroundColor }) => $backgroundColor || '#fff'};
`;