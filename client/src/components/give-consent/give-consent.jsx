import Button from '@mui/material/Button';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {GIVE_CONSENT} from "../../mutation/user";

function GiveConsent() {

    const createFormData = ( name, email ) => {
        return { name: name, email: email };
    }

    const [formData, setFormData]       = useState(createFormData( '', '' ));
    const [submitted, setSubmitted]     = useState(false);

    const [giveConsent]                 = useMutation(GIVE_CONSENT);

    const handleChange = (event) => {
        const fData = createFormData( formData.name, formData.email );
        fData[event.target.name] = event.target.value;
        setFormData( fData );
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        giveConsent({
            variables: {
                input: {
                    name: formData.name, email: formData.email
                }
            }
        }).then(({data}) => {
            console.log(data)
            setFormData( createFormData( '', '') );
        }).catch( (e) => {
            console.log( e );
        })
        setSubmitted( true );
        setTimeout( ()=> setSubmitted( false ), 5000 );
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
            <Button
                color="primary"
                variant="contained"
                type="submit"
                disabled={submitted}
            >
                {
                    (submitted && 'Your form is submitted!')
                    || (!submitted && 'Submit')
                }
            </Button>
        </ValidatorForm>
    );
}
export default GiveConsent;