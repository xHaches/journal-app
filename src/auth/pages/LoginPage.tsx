import { Link as RouterLink } from 'react-router-dom';
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Google } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { FormEvent, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkingAuthentication, startGoogleSingIn, startLoginWithEmailPassword } from '../../store/auth';
import { RootState } from '../../store';

const formData = {
  email: 'luis@luis.com',
  password: '123456'
}

export const LoginPage = () => {

  const { value: { status, errorMessage } } = useSelector((state: RootState) => state.auth);

  const { email, password, onInputChange, formState } = useForm<{email: string, password: string}>(formData);

  const isAuthenticating = useMemo(() => status === 'checking', [status])

  const dispatch = useDispatch();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log({email, password})
    //! No es esta la accion a despachar 
    dispatch(startLoginWithEmailPassword({email, password}));
  }

  const onGoogleSignIn = () => {
    console.log('onGoogleSignIn');
    dispatch(startGoogleSingIn());
  }

  return (
    <AuthLayout title="Login">
      <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label="Correo"
              type="email"
              name="email"
              onChange={onInputChange}
              value={email}
              placeholder="correo@google.com"
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              name="password"
              onChange={onInputChange}
              value={password}
              fullWidth
            />
          </Grid>

          <Grid 
            container
            sx={{mt: 1}}
            display={!!errorMessage ? '': 'none'}
            >
            <Grid
              item
              xs={12}
            >
              <Alert severity="error">
                {errorMessage}
              </Alert>
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12} sm={6}>
              <Button 
                type="submit"
                variant="contained"
                fullWidth
                disabled={isAuthenticating}
              >
                Login
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button 
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
              >
                <Google />
                <Typography sx={{ml:1}}>Google</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container direction="row" justifyContent="end">
          <Link component={RouterLink} color="inherit" to="/auth/register">
            Crear una cuenta
          </Link>
        </Grid>
      </form>
    </AuthLayout>
  )
}
