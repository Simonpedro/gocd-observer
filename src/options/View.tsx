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
            <MainContainer border="all" pad="medium">
                <Heading level="3" color="brand">GoCD Observer</Heading>
                <Form onSubmit={onFormSubmit} value={options}>
                    <FormField name="slackApiKey" label="Slack API Key" />
                    <FormField name="slackChannel" label="Slack channel" />
                    <Box justify="between" align="center" direction="row-reverse" wrap={false}>
                        <Box direction="row" alignSelf="start">
                            <Button type="submit" primary label="Save" disabled={loading}/>
                        </Box>
                        {message ? <Text color="brand" size="small">{message}</Text> : null}
                    </Box>
                    
                </Form>
                
            </MainContainer>
        </Root>
    )
}
export default View;


const MainContainer = styled(Box)`
    box-shadow: 1px 1px 12px 1px rgba(219,219,219,1);
`

const Root = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center
`
