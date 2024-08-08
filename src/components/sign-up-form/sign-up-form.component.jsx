import { useState } from "react";
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.style.scss";
import Button from "../button/button.component";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            console.log(user);
            await createUserDocumentFromAuth(user, {displayName});
            resetFormFields();
        } catch (error) {
            if(error.code === "auth/email-already-in-use") {
                alert("Email already exists");
            }

            if(error.code === "Password should be at least 6 characters") {
                alert("Password should be at least 6 characters");
            }
            console.log("error while sign up: ", error);
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value});
    }

    return (
        <div className="sign-up-container">
            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type="text"
                    onChange={handleChange}
                    name="displayName"
                    value={displayName} 
                    required
                />
                
                <FormInput
                    label="email"
                    type="email"
                    onChange={handleChange}
                    name="email"
                    value={email}
                    required
                />
                
                <FormInput
                    label="Password"
                    type="password" 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                    required
                />

                <FormInput 
                    label="Confirm Password"
                    type="password" 
                    name="confirmPassword" 
                    value={confirmPassword} 
                    onChange={handleChange} 
                    required
                />

                <Button 
                    type="submit">
                    Sign Up
                </Button>
            </form>
        </div>
    )
}
export default SignUpForm;