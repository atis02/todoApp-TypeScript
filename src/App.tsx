import { useState } from 'react'
import { Box, Button, Checkbox, Stack, TextField, Typography } from '@mui/material'

function App() {
  
  interface TodoItem{
    id: string;
    text: string;
    completed: boolean;
  }
  const [todo, setTodo] = useState<TodoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');
  
  const addTodo = () => {
    if (newTodo != '') {
      const newId = crypto.randomUUID();
      const newTodoItem: TodoItem = {
        id: newId,
        text: newTodo,
        completed:false,
      } 
      setTodo([...todo, newTodoItem]);
      setNewTodo('')
    }
  }
  const removeTodo = (id: string) => {
    const updatedTodo = todo.filter((x) => x.id !== id);
    setTodo(updatedTodo);
  }
  console.log(todo);
  
  const toggleComplete = (id: string) => {
    const updatedTodo = todo.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed }

      }
      return todo;
    });
    setTodo(updatedTodo);
  }
  return (
    <Box height='100vh'width='100vw' sx={{display:'flex', gap:'100px',justifyContent:'center', alignItems:'center',flexDirection:'column'}}>
      <Typography fontSize={40} textTransform='uppercase' textAlign='center'>Todo App with TypeScipt</Typography>
      <Stack direction='row' spacing={2} justifyContent='center'>

        <TextField id="filled-basic" type='text' value={newTodo} sx={{width:'400px'}} onChange={(e) => setNewTodo(e.target.value)} label="Add Todo" variant="outlined" />
        <Button sx={{background:'#000',color:'#fff','&:hover':{background:'#000'}}}  onClick={addTodo}>Add Todo</Button>
        
      </Stack>
      <Stack  spacing={2}  width={600} minHeight={300}>
        {todo.length==0?(<Typography fontSize={25} color='gray' textAlign='center'>No any todo</Typography>):todo.map((item,index) => 
          (
          <Stack border='1px solid #000'p={2} height='100%' borderRadius='7px' direction='row'  width='auto' alignItems='center' justifyContent='space-between' key={item.id}>
            <Stack direction='row'alignItems='center'>
              <Typography>{index + 1}.</Typography>
              <Checkbox checked={item.completed} onChange={() => toggleComplete(item.id)} />
            </Stack>
            <Typography sx={{ ...item.completed ? { textDecoration: 'line-through' } : '' }}>{item.text}</Typography>
            <Button sx={{color:'red',border:'1px solid red'}} variant='outlined' onClick={()=>removeTodo(item.id)}>Delete</Button>
          </Stack>
        ))}
      </Stack>
  </Box>    
  )
}

export default App
