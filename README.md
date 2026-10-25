# DiveLog

DiveLog is a React single-page application built with Vite and tested
with Vitest.

## Requirements

-   Node.js 22.12 or newer
-   npm
-   A local `src/ApiKey.js` file containing the Firebase and Google Maps
    API key exports expected by the app. This file is ignored by Git;
    obtain its values through the project's approved configuration
    channel.

## Getting started

Install dependencies:

``` sh
npm install
```

Start the Vite development server:

``` sh
npm start
```

Vite prints the local URL in the terminal (usually
http://localhost:5173).

## Tests

Run the test suite once:

``` sh
npm test
```

Run Vitest in watch mode:

``` sh
npm run test:watch
```

## Production build and deployment

Build the app into `build/`:

``` sh
npm run build
```

Deploy with:

``` sh
npm run deploy
```

The deploy script rebuilds the app and copies `build/` to the configured
deployment host. 

### Deploy to Firebase Hosting

Firebase Hosting deployment is separate from `npm run deploy`, which
copies the build to the project's other configured deployment host.

### Prerequisites

-   Access to the Firebase project used by DiveLogProd.

-   Firebase CLI installed:

    ``` sh
    npm install -g firebase-tools
    ```

-   Node.js 22.12 or newer, as required by this project.

### First-time setup

Sign in to Firebase:

``` sh
firebase login
```

List the Firebase projects available to your account and identify the
correct project ID:

``` sh
firebase projects:list
```

From the repository root, select the correct Firebase project:

``` sh
firebase use <PROJECT_ID>
```

Replace `<PROJECT_ID>` with the actual Firebase project ID. Do not
assume the Firebase Console display name is the project ID.

### Build and deploy

Install dependencies and create a production build:

``` sh
npm install
npm run build
```

Check that the build output directory matches the `hosting.public`
setting in `firebase.json`. This repository's Firebase Hosting
configuration currently specifies `build`. Vite's default output
directory is `dist`, unless the Vite configuration overrides it (for
example, with `build.outDir: "build"`). If the directories do not match,
update one of the configurations so Firebase serves the newly generated
files.

Once the output directory is correct, deploy only Firebase Hosting:

``` sh
firebase deploy --only hosting
```

After deployment, open the Hosting URL printed by the CLI. The
production site currently uses:

-   https://divelogprod.web.app
-   https://divelogprod.firebaseapp.com

### Subsequent deployments

After committing your changes to Git, pull or check out the desired
commit on the machine you deploy from, then run:

``` sh
npm install
npm run build
firebase deploy --only hosting
```

A Git commit by itself does not publish the app unless a CI/CD
deployment workflow has been configured.

### Troubleshooting

-   **Wrong or old files are published:** verify that the build output
    directory matches `hosting.public` in `firebase.json`, then rebuild
    and deploy again.
-   **Permission or project errors:** run `firebase login`, check
    `firebase projects:list`, and select the correct project with
    `firebase use`.
-   **Need to deploy to the other configured host:** `npm run deploy` is
    a different script and is not the Firebase Hosting deployment
    command.
