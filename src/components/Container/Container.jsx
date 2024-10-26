import React from 'react';
import * as S from './ContainerStyles';

const Container = ({ children, ...rest }) => {
    return <S.StyledContainer {...rest}>{children}</S.StyledContainer>;
};

export default Container;
