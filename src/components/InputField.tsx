import {FC} from "react";

interface InputFieldProps {
    text: string,
    handleSubmit: () => void,
    handleInput: (str: string) => void,
}
const InputField: FC<InputFieldProps> = ({text, handleSubmit, handleInput}) => {
    return <label>
        <input value={text} onChange={(e) => handleInput(e.target.value)}/>
        <button onClick={handleSubmit}>Add todo</button>
    </label>
};

export default InputField;