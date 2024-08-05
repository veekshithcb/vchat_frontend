import React from "react";
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper } from "@mui/material";

const Vee = () => {

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={0}>
                <Grid  className="users-list" item xs={6}>
                    <Item>
                        <h1>dvddvdv</h1>
                        <h1>dvddvdv</h1>
                        <h1>dvddvdv</h1>
                        <h1>dvddvdv</h1>
                    </Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>xs=6 </Item>
                </Grid>
            </Grid>
        </Box>

    )
}

export default Vee