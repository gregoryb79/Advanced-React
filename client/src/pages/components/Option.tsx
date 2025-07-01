import { useContext, type InputHTMLAttributes, type ReactNode } from 'react';
import styles from './Option.module.scss';
import { DropDownContext } from './DropDown'; // Adjust the path if needed
type OptionProps = {
    id: string;
    name: string;      
    children?: ReactNode;    
}
export function Option({id, name, children}: OptionProps) {
    const context = useContext(DropDownContext);
    if (!context) {
        throw new Error('Option must be used within DropDown');
    }
    const { setSelectedOption } = context;

    return (
        <button className={styles.optionButton} id={id} name={name} onClick={(e) => {
            e.preventDefault();
            console.log(`Option clicked: ${id}`);
            setSelectedOption(id);
            }}>            
            {children}
        </button>        
    );
}