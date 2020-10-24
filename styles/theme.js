import { createMuiTheme } from '@material-ui/core/styles';

import colors from './_colors.module.scss'

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: colors.affirmBlue,
        },
    },
    props: {
        MuiTextField: {
            variant: "outlined"
        }
    },
    overrides: {
        MuiTextField: {
            root: {
                marginBottom: '10px'
            }
        }
    }
});
