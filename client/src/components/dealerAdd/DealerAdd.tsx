import React , {FC,useState} from 'react';
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
import ButtonWrapper from '../formsUi/Button'
import axios from 'axios';

interface FormValues{
    dlr_name:string;
    shop_cat:string;
    addressline1:string;
    addressline2:string;
    city:string;
    postal_code:string;
    contact_number:string;
    alternate_number:string;
}

const initialValues:FormValues ={
    dlr_name:"",
    shop_cat:"",
    addressline1:"",
    addressline2:"",
    city:"",
    postal_code:"",
    contact_number:"",
    alternate_number:"",
}

const phoneregex = /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/;

const validationSchema = Yup.object().shape({
    dlr_name:Yup.string()
        .min(4,'Too short')
        .max(20,"Too long")
        .required("Dealer Name Repuired"),
    shop_cat:Yup.string()
       
        .required("Category Required"),
    addressline1: Yup.string()
        .required("Address Required"),
    addressline2 : Yup.string(),
    city: Yup.string()
        .required("Area Required"),
    postal_code: Yup.string()
        .required("Postal Code Required"),
    contact_number:Yup.string()
        .matches(phoneregex, "Phone number is invalid")
        .min(10,"Must be over 10 digits")
        .max(10,"Must be under 10 digits")
        .required("Phone Number is Required"),
    alternate_number: Yup.string()
        .matches(phoneregex, "Phone number is invalid")
        .min(10,"Must be over 10 digits")
        .max(10,"Must be under 10 digits"),
})



const DealerAdd: FC<FormValues> = () => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [user,setUser] =  useState(initialValues);
  return (
    <React.Fragment>
        <Button variant="solid" color="primary" onClick={() => setOpen(true)}style={{width:150}} startDecorator={<Add />}>
        Add Dealer
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
                maxWidth: 780,
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
                    Add New Dealer
                </Typography>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={ async values => {

                        try {
                            await axios.post('http://localhost:5172/dealer_smit', values);
                            console.log('Form submitted successfully');
                            window.location.href="/dealer";
                        } catch (error) {
                            console.error('Error submitting form', error);
                            console.error({values});
                        }
                     
                       setUser(initialValues);
                        // console.log(JSON.stringify(values))
                    }}
                
                >
                    <Form>
                        <Stack spacing={2} maxWidth={'md'}>
                            <Stack  direction={'row'} spacing={2} margin={2}>
                                <Textfield
                                    name='dlr_name'
                                    label='Dealer Name'
                                    type='text'
                                />
                                <Textfield
                                    name='shop_cat'
                                    label='Shop Category'
                                    type='text'
                                />
                            </Stack>
                            <Stack  direction={'row'} spacing={2} margin={2}>
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
                            </Stack>
                            <Stack  direction={'row'} spacing={2} margin={2}>
                                <Textfield
                                    name='city'
                                    label='Area'
                                    type='text'
                                />
                                <Textfield
                                    name='postal_code'
                                    label='Postal Code'
                                    type='text'
                                />
                            </Stack>
                            <Stack  direction={'row'} spacing={2} margin={2}>
                                <Textfield
                                    name='contact_number'
                                    label='Phone No'
                                    type='text'
                                />
                                <Textfield
                                    name='alternate_number'
                                    label='Alt Phone No'
                                    type='text'
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

export default DealerAdd