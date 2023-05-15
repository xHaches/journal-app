import { Box, Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Grid } from '@mui/material';
import { TurnedInNot } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { SidebarItem } from './SidebarItem';

export const Sidebar = ({drawerWidth}: {drawerWidth: number}) => {

    const { value: { displayName } } = useSelector((state: RootState) => state.auth);
    const { value: { notes } } = useSelector((state: RootState) => state.journal);


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
                        { displayName }
                    </Typography>
                </Toolbar>
                <Divider />

                <List>
                    {
                        notes.map(note => 
                            <SidebarItem {...note} key={note.id} />    
                        )
                    }
                </List>

            </Drawer>
        </Box>
    )
}
