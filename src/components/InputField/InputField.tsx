import {FC} from "react";
import css from './InputField.module.css'

interface InputFieldProps {
    text: string,
    handleSubmit: () => void,
    handleInput: (str: string) => void,
}
const InputField: FC<InputFieldProps> = ({text, handleSubmit, handleInput}) => {
    return <label>
        <input className={css.task_input} value={text} placeholder={"New task"}
               onChange={(e) => handleInput(e.target.value)} />
        <button className={css.submit_button} onClick={handleSubmit}>Add</button>
    </label>
};

export default InputField;