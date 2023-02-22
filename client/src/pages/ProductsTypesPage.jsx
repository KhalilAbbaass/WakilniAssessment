import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getProducts } from '../services/getProducts';
import { addProduct } from '../services/addProduct';
import { deleteProducts } from '../services/deleteProducts';
import { editProducts } from '../services/editProducts';



const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FDDA0D',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    gap:'30px',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'

}

const imgStyle = {
    height:'40px',
    width:'auto'
}
const productTypeContainer = {
    padding:'4rem',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'column'
}
const productTypeTableStyle ={
    border:'1px solid black'
}
const btnStyle = {
    margin:'5px'
}
const tableCellOne = {
    backgroundColor:'#FDDA0D',
    color:'black',
    fontWeight:'bold'
}
const searchDiv = {
    width:'100%',
    display:'flex',
    justifyContent:'space-between'
}
const textfieldStyle = {
    marginBottom:'1rem',
    width:'30vw'
}
const addBtnStyle = {
    margin:'5px',
    height:'7vh',
    backgroundColor:'black'
}
const tableRowStyle = {
    cursor:'pointer'
}





const ProductsTypesPage = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [open2, setOpen2] = useState(false);
    const handleOpen2 = () => setOpen2(true);
    const handleClose2 = () => setOpen2(false);

    const nav = useNavigate();

    const [productTypeData , setProductTypeDate] = useState([]);
    const [searchText , setSearchText] = useState('')

    const handleSearch = (e) => {
        setSearchText(e.target.value)
    }
    const searchedData = productTypeData.filter(item =>
       item.product_type_name.toLowerCase().includes(searchText.toLowerCase())     
    )

    useEffect(() => {
        getProducts().then((result) => {
            setProductTypeDate(result.data)
        }).catch((err) => {
            console.log(err)
        })
    },[productTypeData])

    const [productInfo , setProductInfo] = useState({
        product_type_name:"",
        image:""
    })

    const [editProductType , setEditProductType] = useState({
        product_type_name:"",
        image:""
    })
    const [editModal , setEditModal] = useState({
        id:"",
        product_type_name:"",
        image:""
    })

    const handleEditProductType = (id) => {
        editProducts(editProductType , id).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    }
    

    // const productTypeData = [
    //     {
    //       id: 1,
    //       productType: "Lego",
    //       count: '10',
    //       img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/LEGO_logo.svg/800px-LEGO_logo.svg.png",
    //     },
    //     {
    //       id: 2,
    //       productType: "Video games",
    //       count: '3',
    //       img: "https://hips.hearstapps.com/hmg-prod/images/most-popular-video-games-of-2022-1642612227.png",
    //     },
    //   ];

    const handleRowClick = (id) => {
        nav(`/itempage/${id}`)

    }

    const handleAddProductType = (e) => {
        e.preventDefault();
        addProduct(productInfo).then((result) => {
            console.log(result.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleDeleteProduct = (id) => {
        deleteProducts(id).then((result) => {
        console.log(result.data)
        }).catch((err) => {
            console.log(err)
        })
    }

  return (
    <div style={productTypeContainer}>
        <h1>Product Types Page</h1>
        <div style={searchDiv}>
            <TextField  onChange={handleSearch} style={textfieldStyle} id="outlined-basic" label="Search by product name" variant="outlined" />
            <Button style={addBtnStyle} variant='contained'  onClick={handleOpen}>Add</Button>
        </div>
    <TableContainer style={productTypeTableStyle} component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={tableCellOne} align='center'>Product Type Name</TableCell>
            <TableCell style={tableCellOne} align="center">Id</TableCell>
            <TableCell style={tableCellOne} align="center">Count</TableCell>
            <TableCell style={tableCellOne} align="center">Tools</TableCell>
            <TableCell style={tableCellOne} align="center">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {searchedData.map((item) => (
            <TableRow 
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={tableRowStyle} onClick = {() =>handleRowClick(item.id)} align="center" > {item.product_type_name} </TableCell>
              <TableCell style={tableRowStyle} onClick = {() =>handleRowClick(item.id)} align="center">{item.id}</TableCell>
              <TableCell style={tableRowStyle} onClick = {() =>handleRowClick(item.id)} align="center">{item.count}</TableCell>
              <TableCell  align="center">
                <Button onClick={() => {
                    handleOpen2() 
                    setEditModal(item)}}variant='contained' style={btnStyle} color='success'>Edit</Button>
                <Button onClick={() => handleDeleteProduct(item.id)} variant='contained' color='error'>Delete</Button>
                </TableCell>
              <TableCell style={tableRowStyle} onClick = {() =>handleRowClick(item.id)} align="center"><img style={imgStyle} alt='' src={item.image}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>


    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add Product Type 
          </Typography>
          <TextField  onChange={(e) => {
            setProductInfo({...productInfo , product_type_name: e.target.value})
          }} 
            id="outlined-basic" label="Product Type" variant="outlined" />
          <TextField onChange={(e) => {
            setProductInfo({...productInfo , image: e.target.value})
          }} 
            id="outlined-basic" label="Image link Address" variant="outlined" />
          <Button onClick={handleAddProductType} variant='contained' style={{backgroundColor:'black'}}>Add Product Type Name</Button>
        </Box>
      </Modal>
    </div>
    {/* edit modal */}
    <div>
      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit {editModal.product_type_name}
          </Typography>
          <TextField onChange={(e) => {
            setEditProductType({...editProductType , product_type_name: e.target.value})
          }} 
             id="outlined-basic" label=" Edit Product Type" variant="outlined" />
          <TextField onChange={(e) => {
            setEditProductType({...editProductType , image: e.target.value})
          }} 
             id="outlined-basic" label=" Edit Image link Address" variant="outlined" />
          <Button onClick={() => {handleEditProductType(editModal.id)}}  variant='contained' style={{backgroundColor:'black'}}>Edit Changes</Button>
        </Box>
      </Modal>
    </div>

    </div>
  )
}

export default ProductsTypesPage