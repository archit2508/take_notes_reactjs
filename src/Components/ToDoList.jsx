import React from 'react';
import ToDo from './ToDo';
import { Grid } from '@material-ui/core';
import './ToDoList.css'

class ToDoList extends React.Component{
    render(){
        return (
            <Grid className='root' container spacing={24}>
                {this.props.tasks.map(todo => <ToDo id={todo.id} task={todo.value} remove={this.props.remove}/>)}
            </Grid>
        );
    }
}

export default ToDoList;

