<h1 align="center"> Webster </h1>


<h3 align="center">The home for various packages maintained by Groww web team.</h3>
<br/>

<p align="center">
  <a href="https://tech.groww.in"><img alt="tech.groww.in" src="https://img.shields.io/badge/tech.groww.in-333?logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAA0lBMVEUAAAANzKFkd/dodvRbb/1eb/5dcfoHzJ9abv0Dy50Dypxcb/0GyZ1fc/pcb/oZ3sJhdvcPyJ4Xz6YYx6ED26kCypxJh/EG67UDyZwE4q4D2KdecP4G67YEzqBAn+lecP0Eyp0EypwO88MK9b8GyZ0J361fdPddb/9Xav9cbf8F+L8D7LVabf9Za/8C4KwB16YBzZ4B1KNFj/AN8soE8bkB3KlUefpHivJBl+0wtuIa3tMT588E9LsD57IBypwW4c8S6s0K98cH/MQD6bMD57EC4q7rGKjVAAAAJ3RSTlMAIBkL29V9VvDW0bxzW1koJhYNCO7u3Nzb2djTwMC+urW1gYF/WSYSVnH0AAAAtUlEQVQY00XM1xaCMBBF0Qkg9t57N5goRUAFAfv//5IDUTlP2XdlDYhkSZIhraZOh5miuvm5rFC63e72SuXrHBWDlkuWmkKx2JrWqeKg0v9wui7xfjH+n/hwYaMGSBm6O5yPwrxPcDh69t33Tucb4/qAgDzxH8wJmG2jjXEDYMEcHnLuBGhzBQDVbqi7+vv1RPcIYOuWYVmG6xpmOwtJ2XwUmZZl5tEiUpoXCrMSgbRmvd4Urw9Asxn2jhARUgAAAABJRU5ErkJggg==" /></a>
  <a href="https://github.com/Groww"><img alt="github" src="https://img.shields.io/badge/Groww-333?logo=github" /></a>
  <a href="https://twitter.com/GrowwEngg"><img alt="twitter" src="https://img.shields.io/twitter/follow/GrowwEngg?label=%40GrowwEngg&style=flat&logo=twitter" /></a>
</p>

<p align="center">
  <a href="https://github.com/Groww/webster/blob/main/LICENSE"><img alt="Github License" src="https://img.shields.io/github/license/Groww/webster?color=51C838"/> </a>
  <a href="https://github.com/Groww/webster/issues"><img alt="Issues" src="https://img.shields.io/github/issues/Groww/webster?color=51C838"/> </a>
</p>

## What's inside?

This monorepo contains the following packages:

### Packages

- `icon-store`: Icon Library customized for use in Groww.  [![npm version](https://badge.fury.io/js/@groww-tech%2Ficon-store.svg)](https://badge.fury.io/js/@groww-tech%2Ficon-store)
- `react-charts`: This library covers charting needs of Groww. [![npm version](https://badge.fury.io/js/@groww-tech%2Freact-charts.svg)](https://badge.fury.io/js/@groww-tech%2Freact-charts)
- `base-css`: Base CSS classes used by all Groww Web Projects. [![npm version](https://badge.fury.io/js/@groww-tech%2Fbase-css.svg)](https://badge.fury.io/js/@groww-tech%2Fbase-css)
- `tsconfig`: Shared TypeScript config for Groww projects. [![npm version](https://badge.fury.io/js/@groww-tech%2Ftsconfig.svg)](https://badge.fury.io/js/@groww-tech%2Ftsconfig)
- `eslint-config`: Standard Eslint config adopted in Groww. Customized as per requirement and preferences of devs in Groww. [![npm version](https://badge.fury.io/js/@groww-tech%2Feslint-config.svg)](https://badge.fury.io/js/@groww-tech%2Feslint-config)
- `eslint-plugin-internal`: ESLint Plugin with customized rules as per requirement and preferences of devs in Groww. [![npm version](https://badge.fury.io/js/@groww-tech%2Feslint-plugin-internal.svg)](https://badge.fury.io/js/@groww-tech%2Feslint-plugin-internal)
- `stylelint-config`: Standard Stylelint config adopted in Groww. Customized as per requirement and preferences of devs in Groww. [![npm version](https://badge.fury.io/js/@groww-tech%2Fstylelint-config.svg)](https://badge.fury.io/js/@groww-tech%2Fstylelint-config)
- `ui-toolkit`: Standard UI Library adopted in Groww. Customized as per requirement and preferences of devs in Groww. [![npm version](https://badge.fury.io/js/@groww-tech%2Fui-toolkit.svg)](https://badge.fury.io/js/@groww-tech%2Fui-toolkit)


### Getting Started
Clone this repository and install all the dependencies by running  `npm install`  on root folder.

### Build

To build all packages, run the following command:

```
npm run build
```

### Develop

To develop all packages, run the following command:

```
npm run dev
```

<br/>

To build or develop a specific package, change directory to the package folder and run those commands in that folder.

Task execution can also be scoped by passing scope argument to the command.
```
npm run build -- --scope="*icon-store"
```
This command when executed on root folder will build only the `icon-store` package.


Read more about scoped tasks in Turborepo [here](https://turborepo.org/docs/features/scopes).

<br>

*These packages are for Groww projects. Use at your own risk.*
