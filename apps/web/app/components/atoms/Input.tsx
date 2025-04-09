import styled from "styled-components";

const SInput = styled.input`
 padding: 0.75rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  transition: border-color 0.2s;
  //background-color: gray;
  color: black;

  &:hover {
    background-color: gray;

  &:focus {
    outline: none;
    border-color: #4f46e5;

    
`;

interface InputProps {
  placeholder: string;
  name: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  placeholder = "",
  name = "",
  type = "",
  onChange,
}) => {
  return (
    <>
      <SInput name={name} type={type} onChange={onChange}/>
      
    </>
  );
};

export default Input;
