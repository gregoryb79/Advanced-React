import { createContext, useEffect, useState, type ReactNode } from 'react';
import styles from './DropDown.module.scss';

export const DropDownContext = createContext<{
  selectedOption: string;
  setSelectedOption: (id: string) => void;
} | null>(null);

export function DropDown({children}: {children: ReactNode}) {
    console.log("DropDown component rendered");
    const [selectedOption, setSelectedOption] = useState("option1");
    
    
    useEffect(() => {
        console.log("DropDown useEffect - selectedOption:", selectedOption);
    }, [selectedOption]);
    
    return(
        <DropDownContext.Provider value={{ selectedOption, setSelectedOption }}>
           
            <div className={styles.ddMain} >
                <button className={styles.ddButton}>🔽</button>            
                {children}        
            </div>
        </DropDownContext.Provider>
    );
}