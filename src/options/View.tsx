import {
    Card,
    CardContent,
    Divider,
    Grid,
    LinearProgress,
    TextField,
    Typography,
} from '@material-ui/core'
import * as React from 'react'
import styled from 'styled-components'
import CustomSnackbar from '../lib/CustomSnackbar'
import { IExtensionOptions } from '../types'
import AwesomeBackground from './AwesomeBackground'

export interface IViewProps {
    onOptionsChange: (options: IExtensionOptions) => void
    loading: boolean
    message: string | null
    options: IExtensionOptions
}

const View = ({ options, onOptionsChange, message, loading }: IViewProps) => {
    const handleChange = React.useCallback(
        (name: keyof IExtensionOptions) => e => {
            onOptionsChange({ ...options, [name]: e.target.value })
        },
        [options, onOptionsChange]
    )

    return (
        <>
            <CustomSnackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                open={!!message}
                variant="success"
                message={message}
            />
            <AwesomeBackground />
            <Root>
                <Grid
                    container={true}
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <Grid item={true} xs={10} md={4} lg={4}>
                        <Card>
                            {loading && <LinearProgress />}
                            <CardContent>
                                <Form noValidate={true} autoComplete="off">
                                    <Grid
                                        container={true}
                                        direction="column"
                                        justify="center"
                                        alignItems="flex-start"
                                    >
                                        <Typography component="h6" variant="h6">
                                            Slack
                                        </Typography>
                                        <Divider variant="fullWidth" />
                                        <TextField
                                            label="Slack API key"
                                            value={options.slackApiKey}
                                            onChange={handleChange(
                                                'slackApiKey'
                                            )}
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth={true}
                                        />

                                        <TextField
                                            label="Slack channel"
                                            value={options.slackChannel}
                                            onChange={handleChange(
                                                'slackChannel'
                                            )}
                                            margin="normal"
                                            variant="outlined"
                                            fullWidth={true}
                                        />
                                    </Grid>
                                </Form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Root>
        </>
    )
}
export default View

const Root = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 100;
`

const Form = styled.form``
