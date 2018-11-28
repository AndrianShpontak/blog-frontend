import React, { Component } from 'react'
import { Alert } from 'react-alert'

class Alert extends Component  {
    render () {
        return (
            <Alert>
                {alert => (
                    <button
                        onClick={() => {
                            alert.show('You must be logged in')
                        }}
                    >
                        Show Alert
                    </button>
                )}
            </Alert>
        )
    }
}

export default Alert;