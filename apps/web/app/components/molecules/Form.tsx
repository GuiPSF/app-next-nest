import styled from "styled-components";
import React from 'react'

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 400px;
  margin: 3rem auto;
  padding: 2rem;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background-color: #f9fafb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
`;

interface FormProps {
    onSubmit: (e: React.FormEvent) => void;
    children: React.ReactNode;
}

const Form: React.FC<FormProps> = ({onSubmit, children}) => {
    return(
        <SForm onSubmit={onSubmit}>
            {children}
        </SForm>
    )
}
export default Form