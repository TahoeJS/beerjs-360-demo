# PROTOCOLS

- Info: GET /osc/info
- State: POST /osc/state
- CheckForUpdates: POST /osc/checkForUpdates
- Commands/Execute: POST /osc/commands/execute
- Commands/Status: POST /osc/commands/status

# [INFO](https://developers.theta360.com/en/docs/v2.1/api_reference/protocols/info.html)

- Acquires basic information about the camera and supported function.

# [STATE](https://developers.theta360.com/en/docs/v2.1/api_reference/protocols/state.html)

- Acquires the camera status
- Changes in the state object content can be checked with CheckForUpdates

# [CHECKFORUPDATES](https://developers.theta360.com/en/docs/v2.1/api_reference/protocols/check_for_updates.html)

- Acquires the current status ID, and checks for changes to the State status.

# COMMANDS:

- Executes the command within the commands category

```js
{
  "name": "camera.startSession",  // Command to execute
  "parameters": {} // Input parameters required to execute each command
}
```

- camera.takePicture
- camera.startCapture
- camera.stopCapture
- camera.listFiles
- camera.delete
- camera.getLivePreview
- camera.getOptions
- camera.reset
- camera.setOptions
- camera._getMySetting
- camera._setMySetting
- camera._stopSelfTimer

# ERRORS:

```js
{
  "state": "error",
  "error": {
    "code": "unknownCommand",
    "message": "Command executed is unknown."
  }
}
```

- 400: invalidParameterName: Parameter name or option name is invalid
- 400: invalidParameterValue: Parameter value when command was issued is invalid
- 400: missingParameter: Insufficient required parameters to issue the command
- 400: unknownCommand: Invalid command is issued
- 403: canceledShooting: Shooting request cancellation of the self-timer. Returned in Commands/Status of camera.takePicture
- 403: corruptedFile: Process request for corrupted file
- 403: disabledCommand: Command cannot be executed due to the camera status
- 403: invalidFileFormat: Invalid file format specified
- 403: powerOffSequenceRunning: Process request when power supply is off
- 403: tooManyParameters: Number of parameters exceeds limit
- 503: serviceUnavailable: Processing requests cannot be received temporarily
- 503: unexpected: Other errors
