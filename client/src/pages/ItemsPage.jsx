import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useLocation } from 'react-router-dom';
import { getItems } from '../services/getItems';
import { addItem } from '../services/addItem';
import { deleteitem } from '../services/deleteItem';
import { updateItem } from '../services/updateItem';
import { soldItems } from '../services/soldItems';

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


const ItemsPage = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  const location = useLocation();
  const productId = location.pathname.split('/')[2]

  const [itemsData, setItemsData] = useState([])

  const [searchText , setSearchText] = useState('')

  const handleSearch = (e) => {
      setSearchText(e.target.value)
  }
  const searchedData = itemsData.filter(item =>
     item.serial_number.toString().includes(searchText)     
  )

  

  useEffect(() => {
    getItems(productId).then((result) => {
      setItemsData(result.data)
    }).catch((err) => {
      console.log(err)
    })
  },[itemsData , productId])

  const [itemInfo , setItemInfo] = useState({
    name:"",
    serial_number:""
  })

  

  const handleAddItem = (e) => {
    e.preventDefault();
    addItem(productId , itemInfo).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    })
  }

  const handleDeleteItem = (id) => {
    deleteitem(id).then((result) => {
      console.log(result.data)
    }).catch((err) => {
        console.log(err)
    })

  }
  const [editModal , setEditModal] = useState({
    id:"",
    name:"",
    serial_number:""
})


  // const productTypeData = [
  //     {
  //       id: 1,
  //       name: "truckLego",
  //       serialNumber: '555',
  //     },
  //     {
  //       id: 2,
  //       name: "carLego",
  //       serialNumber: '666',
  //     },
  //   ];

    const handleSold = (id) => {
      soldItems(id).then((result) => {
        console.log(result.data)
      }).catch((err) => {
          console.log(err)
      })
    }

    const [editItem , setEditItem] = useState({
      name:"",
      serial_number:""
  })

  const handleEditItem = (id) => {
    updateItem(editItem , id).then((result) => {
      console.log(result.data)
    }).catch((err) => {
        console.log(err)
    })
  }


  return (
    <div style={productTypeContainer}>
    <h1>Item Type Page</h1>
    <div style={searchDiv}>
        <TextField onChange={handleSearch} style={textfieldStyle} id="outlined-basic" label="Search by serial number" variant="outlined" />
        <Button style={addBtnStyle} variant='contained'  onClick={handleOpen}>Add</Button>
    </div>
<TableContainer style={productTypeTableStyle} component={Paper}>
  <Table sx={{ minWidth: 650 }} aria-label="simple table">
    <TableHead>
      <TableRow>
        <TableCell style={tableCellOne} align='center'>Name</TableCell>
        <TableCell style={tableCellOne} align="center">Id</TableCell>
        <TableCell style={tableCellOne} align="center">Serial Number</TableCell>
        <TableCell style={tableCellOne} align="center">Tools</TableCell>
        <TableCell style={tableCellOne} align="center">Sold</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {searchedData.map((item) => (
        <TableRow 
          key={item.id}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell  align="center" > {item.name} </TableCell>
          <TableCell  align="center">{item.id}</TableCell>
          <TableCell  align="center">{item.serial_number}</TableCell>
          <TableCell  align="center">
            <Button  variant='contained' style={btnStyle} color='success' onClick={() => {
                    handleOpen2() 
                    setEditModal(item)}}>Edit</Button>
            <Button onClick={() => handleDeleteItem(item.id)} variant='contained' color='error'>Delete</Button>
          </TableCell>
          <TableCell style={tableRowStyle}  align="center">
            <input type='checkbox' checked={item.sold} onChange={() => handleSold(item.id)}></input>
          </TableCell>
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
        Add Item
      </Typography>
      <TextField  onChange={(e) => {
            setItemInfo({...itemInfo , name: e.target.value})
          }} 
             id="outlined-basic" label="Item Name" variant="outlined" />
      <TextField  onChange={(e) => {
            setItemInfo({...itemInfo , serial_number: e.target.value})
          }} 
             id="outlined-basic" label="Serial Number" variant="outlined" />
      <Button onClick={handleAddItem} variant='contained' style={{backgroundColor:'black'}}>Add Item</Button>
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
        Edit {editModal.name}
      </Typography>
      <TextField onChange={(e) => {
            setEditItem({...editItem , name: e.target.value})
          }}
           id="outlined-basic" label=" Edit item" variant="outlined" />
      <TextField onChange={(e) => {
            setEditItem({...editItem , serial_number: e.target.value})
          }}
           id="outlined-basic" label=" Edit Serial Number" variant="outlined" />
      <Button onClick={() => {handleEditItem(editModal.id)}}  variant='contained' style={{backgroundColor:'black'}}>Edit Changes</Button>
    </Box>
  </Modal>
</div>

</div>

    
  )
}

export default ItemsPage