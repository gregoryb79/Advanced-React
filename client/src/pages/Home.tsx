import React from "react";
import styles from "./Home.module.scss";
import { useLoaderData } from "react-router";
import { Input } from "./components/Input";
import { GeneralButton } from "./components/GeneralButton";


export function Home() {
    console.log("Home component rendered");
    const message = useLoaderData<string>();
    console.log(`${message} retured from server`);   

    function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {

    }
        
    return (
    <main className={styles.homeMain}>              
        <form className={styles.formForm} onSubmit={handleFormSubmit}>
            <h2>Form Form</h2>
            <Input id="input1" name="input1" label="input1" type="text" required/>
            <Input id="input2" name="input2" label="input2" type="text" />
            <Input id="input3" name="input3" label="input3" type="text" />
            <Input id="input4" name="input4" label="input4" type="text" />
            <Input id="input5" name="input5" label="input5" type="text" />
            <GeneralButton label="Submit"/>
        </form>
    </main>
    );
}