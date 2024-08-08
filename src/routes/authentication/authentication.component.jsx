// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import { 
    // auth,
    signInWithGooglePopup, 
    createUserDocumentFromAuth, 
    // signInWithGoogleRedirect 
} from "../../utils/firebase/firebase.utils";
import "./authentication.style.scss"
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

const Authentication = () => {
    // useEffect(() => {
    //     async function redirectresult() {
    //         const response = await getRedirectResult(auth);
    //         console.log(response);
    //     };
    //     redirectresult();
    // }, []);

    // const logGoogleRedirectUser =  async () => {
    //     const {user} = await signInWithGoogleRedirect();
    //     console.log({user});
    // } 
    return (
        <div className="authentication-container">
            <SignInForm />
            <SignUpForm />
            {/* <button onClick={signInWithGoogleRedirect}>Sign in with Google redirect</button> */}
        </div>
    )
}

export default Authentication;