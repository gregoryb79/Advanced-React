import React from "react";
import styles from "./Home.module.scss";
import { useLoaderData } from "react-router";
import { Input } from "./components/Input";
import { GeneralButton } from "./components/GeneralButton";


export function Home() {
    console.log("Home component rendered");
    const message = useLoaderData<string>();
    console.log(`${message} retured from server`);       

    const [showForm, setShowForm] = React.useState(false);

    function toggleForm() {
        setShowForm((prev) => !prev);
    }
        
    return (
        <main className={styles.homeMain}>  
            <h2>Home</h2>            
            <GeneralButton label={"Show Form"} onClick={toggleForm}/>
            {showForm && <Modal onClose={toggleForm}><Form onFormSubmited={toggleForm}/></Modal>}
            <article>
                <p className={styles.homeParagraph}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum possimus voluptate perferendis laudantium doloribus deserunt animi maiores aspernatur unde id accusantium earum quis odio vel rem, inventore cupiditate hic voluptatem, minus distinctio eius maxime incidunt ullam illum. Modi ut quisquam molestiae architecto error voluptates minima. Ipsam illo iure consequatur quis!
                </p>
            </article>
        </main>
    );
}

function Modal({children, onClose}: {children: React.ReactNode, onClose: () => void}) {
    // Close modal when clicking backdrop
    function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }

    // Close modal on Escape key
    React.useEffect(() => {
        function handleEscapeKey(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                onClose();
            }
        }

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [onClose]);

    return (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                {children}
            </div>
        </div>
    );
}

function Form({onFormSubmited}: {onFormSubmited: () => void}) {
    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = Object.fromEntries(formData.entries());
        console.log("Form submitted with data:", data);

        const input1 = formData.get("input1");
        console.log("Input 1 value:", input1);
        const input2 = formData.get("input2");
        console.log("Input 2 value:", input2);
        const input3 = formData.get("input3");
        console.log("Input 3 value:", input3);
        const input4 = formData.get("input4");
        console.log("Input 4 value:", input4);
        const input5 = formData.get("input5");
        console.log("Input 5 value:", input5);  
        
        event.currentTarget.reset();  
        onFormSubmited();      
        
    }

    return (
        <form className={styles.formForm} onSubmit={handleFormSubmit}>
            <h2>Form Form</h2>
            <Input id="input1" name="input1" label="input1" type="text" required/>
            <Input id="input2" name="input2" label="input2" type="text" />
            <Input id="input3" name="input3" label="input3" type="text" />
            <Input id="input4" name="input4" label="input4" type="text" />
            <Input id="input5" name="input5" label="input5" type="text" />
            <GeneralButton label="Submit"/>
        </form>
    );
}