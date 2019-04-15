import * as React from 'react';
import styled from 'styled-components'
import { Box, Heading, Form, FormField, Button, Text } from "grommet"
import { ExtensionOptions } from '../types';


export interface ViewProps {
    onOptionsChange: (options: ExtensionOptions) => void
    loading: boolean
    message: string | null,
    options: ExtensionOptions
}

const View = ({options, onOptionsChange, message, loading}: ViewProps) => {

    const onFormSubmit = React.useCallback((e) => {
        onOptionsChange({
            slackApiKey: e.value.slackApiKey,
            slackChannel: e.value.slackChannel
        })
    }, [onOptionsChange])


    return (

        <Root>
            <Box border="all" pad="medium">
                <Heading level="3">GoCD Observer</Heading>
                <Form onSubmit={onFormSubmit} value={options}>
                    <FormField name="slackApiKey" label="Slack API Key" />
                    <FormField name="slackChannel" label="Slack channel" />
                    <Button type="submit" primary label="Save" disabled={loading}/>
                </Form>
                {message ? <Text>{message}</Text> : null}
            </Box>
        </Root>
    )
}
export default View;


const Root = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center
`
