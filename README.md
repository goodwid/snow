# Snow

Simple cli for :

- updating the package id in cordova config.xml file 

- updating the version in cordova config.xml file 

- getting the version from cordova config.xml file 

- getting the package id from cordova config.xml file 

in a cordova mobile repo

## Installing

First, make sure you have `npm` configured so that it uses our internal nexus for the `@ingicare` scope:

```
npm config set @ingicare:registry https://nexus.ingicare.com/repository/npm-internal/
```

You also need to login into our nexus for this scope:

```
npm login --scope=@ingicare
```

```
npm install -g @ingicare/snow
```

## Usage

- For the package id update :

```
snow package <ID>
```

or

```
snow p <ID>
```

This command will replace the package id in your config.xml file with the specified ID.


- For the version update :

```
snow version <VERSION>
```

or

```
snow v <VERSION>
```

This command will replace the version in your config.xml file with the specified VERSION.

- For the package get :

```
snow get-package
```

or

```
snow gp
```

This command will return as an output the current package id present in the config.xml.

- For the version get :

```
snow get-version
```

or

```
snow gv
```

This command will return as an output the current version present in the config.xml.

snow also accepts (applicable to all commands listed above) a ```--dir or -d``` option where ```-d``` stands for ```--dir```, which can be used to specify the directory path of the config.xml in case of it is not present in the current repo.  

Example :
```
snow v 2.0.0 -d src/main/app
```

## Development

You will need node/yarn installed on your machine.

Installing dependencies:

```
yarn
```

Once you have dependencies installed you can do

```
yarn start
```

This will watch for changes and build the application in the `build` directory.

## Tests

Running tests is easy: 

```
yarn test
```

Or in watch mode:

```
yarn run watch-test
```

## Publishing

If you have the right to publish, once a new version is created simply do:

```
yarn build
cd build
npm publish

```

