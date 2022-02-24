import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {GIVE_CONSENT} from "../../mutation/user";
import {Alert, CircularProgress} from "@mui/material";

function GiveConsent() {

    const createFormData = ( name, email ) => {
        return { name: name, email: email };
    }

    const [formData, setFormData]       = useState(createFormData( '', '' ));
    const [submitted, setSubmitted]     = useState(false);

    const [giveConsent]                 = useMutation(GIVE_CONSENT);

    const [success, setSuccess]         = useState( false );
    const [error, setError]             = useState( null );

    const handleChange = (event) => {
        const fData = createFormData( formData.name, formData.email );
        fData[event.target.name] = event.target.value;
        setFormData( fData );
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setSubmitted( true );
        setError( null );
        giveConsent({
            variables: {
                input: {
                    name: formData.name, email: formData.email
                }
            }
        }).then(({data}) => {
            setSuccess( true );
            setTimeout( () => setSuccess( false ), 5000 );
            console.log(data)
            setFormData( createFormData( '', '') );
            setSubmitted( false );
        }).catch( (e) => {
            setError( e.message );
            setSubmitted( false );
        })
    }

    return (
        <ValidatorForm
            onSubmit={handleSubmit} >
            <h2>Give consent</h2>
            <TextValidator
                label="Name"
                onChange={handleChange}
                name="name"
                value={formData.name}
                // validators={['required']}
                // errorMessages={['this field is required']}
            />
            <br />
            <TextValidator
                label="Email"
                onChange={handleChange}
                name="email"
                value={formData.email}
                // validators={['required', 'isEmail']}
                // errorMessages={['this field is required', 'email is not valid']}
            />
            <br />
            { !submitted && <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={submitted}
            >
                Submit
            </Button> }
            { submitted && <CircularProgress /> }
            <br/>
            <br/>
            { success && <Alert severity="success">Your consent was submitted - thanks!</Alert> }
            { ( error !== null ) && <Alert severity="error">{error}</Alert> }
        </ValidatorForm>
    );
}
export default GiveConsent;