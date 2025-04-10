import styled from "styled-components";

const SButton = styled.button`
  padding: 0.75rem 1rem;
  background-color: #4f46e5;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #4338ca;
  }
`;

interface ButtonProps {
  type?: string;
  children: React.ReactNode;
  onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({onClick, children }) => {
  return (
    <>
      <SButton type="submit" onClick={onClick}> {children} </SButton>
    </>
  );
};
export default Button;
