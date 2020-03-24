import React, {useContext} from 'react';
import {ThemeContext} from 'styled-components';

import {
  Container,
  Title,
  Description,
  ToggleThemeButton,
  ThemeIcon,
} from './styles';

export default function Home({toggleTheme}) {
  const {title} = useContext(ThemeContext);

  return (
    <Container>
      <Title>ToggleTheme</Title>

      <Description>
        Exemplo de aplicativo React Native com toggle de temas Dark/Light
      </Description>

      <ToggleThemeButton onPress={toggleTheme}>
        <ThemeIcon name={title === 'light' ? 'sun' : 'moon'} />
      </ToggleThemeButton>
    </Container>
  );
}
