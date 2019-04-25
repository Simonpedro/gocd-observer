import amber from '@material-ui/core/colors/amber'
import green from '@material-ui/core/colors/green'
import IconButton from '@material-ui/core/IconButton'
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { withStyles } from '@material-ui/core/styles'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import CloseIcon from '@material-ui/icons/Close'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import WarningIcon from '@material-ui/icons/Warning'
import classNames from 'classnames'
import * as React from 'react'

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
}

const styles1 = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
})

interface ICustomSnackbarProps extends SnackbarProps {
    variant: keyof typeof variantIcon
}

const CustomSnackbar = ({
    variant,
    classes,
    ...restProps
}: ICustomSnackbarProps) => {
    return (
        <Snackbar {...restProps} classes={classes}>
            <MySnackbarContentWrapper variant={variant} {...restProps} />
        </Snackbar>
    )
}

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props
    const Icon = variantIcon[variant]

    const actions = []

    if (onClose) {
        actions.push(
            <IconButton
                key="close"
                aria-label="Close"
                color="inherit"
                className={classes.close}
                onClick={onClose}
            >
                <CloseIcon className={classes.icon} />
            </IconButton>
        )
    }

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon
                        className={classNames(
                            classes.icon,
                            classes.iconVariant
                        )}
                    />
                    {message}
                </span>
            }
            action={actions}
            {...other}
        />
    )
}

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent)

export default CustomSnackbar
