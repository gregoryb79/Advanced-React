import { useEffect, useId, useRef, useState, type InputHTMLAttributes } from "react";
import styles from "./TextEditor.module.scss";

type TextInputProps = { 
        id: string, 
        };

export function TextEditor({ id }: TextInputProps) {
    const baseId = useId();
    const labelId = `${baseId}_label`;
    const [text, setText] = useState<string>("");
    const [isFocused, setIsFocused] = useState(false);
    const editorRef = useRef<HTMLDivElement>(null);  
    const [cursorPosition, setCursorPosition] = useState(0); 
    
    let textBeforeCursor = text.slice(0, cursorPosition);
    let textAfterCursor = text.slice(cursorPosition);

    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (editorRef.current && !editorRef.current.contains(event.target as Node)) {
                console.log("Clicked outside TextEditor!");
                setIsFocused(false);
                console.log("isFocused:", isFocused);
            }else {
                console.log("Clicked inside TextEditor!");
                setIsFocused(true);
                console.log("isFocused:", isFocused);
            }
        }

        function handleFocus() {
            console.log("TextEditor focused via keyboard!");
            setIsFocused(true);
        }

        function handleBlur() {
            console.log("TextEditor lost focus!");
            setIsFocused(false);
        }

        function handleKey(event: KeyboardEvent) {
            console.log("Key pressed:", event.key);
            console.log("isFocused:", isFocused);
            if (isFocused) {
                if (event.key != "Tab") event.preventDefault();

                if (event.key === "Backspace") {                    
                    textBeforeCursor = text.slice(0, cursorPosition - 1);
                    setCursorPosition((prev) => prev - 1);
                    setText(textBeforeCursor + textAfterCursor);
                } else if (event.key === "Delete") {                    
                    textAfterCursor = textAfterCursor.slice(1,textAfterCursor.length);                    
                    setText(textBeforeCursor + textAfterCursor);
                } else if (event.key.length === 1) {
                    textBeforeCursor = textBeforeCursor + event.key;
                    setCursorPosition((prev) => prev + 1);
                    setText(textBeforeCursor + textAfterCursor);
                    console.log("Text updated:", text + event.key);
                } else if (event.key === "Enter") {                    
                    const newText = textBeforeCursor + "\n" + textAfterCursor;
                    setText(newText);
                    setCursorPosition(prev => prev + 1);
                } else if (event.key === "Escape" || event.key === "Tab") {                    
                    setIsFocused(false);
                } else if (event.key === "ArrowLeft") {
                    setCursorPosition(prev => Math.max(0, prev - 1));
                } else if (event.key === "ArrowRight") {
                    setCursorPosition(prev => Math.min(text.length, prev + 1));
                } else if (event.key === "End") {
                    setCursorPosition(text.length);
                } else if (event.key === "Home") {
                    setCursorPosition(0);
                }

                textBeforeCursor = text.slice(0, cursorPosition);
                textAfterCursor = text.slice(cursorPosition);
            }
        }

        const editor = editorRef.current;
        if (editor) {
            editor.addEventListener('focus', handleFocus);
            editor.addEventListener('blur', handleBlur);
        }

        document.addEventListener('mousedown', handleClick);
        document.addEventListener('keydown', handleKey);
        
        return () => {
            if (editor) {
                editor.removeEventListener('focus', handleFocus);
                editor.removeEventListener('blur', handleBlur);
            }
            document.removeEventListener('mousedown', handleClick);
            document.removeEventListener('keydown', handleKey);
        };
    }, [isFocused, text, cursorPosition]);  
   
    return (
        <div ref={editorRef} className={styles.textInputField} tabIndex={0}>
            <pre className={styles.textBlock}>
                {textBeforeCursor}
                <span className={styles.cursor} aria-expanded={isFocused}>|</span>
                {textAfterCursor}
            </pre>
        </div>
    );
}