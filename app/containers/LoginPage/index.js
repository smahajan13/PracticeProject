/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import messages from './messages';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { CardHeader } from '@material-ui/core';
import { dark } from '@material-ui/core/styles/createPalette';
import withRoute from 'react-dom'

const styles = theme => ({
  card: {
    minWidth: 275,
    maxWidth: 400,
    margin: 'auto',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '110vh',
  },
});

class LoginPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
    };
  }

  invalidLoginHandle() {
    this.setState({
      error: 'Email or Password is not valid',
    })
  }

  handleChange(key, value) {
    console.log(value);
    this.setState({
      [key]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email;
    const password = this.state.password;
    const obj = {
      Email: email,
      Password: password,
    };
    fetch('http://localhost:57302/api/token', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      if (response.status === 200) {
        return response.json();
      }
      else if (response.status === 401) {
        return this.invalidLoginHandle();
      }
    }).then((data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('expiryTime', data.expiryToken);

    });
  }

  render() {
    const { classes } = this.props;
    // const bull = <span className={classes.bullet}>•</span>;
    return (
      <div>
        <Card className={classes.card} style={{ marginTop: '4vh' }}>

          <CardHeader title="LOGIN PAGE" style={{ marginLeft: '17vh' }} />
          {this.state.error && <span style={{ marginLeft: '17vh', color: 'blue' }}>{this.state.error}</span>}

          <CardActions>
            <form className={classes.container} noValidate autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
              <center>

                <TextField
                  id="email"
                  label="Email"
                  style={{ width: '110vh' }}
                  floatingLabelStyle={{ color: '#7E7E80' }}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  inputStyle={{ color: '#7a7a7a' }}
                  underlineStyle={{ borderColor: '#7a7a7a' }}
                  floatingLabelText="PASSWORD"
                  floatingLabelFixed
                  value={this.state.email}
                  onChange={(e) => this.handleChange('email', e.target.value)}
                  margin="normal"
                />
                <br />
                <br />
                <TextField
                  id="password"
                  type="password"
                  label="Password"
                  style={{ width: '110vh' }}
                  floatingLabelStyle={{ color: '#7E7E80' }}
                  floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                  inputStyle={{ color: '#7a7a7a' }}
                  underlineStyle={{ borderColor: '#7a7a7a' }}
                  floatingLabelText="PASSWORD"
                  floatingLabelFixed
                  value={this.state.password}
                  onChange={(e) => this.handleChange('password', e.target.value)}
                />
                <br />
                <Button variant="raised" color="primary" type="submit" className={classes.button} style={{ marginRight: '53vh', marginTop: '3vh' }}>
                  LOGIN
                </Button>
              </center>
            </form>
          </CardActions>
        </Card>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
