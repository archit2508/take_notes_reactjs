import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = ({
  card: {
    minWidth: 200,
    margin: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class ToDo extends React.Component{

  constructor(){
      super()
      this.onRemove = this.onRemove.bind(this)
  }

  onRemove(e){
      console.log("in remove",this.props.id);
      this.props.remove(this.props.id);
  }
  
  render() {
    const { classes } = this.props;
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {this.props.task}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={this.onRemove} value={this.props.id}>Delete</Button>
            </CardActions>
        </Card>
    );
  }
}
ToDo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ToDo);