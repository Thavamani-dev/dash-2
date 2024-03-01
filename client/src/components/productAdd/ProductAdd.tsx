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
import batteryCategoryOptions from '../../data/batteryCategoryOptions.json'
import statusOptions from '../../data/statusOptions.json'
import warrantyOptions from '../../data/warrantyOptions.json'
import axios from 'axios'
interface FormValues{
    cat_id:string;
    part_no:string;
    short_part_no:string;
    ah:string;
    dlr_price:string;
    mrp:string;
    wnty_cat_id:string;
    p_status:string;
}

const initialValues: FormValues = {
    cat_id:'',
    part_no:'',
    short_part_no:'',
    ah:'',
    dlr_price:'',
    mrp:'',
    wnty_cat_id:'',
    p_status:'',
}

const validationSchema = Yup.object().shape({
    cat_id : Yup.string()
    .required("Battery Category Needed"),
 part_no: Yup.string()
    .required("Part No Needed"),
 short_part_no: Yup.string()
    .required("Short Part No Needed"),
ah: Yup.string()
    .required("Battery AH Needed"),
dlr_price: Yup.number()
    .required("Price is Required")
    .typeError("Please enter valid price"),
mrp: Yup.number()
    .required("Price is Required")
    .typeError("Please enter valid price"),
wnty_cat_id: Yup.string()
    .required("Warranty Year Required"),
 p_status: Yup.string()
    .required("Status is Required")
})

const ProductAdd: FC<FormValues> = () => {
    const [open, setOpen] = useState<boolean>(false);
     const [user,setUser] =  useState(initialValues);
   
     return (
        <React.Fragment>
        <Button variant="solid" color="primary" onClick={() => setOpen(true)}style={{width:150}} startDecorator={<Add />}>
        Add Product
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
                    Add New Product
                </Typography>
                
                <Formik 
                    initialValues={initialValues}
                    onSubmit={ async values => {


                        try {
                            await axios.post('http://localhost:5172/product_smit', values);
                            console.log('product submitted successfully');
                             window.location.href="/products";
                        } catch (error) {
                            console.error('Error submitting form', error);
                            console.error({values});
                            alert("Product submitted successfully");

                        }
                     
                       setUser(initialValues);
                        // console.log(JSON.stringify(values))
                    }}
                    validationSchema={validationSchema}
                >
                    <Form>
                        <Stack spacing={2} maxWidth={'md'}>
                            <Stack direction={'row'} spacing={2} margin={2}>
                                <Select 
                                    name='cat_id'
                                    label='Choose a Category'
                                    options={batteryCategoryOptions}
                                />
                                <Textfield
                                    name='part_no'
                                    label='Part No'
                                    type='text'
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={2} margin={2}>
                                <Textfield
                                    name='short_part_no'
                                    label='Short Part No'
                                    type='text'
                                />
                                <Textfield
                                    name='ah'
                                    label='Battery AH'
                                    type='text'
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={2} margin={2}>
                                <Textfield
                                    name='dlr_price'
                                    label='Dealer Price'
                                    type='text'
                                />
                                <Textfield
                                    name='mrp'
                                    label='MRP Price'
                                    type='text'
                                />
                            </Stack>
                            <Stack direction={'row'} spacing={2} margin={2}>
                            <Select 
                                    name='wnty_cat_id'
                                    label='warranty Year'
                                    options={warrantyOptions}
                                />
                            <Select 
                                    name='p_status'
                                    label='Status'
                                    options={statusOptions}
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

export default ProductAdd