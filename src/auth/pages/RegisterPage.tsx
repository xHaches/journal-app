import { AuthLayout } from "../layout/AuthLayout"
import { Grid, Typography, TextField, Button, Link, Alert } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';
import { useForm } from "../../hooks";
import { FormEvent, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startCreatingUserWithEmailPassword } from "../../store/auth";
import { RootState } from "../../store";

const formData = {
  email: 'luis@luis.com',
  password: '123456',
  displayName: 'Luis Hernandez'
}

const formValidations: { [key: string]: [(value: string) => boolean, string] } = {
  email: [(value: string) => value.includes('@'), 'El correo debe de tener una @'],
  password: [(value: string) => value.length >= 6, 'EL password debe de tener más de 6 letras'],
  displayName: [(value: string) => value.length >= 1, 'El nombre es obligatorio'],
};

export const RegisterPage = () => {

  const [formSubmitted, setFormSubmitted] = useState(false);
  const dispatch = useDispatch();

  const {value: {status, errorMessage}} = useSelector((state: RootState) => state.auth);
  
  const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);
  
  const { 
    displayName, email, password, onInputChange, formState,
    displayNameValid, emailValid, passwordValid, isFormValid
  } = useForm<{
    email: string, password: string, displayName: string,
    displayNameValid: string, emailValid: string, passwordValid: string
  }>(formData, formValidations);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    setFormSubmitted(true);
    if(!isFormValid) return;
    dispatch(startCreatingUserWithEmailPassword(formState));
  }


  return (
    <AuthLayout title="Login">
      <>
        <h1>FormValid: { isFormValid ? 'Valido' : 'Incorrecto' }</h1>
        <form onSubmit={onSubmit} className='animate__animated animate__fadeIn animate__faster'>
          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Nombre completo"
                type="text"
                placeholder="Jonh doe"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={!!displayNameValid && formSubmitted}
                helperText={displayNameValid}
              />
            </Grid>
          </Grid>

          <Grid container>
            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Correo"
                type="email"
                placeholder="correo@google.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={!!emailValid && formSubmitted}
                helperText={emailValid}
              />
            </Grid>

            <Grid item xs={12} sx={{mt: 2}}>
              <TextField 
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && formSubmitted}
                helperText={passwordValid}
              />
            </Grid>

            <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
              <Grid
                item
                xs={12}
                display={!!errorMessage ? '': 'none'}
              >
                <Alert severity="error">{ errorMessage }</Alert>
              </Grid>
              <Grid item xs={12}>
                <Button 
                  variant="contained" 
                  fullWidth 
                  type="submit"
                  disabled={isCheckingAuthentication}  
                >
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid container direction="row" justifyContent="end">
            <Typography sx={{mr: 1}}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} color="inherit" to="/auth/login">
              Ingresar
            </Link>
          </Grid>
        </form>
      </>
    </AuthLayout>
  )
}
