import React from 'react';
import { SwapiServiceConsumer } from '../services-context';

const withSwapiService = (Wrapped, mapToProps) => {

    return (props) => {
        return (
        <SwapiServiceConsumer>
            {
                (SwapiService) => {
                    const serviceProps = mapToProps(SwapiService);

                    return (
                    <Wrapped {...props} {...serviceProps} />
                    )
                }
            }
        </SwapiServiceConsumer>
        )
    }

};

export default withSwapiService;