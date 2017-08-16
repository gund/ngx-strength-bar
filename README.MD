# ngx-renderer

> Advanced abstract renderer for Angular

[![Travis CI](https://img.shields.io/travis/gund/ngx-renderer/master.svg?maxAge=2592000)](https://travis-ci.org/gund/ngx-renderer)
[![Coverage](https://img.shields.io/codecov/c/github/gund/ngx-renderer.svg?maxAge=2592000)](https://codecov.io/gh/gund/ngx-renderer)
[![Code Climate](https://img.shields.io/codeclimate/github/gund/ngx-renderer.svg?maxAge=2592000)](https://codeclimate.com/github/gund/ngx-renderer)
[![Npm](https://img.shields.io/npm/v/ngx-renderer.svg?maxAge=2592000)](https://badge.fury.io/js/ngx-renderer)
[![Npm Downloads](https://img.shields.io/npm/dt/ngx-renderer.svg?maxAge=2592000)](https://www.npmjs.com/package/ngx-renderer)
[![Licence](https://img.shields.io/npm/l/ngx-renderer.svg?maxAge=2592000)](https://github.com/gund/ngx-renderer/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/gund/ngx-renderer.svg)](https://greenkeeper.io/)

## Installation

```bash
$ npm install ngx-renderer --save
```

Also please make sure you have latest version of `tslib` library

## Usage

### Default browser application

Import `AdvancedRendererModule` in your app module:
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AdvancedRendererModule } from 'ngx-renderer';

@NgModule({
  imports: [
    BrowserModule,
    AdvancedRendererModule,
  ]
})
export class AppModule { }
```

Then in your component/directive/service inject `AdvancedRenderer` and use it:
```ts
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AdvancedRenderer, AdvancedRendererMethod, elementExpression } from 'ngx-renderer';

@Component({
  selector: 'my-component',
  template: `<input type="text" #myInput placeholder="This will have auto-focus">`
})
class MyComponent implements AfterViewInit {
  @ViewChild('myInput') myInput: ElementRef;

  constructor(private renderer: AdvancedRenderer) { }

  ngAfterViewInit() {
    // This will be safely executed on Browser UI thread (or ignored if not available)
    this.renderer.execute('input.focus()', { input: elementExpression(this.myInput) })
      .then(() => console.log('Input got focus! Yay!!'));
  }
}
```

### Browser + Webworker application

All you need to do is update your AppModule. Your application logic code remains untouched!

Here is the change in your `AppModule` which now runs on Webworker thread:
```ts
import { NgModule } from '@angular/core';
import { WorkerAppModule } from '@angular/platform-webworker';
import { AdvancedRendererWorkerModule } from 'ngx-renderer';

@NgModule({
  imports: [
    WorkerAppModule,
    AdvancedRendererWorkerModule,
  ]
})
export class AppInWorkerModule { }
```

And here is the change on UI bootstrapping code:
```ts
import { bootstrapWorkerUi } from '@angular/platform-webworker';
import { ADVANCED_RENDERER_UI_PROVIDERS } from 'ngx-renderer';

bootstrapWorkerUi('app-worker.js', ADVANCED_RENDERER_UI_PROVIDERS);
```

### Server-side application

If you want to run your application on the server again just update your `AppModule`:
```ts
import { NgModule } from '@angular/core';
import { AdvancedRendererNoopModule } from 'ngx-renderer';

@NgModule({
  imports: [
    AdvancedRendererNoopModule,
  ]
})
export class AppInWorkerModule { }
```

## License

MIT © [Alex Malkevich](malkevich.alex@gmail.com)
