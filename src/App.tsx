
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { Box } from '@mui/material';


interface DataItem {
  id: string;
  title: string;
  description: string;
  status: string;
}

function App() {
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const [data, setData] = useState<DataItem[]>([]);
  const [status, setStatus] = React.useState('');
  const [fillter, setFillter] = React.useState('showall');
  const [fillterShow, setFillterShow] = React.useState([]);



  const handleDelete = (row) => {
    console.log("DELETE ID:", row);
    const data = localStorage.getItem("data");
    if (data !== null) {
      let dataArray = JSON.parse(data);
      const rowId = row.id
      let indexToDelete = dataArray.findIndex(item => item.id === rowId);
      console.log(rowId, "XX");
      if (indexToDelete !== -1) {
        dataArray.splice(indexToDelete, 1);
        localStorage.setItem('data', JSON.stringify(dataArray));
        window.location.reload();
      }
    }

  };

  const handleFillter = () => {
    const data = localStorage.getItem("data");
    // console.log(fillter);

    if (data !== null) {
      if (fillter == "showall") {
        let dataLocal = JSON.parse(data);
        setFillterShow(dataLocal);

      }
      else {
        let dataLocal = JSON.parse(data);
        const dataFillter = dataLocal.filter(item => item.status === fillter)
        // console.log(dataFillter);

        setFillterShow(dataFillter)
      }

    }

  };

  const handleFillterSelect = (event: SelectChangeEvent,) => {
    setFillter(event.target.value as string);

  };
  const handleChangeSelect2 = (id: string, value: string) => {

    const newData = data.map(item => item.id === id ? { ...item, status: value } : item);
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData));

  };
  const handleChangeSelect = (event: SelectChangeEvent,) => {
    setStatus(event.target.value as string);

  };

  const handleChange = (e) => {
    setValue1(e.target.value)
  }
  const handleChange2 = (e) => {
    setValue2(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    const newData: DataItem = {
      id: Math.random().toString(36),
      title: value1,
      description: value2,
      status: status,
    }
    let itemData: DataItem[] = []
    const getValueStorage = localStorage.getItem('data')
    if (getValueStorage !== null) {
      itemData = JSON.parse(localStorage.getItem('data')!)
      itemData.push(newData)
      localStorage.setItem('data', JSON.stringify(itemData))
    } else {
      itemData.push(newData)
      localStorage.setItem('data', JSON.stringify(itemData))
    }
    if (fillterShow) {

    }

    handleClose()

  }


  function createData(id: string, title: string, description: string, status: string) {
    return { id, title, description, status };
  }
  const rows = data.length > 0 ? data.map((item) =>
    createData(
      item.id,
      item.title,
      item.description,
      item.status
    )
  ) : [];

  useEffect(() => {
    const data = localStorage.getItem("data")
    if (data !== null) {
      const parseData = JSON.parse(data);
      setData(parseData);
      setFillterShow(JSON.parse(data));

    }

  }, [value1, value2, fillter, fillterShow])

  useEffect(() => {
    localStorage.setItem('filteredData', JSON.stringify(fillterShow));
    handleFillter()
  }, [fillterShow]);

  const handleClickOpen = () => {
    setOpen(true);
  };


  const handleClose = () => {
    setOpen(false);
    window.location.reload();
  };



  return (
    <div>
  
       

      <div style={{ height: 400, width: '100%', marginTop: 100 }}>
        <Box sx={{ml:140,mr:10}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Fillter</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={fillter}
            label="Age"
            onChange={handleFillterSelect}

          >
            <MenuItem value='incomplete'>Incomplete</MenuItem>
            <MenuItem value='complete'>Complete</MenuItem>
            <MenuItem value='showall'>Show all</MenuItem>

          </Select>
        </FormControl>
        </Box>
     
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"

        >
          <DialogTitle id="alert-dialog-title">
            Add To-Do List
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                id="title"
                label="Title"
                variant="outlined"
                sx={{ width: 400 }}
                onChange={handleChange}

              />
            </DialogContentText>

          </DialogContent>
          <DialogContent>
            <TextField
              id="optional-description"
              label="Optional Description"
              multiline
              maxRows={4}
              variant="outlined"
              onChange={handleChange2}
              sx={{ width: 400 }}
            />
          </DialogContent>
          <DialogContent>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Mark</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={status}
                label="Age"
                onChange={handleChangeSelect}

              >
                <MenuItem value='incomplete'>Incomplete</MenuItem>
                <MenuItem value='complete'>Complete</MenuItem>

              </Select>
            </FormControl>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
              Add
            </Button>
          </DialogActions>
        </Dialog>


        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">

            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell align="center">Description</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center"><Button
                  variant="contained"
                  onClick={handleClickOpen}
                  sx={{ justifyContent: "flex-end" }}
                  type='submit'
                >
                  Add
                </Button></TableCell>
                {/* <TableCell align="center">Edit</TableCell> */}

              </TableRow>
            </TableHead>
            <TableBody>
              {fillterShow.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.title}
                  </TableCell>

                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center"><FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Mark</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={row.status}
                      key={row.id}
                      label="Age"
                      onChange={(e) => handleChangeSelect2(row.id, e.target.value)}
                    >
                      <MenuItem value='incomplete'>Incomplete</MenuItem>
                      <MenuItem value='complete'>Complete</MenuItem>

                    </Select>
                  </FormControl></TableCell>
                  <TableCell align="center">
                    <Button variant="outlined" color="error" onClick={() => handleDelete(row)}>DELETE</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        </TableContainer>
      </div>

    </div>

  );
}

export default App;
