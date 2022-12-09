import {Box, Button, Container, Typography} from '@mui/material';
// material
import {styled} from '@mui/material/styles';
import {Link as RouterLink} from 'react-router-dom';
// components

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({theme}) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

export default function Page403() {
  return (
    <RootStyle>
      <Container>
        <Box sx={{maxWidth: 480, margin: 'auto', textAlign: 'center'}}>
          <Box
            component={Typography}
            variant="h1"
            sx={{height: 160, mx: 'auto', my: {xs: 5, sm: 10}, fontSize: '180px !important'}}
          >
            403
          </Box>
          <Typography variant="h3" paragraph>
            Bạn chưa có quyền truy cập vào trang này!
          </Typography>

          <Typography sx={{color: 'text.secondary'}}>
            Liên hệ với quản trị viên để được cấp quyền truy cập.
          </Typography>
        </Box>
      </Container>
    </RootStyle>
  );
}
