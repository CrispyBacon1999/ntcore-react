<center>![NT4 React](/docs/NT4-React.png)</center>

<center>
<h1>NT4 React</h1>

Quickly connect your React App to NetworkTables.

[![npm](https://img.shields.io/npm/dy/ntcore-react)](https://www.npmjs.com/package/ntcore-react)
![GitHub issues](https://img.shields.io/github/issues-raw/CrispyBacon1999/ntcore-react)
[![codecov](https://codecov.io/github/CrispyBacon1999/ntcore-react/branch/main/graph/badge.svg?token=9GXJJD9SJ5)](https://codecov.io/github/CrispyBacon1999/ntcore-react)

</center>

## ⚡️ Quick start

First, create your app using your favorite bundler ([Vite](https://vitejs.dev/) is a great option if you don't have a preference. All of the example code here will be assuming you're using vite)

```bash
npm create vite
# yarn create vite
```

Follow the steps for project creation in the command line, then after your dependencies are installed, run the following command to install `ntcore-react`.

```bash
npm install ntcore-react ntcore-ts-client
# yarn add ntcore-react ntcore-ts-client
```

### Usage

Wrap the top level of your app with a `NTProvider` element.

```tsx
import { NTProvider } from "ntcore-react";

function App() {
    return (
        <NTProvider teamNumber={5712}>
            {/** Everything else for your app here */}
        </NTProvider>
    );
}
```

The `NTProvider` component supports using either a team number or a uri to connect with.

### Getting NetworkTable Values

There are 2 different hooks provided for getting values from your robot.

#### `useNTValue()`

Returns the value at the provided key, with live updates whenver it changes.

```tsx
import { NetworkTableTypeInfos } from "ntcore-ts-client";
import { useNTValue } from "ntcore-react";

const YourComponent = () => {
    const intakeExtended = useNTValue<boolean>(
        "/Intake/extended",
        NetworkTableTypeInfos.kBoolean,
        false
    );

    return <div>Intake Extended: {intakeExtended}</div>;
};
```

This has a few required parameters to work.

| Parameter    | Type                  | Description                                                                                                                                                                 |
| ------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key          | string                | The key in NetworkTables to track the value from                                                                                                                            |
| ntType       | NetworkTablesTypeInfo | The native type of the value in the table                                                                                                                                   |
| defaultValue | NTTopicTypes          | The default value, used before the value is retrieved. Also will handle typing usually (although not for strings, which is just assumes the type will be what the value is. |

#### `useNTState()`

Returns the value at the provided key, with live updates whenver it changes.
Also gives access to modify values, allowing you to talk to the robot over NetworkTables.

```tsx
import { NetworkTableTypeInfos } from "ntcore-ts-client";
import { useNTState } from "ntcore-react";

const YourComponent = () => {
    const [ledColors, setColors] = useNTState<boolean>(
        "/LED/color",
        NetworkTableTypeInfos.kString,
        "#ffffff"
    );

    const setColorsToRed = () => {
        setColors("#ff0000");
    };

    const setColorsToBlue = () => {
        setColors("#0000ff");
    };

    return (
        <div>
            <div style={{ backgroundColor: ledColors }}>LEDs</div>
            <button onClick={setColorsToRed}>Red LEDS</button>
            <button onClick={setColorsToBlue}>Blue LEDS</button>
        </div>
    );
};
```

This has a few required parameters to work.

| Parameter    | Type                  | Description                                                                                                                                                                 |
| ------------ | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| key          | string                | The key in NetworkTables to track the value from                                                                                                                            |
| ntType       | NetworkTablesTypeInfo | The native type of the value in the table                                                                                                                                   |
| defaultValue | NTTopicTypes          | The default value, used before the value is retrieved. Also will handle typing usually (although not for strings, which is just assumes the type will be what the value is. |
