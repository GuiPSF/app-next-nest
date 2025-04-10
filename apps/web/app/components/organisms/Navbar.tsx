import styled from 'styled-components';

const Nav = styled.nav`
  height: 60px;
  background: #4f46e5;
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
`;

export default function Navbar() {
  return <Nav>MyApp</Nav>;
}