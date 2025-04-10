import styled from 'styled-components';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Wrapper = styled.div`
  display: flex;
`;

const Main = styled.main`
  flex: 1;
  padding: 2rem;
  background-color: #fff;
`;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <Wrapper>
        <Sidebar />
        <Main>{children}</Main>
      </Wrapper>
    </>
  );
}
