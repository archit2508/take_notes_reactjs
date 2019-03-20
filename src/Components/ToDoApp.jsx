import React, { } from 'react';
import './ToDoApp.css'
import ToDoTaker from './ToDoTaker';
import NavDrawer from './NavDrawer';
import ToDoList from './ToDoList';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 300,
      marginLeft: 670,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      flex: 1,
    },
    dense: {
      marginTop: 16,
    },
    menu: {
      width: 200,
    },
    addButton: {
        display: 'flex',
        height: 50,
        width: 200,
        marginTop: 18,
        marginLeft: 5
    }
  });

class TodoApp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks:[],
            title: "Banao Notes",
            isLoggedIn: false,
            email: "",
            password: ""
        }
        this.addTask = this.addTask.bind(this)
        this.onRemove = this.onRemove.bind(this)
        this.onLogin = this.onLogin.bind(this)
    }

    async fetchdetails(id) {
        return await fetch('http://localhost:3000/users/' + id).then(function (response) {
            return response.json();
        });
    }

    async onLogin(e){
        e.preventDefault();

        var userName = document.getElementById("email").value;
        var passWord = document.getElementById("password").value;
        await this.fetchdetails(userName).then(data=>{
            console.log(data);
            if(passWord==data.password){
                this.setState(
                    (currState) => ({
                        isLoggedIn: true,
                        email: data.id,
                        password: data.password,
                        tasks: data.tasks
                    })
                )
            }
        });

        
    }

    addTask(task){
        const newState = [{
            id: Math.random()*1000,
            value: task
        }];
        this.setState(
            (currState) => ({
                tasks: currState.tasks.concat(newState)
            })
        )
    }

    onRemove(taskId){
        console.log("hatao isko: ",taskId);
        // var array = this.state.tasks
        // var index = array.indexOf(id)
        // array.splice(index)
        // this.setState(
        //     {tasks: array}
        // )
        this.setState(
            (currState) => ({
                tasks: currState.tasks.filter(task => task.id != taskId)
            })
        );
    }

    render(){
        const { classes } = this.props;

        if(this.state.isLoggedIn){
            return(
                <div className='ToDoApp'>
                    <NavDrawer/>
                    <ToDoTaker addTask = {this.addTask}/>
                    <ToDoList tasks = {this.state.tasks} remove = {this.onRemove}/>
                </div>
            );
        }
        else{
            return(
                <div className='ToDoApp'>
                    <NavDrawer/>
                    <form className={classes.container} noValidate autoComplete="off" >
                    <div>
                    <TextField
                        id="email"
                        label="Email"
                        className={classes.textField}
                        type="text"
                        name="Email"
                        margin="normal"
                        variant="outlined"
                        // onChange={this.handleChange('task')}
                    />
                    <TextField
                        id="password"
                        label="Password"
                        className={classes.textField}
                        type="text"
                        name="Password"
                        margin="normal"
                        variant="outlined"
                        // onChange={this.handleChange('task')}
                    />
                    </div>
                    <br/>
                    <Button 
                        className={classes.addButton} 
                        variant='contained' 
                        color='primary' 
                        onClick={this.onLogin}
                    >
                    Login
                    </Button>                    
                    </form>
                </div>
            );
        }
    }
}

export default withStyles(styles)(TodoApp);