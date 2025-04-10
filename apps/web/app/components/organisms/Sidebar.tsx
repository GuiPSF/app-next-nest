import styled from 'styled-components';

const Side = styled.aside`
  width: 220px;
  background-color: #f3f4f6;
  padding: 2rem 1rem;
  height: calc(100vh - 60px); // minus navbar height
`;

export default function Sidebar() {
  return (
    <Side>
      <ul>
        <li>🏠 Dashboard</li>
        <li>👤 Profile</li>
        <li>⚙️ Settings</li>
      </ul>
    </Side>
  );
}
