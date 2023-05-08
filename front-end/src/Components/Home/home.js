import { Grid } from '@mui/material';
const Home = () => {

    return (
        <>
            {//<Banner />
            }
            <Grid container>
                <Grid item lg={2} xs={12} sm={2}>
                    {//<Categories />
                    }
                    woohoho
                </Grid>
                <Grid container item xs={12} sm={10} lg={10}>
                    {//<Posts />
                    }
                </Grid>
            </Grid>
        </>
    )
}
export default Home;