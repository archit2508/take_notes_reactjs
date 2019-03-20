import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 300,
    marginLeft: 600,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  addButton: {
      height: 50,
      marginTop: 18,
  }
});

class OutlinedTextFields extends React.Component {
  constructor(){
    super()
    this.state = {
        task: ' ',
    };
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = task => event => {
    this.setState({
      [task]: event.target.value,
    });
    //console.log('new task: ', this.state.task)
  };

  handleSubmit(e){
    e.preventDefault();
    this.props.addTask(this.state.task)
    //console.log('submitted task: ',this.state.task)
    this.setState({
      task: ' ',
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off" >
        <TextField
          id="outlined-email-input"
          label="New Note"
          className={classes.textField}
          type="text"
          name="New Note"
          margin="normal"
          variant="outlined"
          onChange={this.handleChange('task')}
          value={this.state.task}
        />
        <Button 
          className={classes.addButton} 
          variant='contained' 
          color='primary' 
          onClick={this.handleSubmit}>
        Add
        </Button>
      </form>
    );
  }
}

OutlinedTextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedTextFields);
