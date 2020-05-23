# types-noflo
TypeScript type declarations for `noflo`

**Warning:** While I've tried to make this as accurate as possible, errors may have been made. 
If you find a discrepancy, [file an issue](https://github.com/am01264/types-fbp-graph/issues/new) and I'll fix it for you.

## How To Use

### Step 1 : Installation
Install into your project with `npm` as follows:

```sh
$ npm install types-noflo
```

### Step 2: Include `typeRoots` in your `tsconfig.json`

In your `tsconfig.json` file, add the following

```javascript
{
    // ...
    "compilerOptions": {
        //...
        "typeRoots": [
            // Include this project
            "./node_modules/types-noflo/",

            // ...and it's dependencies:
            "./node_modules/types-fbp-graph/", 

            // ...and don't forget to add:
            "./node_modules/@types/"
            // If you do forget, other @types/* won't load. 
        ]
        //...
    }
    // ...
}
```

...and that's it.
