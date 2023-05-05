import { AuthLayout } from "../layout/AuthLayout"
import { Grid, Typography, TextField, Button, Link } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom';

export const RegisterPage = () => {
  return (
    <AuthLayout title="Login">
      <form>
        <Grid container>
          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label="Nombre completo"
              type="text"
              placeholder="Jonh doe"
              fullWidth
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
            />
          </Grid>

          <Grid item xs={12} sx={{mt: 2}}>
            <TextField 
              label="Contraseña"
              type="password"
              placeholder="Contraseña"
              fullWidth
            />
          </Grid>

          <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth>
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
    </AuthLayout>
  )
}
