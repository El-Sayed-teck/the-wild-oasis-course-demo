import styled from "styled-components";

/*since we want <input type="file" /> to be the default of FileInputs,
we'll use the function attrs() for html attributs and chore the type that we want,
which is 'file' */
const FileInput = styled.input.attrs({type: "file"})`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;
