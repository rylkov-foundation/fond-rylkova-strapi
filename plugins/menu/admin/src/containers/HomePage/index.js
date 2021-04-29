import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import pluginId from '../../pluginId';
import styled from 'styled-components';
// import { useGlobalContext, useStrapi, request } from 'strapi-helper-plugin';
import Root from '../../componens/Root';

const Wrapper = styled.div`
  padding: 30px;
`;

const Title = styled.h1`
  margin-bottom: 20px;
`;

const HomePage = () => {
  return (
    <Wrapper>
      <Title>{pluginId}</Title>
      <Root />
    </Wrapper>
  );
};

export default memo(HomePage);
