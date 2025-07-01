import React, { useEffect, useRef, useState, type Dispatch, type ReactNode } from "react";
import styles from "./Home.module.scss";
import { useLoaderData } from "react-router";
import { Input } from "./components/Input";
import { GeneralButton } from "./components/GeneralButton";
import { DropDown } from "./components/DropDown";
import { Option } from "./components/Option";
import { TextEditor } from "./components/TextEditor";


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
            <TextEditor id="textEditor" />
            <article>
                <p className={styles.homeParagraph}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quasi minus facilis dolorum, repellendus suscipit nobis est expedita iste error id. Distinctio hic illum id perspiciatis perferendis dicta asperiores iste nemo, et illo fugit quidem inventore nihil tempore nulla? Laboriosam id facere facilis numquam! Optio labore esse necessitatibus, provident molestias enim quidem, quo perspiciatis aperiam animi libero minima voluptas similique fugit quam aliquid itaque distinctio. Eaque soluta autem, laboriosam reiciendis id, itaque ullam inventore fugiat sint quibusdam voluptates rerum, consequuntur quas voluptas! Atque voluptatum, mollitia ipsa delectus veniam corporis quasi sed quia sequi natus fuga minima repellat pariatur tempore ea ex accusantium sunt quos. Quos ab optio laudantium itaque laboriosam! Tempora quam aut ut voluptas commodi veritatis consequatur sapiente libero deserunt pariatur at quo asperiores eius cupiditate, vitae reprehenderit quas dolores! Vero nemo expedita, porro voluptatibus adipisci maxime consequuntur quo eos est dolorum non nihil. Non, quibusdam. Non unde quam laborum omnis facilis iure laudantium, vitae magni expedita esse corrupti error nesciunt optio dicta ipsa excepturi sequi maiores, dolor est inventore enim corporis minus quibusdam nisi? Molestiae veritatis, fugit illum, autem fugiat soluta sint minus nostrum consectetur, iure ab provident quibusdam tenetur rem debitis quas odit! Incidunt, necessitatibus similique adipisci consectetur qui aperiam, magnam dolor delectus sapiente obcaecati deserunt illum esse nemo quos quo architecto quod vitae sint quibusdam aut, saepe id vero atque nostrum! Eligendi aperiam doloribus dolorum porro dolore modi impedit explicabo necessitatibus dolorem voluptatem. Molestias, sint adipisci. Magni magnam velit nesciunt ullam iure necessitatibus omnis nulla!Non unde quam laborum omnis facilis iure laudantium, vitae magni expedita esse corrupti error nesciunt optio dicta ipsa excepturi sequi maiores, dolor est inventore enim corporis minus quibusdam nisi? Molestiae veritatis, fugit illum, autem fugiat soluta sint minus nostrum consectetur, iure ab provident quibusdam tenetur rem debitis quas odit! Incidunt, necessitatibus similique adipisci consectetur qui aperiam, magnam dolor delectus sapiente obcaecati deserunt illum esse nemo quos quo architecto quod vitae sint quibusdam aut, saepe id vero atque nostrum! Eligendi aperiam doloribus dolorum porro dolore modi impedit explicabo necessitatibus dolorem voluptatem. Molestias, sint adipisci. Magni magnam velit nesciunt ullam iure necessitatibus omnis nulla!
                </p>
            </article>
        </main>
    );
}

function Modal({children}: {children: ReactNode}) {      
    return (
        <div className={styles.modalBackdrop} >
            {/* <div className={styles.modalContent}> */}
                {children}
            {/* </div> */}
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

    const [remainingPoints,setRemainigPoints] = useState(35);
    const [stat1, setStat1] = useState(0);
    const [stat2, setStat2] = useState(0);
    const [stat3, setStat3] = useState(0);
    const [stat4, setStat4] = useState(0);
    const [stat5, setStat5] = useState(0);
    useEffect(() => {
        const total = stat1 + stat2 + stat3 + stat4 + stat5;        
        console.log(`stat1: ${stat1}, stat2: ${stat2}, stat3: ${stat3}, stat4: ${stat4}, stat5: ${stat5}`);
        setRemainigPoints(35 - total);
    }, [stat1, stat2, stat3, stat4, stat5]);

    function handleStatChange (statSetter: Dispatch<React.SetStateAction<number>>, newValue: number, currentStat: number) {
        const otherStatsTotal = stat1 + stat2 + stat3 + stat4 + stat5 - currentStat;
        const newTotal = otherStatsTotal + newValue;
    
        if (newTotal <= 35) {
            statSetter(newValue);
        } 
    };

    return (
        <form className={styles.formForm} onSubmit={handleFormSubmit}>
            <h2>Form Form</h2>
            
            <Input id="Stat 1" name="Stat 1" label="Stat 1" type="number" step="1" min="1" pattern="[0-9]*"
                onInput={(e) => {
                    const newValue = Number(e.currentTarget.value) || 0;
                    handleStatChange(setStat1, newValue, stat1);
                }}  value={stat1}/>
            <Input id="Stat 2" name="Stat 2" label="Stat 2" type="number" step="1" min="1" pattern="[0-9]*"
                onInput={(e) => {
                    const newValue = Number(e.currentTarget.value) || 0;
                    handleStatChange(setStat2, newValue, stat2);
                }}  value={stat2}/>
            <Input id="Stat 3" name="Stat 3" label="Stat 3" type="number" step="1" min="1" pattern="[0-9]*"
                onInput={(e) => {
                    const newValue = Number(e.currentTarget.value) || 0;
                    handleStatChange(setStat3, newValue, stat3);
                }}  value={stat3}/>
            <Input id="Stat 4" name="Stat 4" label="Stat 4" type="number" step="1" min="1" pattern="[0-9]*"
                onInput={(e) => {
                    const newValue = Number(e.currentTarget.value) || 0;
                    handleStatChange(setStat4, newValue, stat4);
                }}  value={stat4}/>
            <Input id="Stat 5" name="Stat 5" label="Stat 5" type="number" step="1" min="1" pattern="[0-9]*"
                onInput={(e) => {
                    const newValue = Number(e.currentTarget.value) || 0;
                    handleStatChange(setStat5, newValue, stat5);
                }}  value={stat5}/>
            <p>You Must use all the points!</p>
            <p>Remaining Points <span className={remainingPoints == 0 ? styles.satisfied : undefined}>{remainingPoints}</span></p>
            <section className={styles.formButtons}>
                <GeneralButton label="Submit" disabled={remainingPoints > 0}/>
                <GeneralButton label="Cancel" onClick={onFormSubmited}/>
            </section>
            
        </form>
    );
}