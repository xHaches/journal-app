import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { useMemo } from "react"
import { useDispatch } from "react-redux"
import { setActiveNote } from "../../store/journal"

export const SidebarItem = ({id, title, body, date, imgUrls}: {id: string, title: string, body: string, date: Date, imgUrls: string[]}) => {
    
    const dispatch = useDispatch();

    const newTitle = useMemo(() => {
        return title.length > 17 ? title.substring(0, 17) + '...' : title;
    }, [title]);

    const activeNote = () => {
        dispatch(setActiveNote({id, title, body, date, imgUrls}));
    }

    return (
        <ListItem disablePadding onClick={activeNote}>
            <ListItemButton>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                <Grid container>
                    <ListItemText primary={newTitle} />
                    <ListItemText secondary={body} />
                </Grid>
            </ListItemButton>
        </ListItem>
    )
}
