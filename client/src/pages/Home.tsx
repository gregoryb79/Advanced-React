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
            <GeneralButton label={"Show Form"} onClick={()=>{
                    toggleForm();
                    console.log("Show Form button clicked");
                }}/>
            {showForm && 
                <Modal>
                    <Form onFormSubmited={toggleForm}/>
                </Modal>}
            <article>
                <p className={styles.homeParagraph}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi minus facilis dolorum, repellendus suscipit nobis est expedita iste error id. Distinctio hic illum id perspiciatis perferendis dicta asperiores iste nemo, et illo fugit quidem inventore nihil tempore nulla? Laboriosam id facere facilis numquam! Optio labore esse necessitatibus, provident molestias enim quidem, quo perspiciatis aperiam animi libero minima voluptas similique fugit quam aliquid itaque distinctio. Eaque soluta autem, laboriosam reiciendis id, itaque ullam inventore fugiat sint quibusdam voluptates rerum, consequuntur quas voluptas! Atque voluptatum, mollitia ipsa delectus veniam corporis quasi sed quia sequi natus fuga minima repellat pariatur tempore ea ex accusantium sunt quos. Quos ab optio laudantium itaque laboriosam! Tempora quam aut ut voluptas commodi veritatis consequatur sapiente libero deserunt pariatur at quo asperiores eius cupiditate, vitae reprehenderit quas dolores! Vero nemo expedita, porro voluptatibus adipisci maxime consequuntur quo eos est dolorum non nihil. Non, quibusdam. Non unde quam laborum omnis facilis iure laudantium, vitae magni expedita esse corrupti error nesciunt optio dicta ipsa excepturi sequi maiores, dolor est inventore enim corporis minus quibusdam nisi? Molestiae veritatis, fugit illum, autem fugiat soluta sint minus nostrum consectetur, iure ab provident quibusdam tenetur rem debitis quas odit! Incidunt, necessitatibus similique adipisci consectetur qui aperiam, magnam dolor delectus sapiente obcaecati deserunt illum esse nemo quos quo architecto quod vitae sint quibusdam aut, saepe id vero atque nostrum! Eligendi aperiam doloribus dolorum porro dolore modi impedit explicabo necessitatibus dolorem voluptatem. Molestias, sint adipisci. Magni magnam velit nesciunt ullam iure necessitatibus omnis nulla!
                </p>
            </article>
        </main>
    );
}

function Modal({children}: {children: React.ReactNode}) {      
    return (
        <div className={styles.modalBackdrop} >
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