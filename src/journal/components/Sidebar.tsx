import { Box, Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';

export const Sidebar = ({drawerWidth}: {drawerWidth: number}) => {
  return (
    <Box
        component="nav"
        sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
    >
        <Drawer
            variant="permanent" //temporary
            open
            sx={{
                display: {sx: 'block'},
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth
                }
            }}
        >
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Luisin
                </Typography>
            </Toolbar>
            <Divider />

            <List>
                {
                    ['Enero', 'Febrero', 'Marzo', 'Abril'].map(text => 
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={text} />
                                    <ListItemText secondary={'sa dsa sddsssdasaddsa asddsa sd '} />
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    )
                }
            </List>

        </Drawer>
    </Box>
  )
}
