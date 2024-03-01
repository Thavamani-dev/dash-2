import React , {FC, useState} from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Add  from '@mui/icons-material/Add';
import { Form, Formik} from 'formik';
import * as Yup from "yup"
import "yup-phone"
import { Stack} from '@mui/material';
import Textfield from '../formsUi/TextField'
import Select from '../formsUi/Select'
import DatePicker from '../formsUi/Date';
import ButtonWrapper from '../formsUi/Button'
import genderOptions from "../../data/genderOptions.json"
import roleOptions from "../../data/roleOptions.json"
import bloodOptions from "../../data/bloodOptions.json"
//Form Values
interface FormValues{
    e_firstname:string;
    e_lastname:string;
    e_sex:string;
    e_design:string;
    e_dob:string;
    e_doj:string;
    country:string;
    pcode:string | number;
    emai5l:string;
    dob:string;
    doj:string;
    addressline1:string;
    addressline2:string;
    e_blood_group:string;
    email:string;
    cpwd:string;
    pn:string;
    apn:string;
}



const initialValues : FormValues = {
    e_firstname: '',
    e_lastname:'',
    e_sex:"",
    e_design:"",
    e_dob:"",
    e_doj:'',
    addressline1:"",
    addressline2:"",
    e_blood_group:'',
    email:"",
    doj:"",
    gender:"",
    role:'',
    bloodg:"",
    pwd:'',
    cpwd:'',
    pn:'',
    apn:'',
};

const phoneregex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const validationSchema = Yup.object().shape({
    e_firstname:Yup.string()
        .min(4,'Too short')
        .max(20,"Too long")
        .required("First Name Required"),
    
    e_lastname:Yup.string()
        .min(4,'Too short')
        .max(20,"Too long")
        .required('Last Name Required'),

    e_sex: Yup.string()
        .required('Address Required'),
    
    e_design: Yup.string(),
    e_dob:Yup.string()
        .email("Invalid Email")
        .required("Enter a Email"),
    
    e_doj:Yup.string()
        .matches(phoneregex, "Phone number is invalid")
        .min(10,"Phone number must be 10 digits")
        .max(10,"Phone number must be 10 digits")
        .required("Phone Number is Required"),
    addressline1: Yup.string()
        .matches(phoneregex, "Phone number is invalid")
        .min(10,"Phone number must be 10 digits")
        .max(10,"Phone number must be 10 digits"),
    addressline2:  Yup.string()
        .required('City Required'),
    e_blood_group: Yup.string()
        .required('State Required'),
    country: Yup.string()
        .required('Country Required'),

    e_design: Yup.date()
        .required("Enter Date of Birth"),
    e_dob: Yup.date()
        .required("Joining Date Required"),
    e_doj: Yup.string()
        .required("Enter Gender"),
    role: Yup.string()
        .required("Enter Role"),
    pwd : Yup.string()
        .min(8, 'Password must be 8 characters long')
        .required('Please enter a password')
        .matches(/[0-9]/, 'Password requires a number')
        .matches(/[a-z]/, 'Password requires a lowercase letter')
        .matches(/[A-Z]/, 'Password requires an uppercase letter')
        .matches(/[^\w]/, 'Password requires a symbol'),
    cpwd : Yup.string()
        .oneOf([Yup.ref('pwd')], 'Must match "password" field value'),
    bloodg: Yup.string()
        .required("Blood group is required"),
    pcode: Yup.string()
        .required("Postal Code Required"),
    
})




const UserAdd :FC<FormValues> = () => {
    const [open, setOpen] = useState(false);
    
   
    return (
        <React.Fragment>
        <Button variant="solid" color="primary" onClick={() => setOpen(true)}style={{width:150}} startDecorator={<Add />}>
        Add User
        </Button>
        <Modal
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            open={open}
            onClose={() => setOpen(false)}
            sx={{ display: 'flex', justifyContent:"center", alignItems: 'center'}}
        >
            <Sheet
            variant="outlined"
            sx={{
                width: 700,
                borderRadius: 'md',
                p: 3,
                boxShadow: 'lg',
            }}
            >
                <ModalClose variant="plain" sx={{ m: 1 }} />
                <Typography
                    component="h2"
                    id="modal-title"
                    level="h4"
                    textColor="inherit"
                    fontWeight="lg"
                    mb={1}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                >
                    Add New User
                </Typography>
                    <Formik 
                        initialValues={initialValues}
                        onSubmit={values => {
                            console.log(JSON.stringify(values));
                        }}
                        validationSchema={validationSchema}
                    >   
                        <Form>
                            <Stack spacing={2} maxWidth={'md'}>

                                <Stack direction={'row'} spacing={2} margin={2}>
                                    <Textfield 
                                        name='e_firstname'
                                        label='First name'
                                        type='text'
                                    />
                                    <Textfield 
                                        name='e_lastname'
                                        label='Last name'
                                        type='text'
                                    />
                                    <Select 
                                        name='e_sex'
                                        label="Gender"
                                        options={genderOptions}
                                    />
                                </Stack>
                                <Stack direction={'row'} spacing={2} margin={2}>
                                    <Select 
                                        name='e_design'
                                        label="Role"
                                        options={roleOptions}
                                    />
                                    <DatePicker 
                                        name='e_dob'
                                        label="Date of Birth"
                                    />
                                    <DatePicker 
                                        name='e_doj'
                                        label="Date of Joining"
                                    />
                                </Stack>
                                <Stack direction={'row'} spacing={2} margin={2}>
                                    <Textfield 
                                        name='addressline1'
                                        label='Address Line 1'
                                        type='text'
                                    />
                                    <Textfield 
                                        name='addressline2'
                                        label='Address Line 2'
                                        type='text'
                                    />
                                    
                                    <Select 
                                        name='e_blood_group'
                                        label='Blood Group'
                                        options={bloodOptions}
                                    />
                                </Stack>
                                <Stack direction={'row'} spacing={2} margin={2}>
                                    <Textfield 
                                        name='email'
                                        label='Email'
                                        type='email'
                                    />
                                    <Textfield 
                                        name='pn'
                                        label='Mobile No'
                                        type='text'
                                    />
                                    <Textfield 
                                        name='apn'
                                        label='Alt Mobile No'
                                        type='text'
                                    />
                                </Stack>
                                <Stack direction={'row'} spacing={2} margin={2}>
                                    <Textfield 
                                        name='city'
                                        label='City'
                                        type='text'
                                    />
                                    <Textfield 
                                        name='state'
                                        label='State'
                                        type='text'
                                    />
                                    <Textfield 
                                        name='country'
                                        label='Country'
                                        type='text'
                                    />
                                </Stack>

                                
                                <Stack direction={'row'} spacing={2} margin={2}>
                                    <Textfield 
                                        name='pcode'
                                        label='Postal Code'
                                        type='text'
                                    />
                                    <Textfield 
                                        name='pwd'
                                        label='Password'
                                        type='password'
                                    />
                                    <Textfield 
                                        name='cpwd'
                                        label='Confirm Password'
                                        type='password'
                                    />
                                </Stack>
                                <ButtonWrapper>
                                    Submit 
                                </ButtonWrapper>
                            </Stack>
                        </Form>
                        

                    </Formik>
                </Sheet>
        </Modal>
        </React.Fragment>
    )
}

export default UserAdd