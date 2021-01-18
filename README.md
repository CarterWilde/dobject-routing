<h1 align="center">Welcome to dobject-routing 👋</h1>
<p>
  <a href="https://www.npmjs.com/package/dobject-routing" target="_blank">
    <img alt="Version" src="https://img.shields.io/npm/v/dobject-routing.svg">
  </a>
  <a href="https://github.com/CarterWilde/object-routing#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/CarterWilde/object-routing/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/CarterWilde/object-routing/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/CarterWilde/dobject-routing" />
  </a>
</p>

> Use an object to declare your express routing.

## Install

```sh
npm install
```

## Usage

Install the package with express.
Then you can create a routes file as an example
```ts
import { ERequestType, IRouter } from "dobject-routing";

export const routes: IRouter = {
    routes: [
        {
            method: ERequestType.GET,
            handlers: [
                (req, res) => {
                    res.send("Hello");    
                }
            ]
        }
    ]
};
export default routes;
```
Finally, import and use the package as an example
```ts
import express, { Router } from 'express';
import Routing from "dobject-routing";
import routes from './routes';

const app: express.Application = express();
app.use('/', Routing(routes));
app.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
});
```

## Author

👤 **Carter J. Wilde**

* Github: [@CarterWilde](https://github.com/CarterWilde)

## 📝 License

Copyright © 2021 [Carter J. Wilde](https://github.com/CarterWilde).<br />
This project is [GNU GPL v3](https://github.com/CarterWilde/object-routing/blob/master/LICENSE) licensed.