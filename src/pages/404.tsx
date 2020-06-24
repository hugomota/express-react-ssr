import Head from 'next/head'
import { Typography, Button, Box } from '@material-ui/core'

const Error404 = () => (
  <>
    <Head>
      <title key="title">Private Cloud - Error: 404</title>
    </Head>

    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="flex-end" height="40vh">
      <Box fontSize="65px">
        <Typography variant="inherit">404</Typography>
      </Box>
      <Box mb="30px">
        <Box mb="10px">
          <Typography component="span" variant="h5">
            Whooops...page not found!
          </Typography>
        </Box>
        <Typography component="span" variant="body2">
          The page you are looking for doesn't exist.
        </Typography>
      </Box>
      <Box>
        <Button variant="contained" color="primary" href="/">
          Go to Home
        </Button>
      </Box>
    </Box>
  </>
)

export default Error404
