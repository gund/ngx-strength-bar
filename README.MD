# ngx-strength-bar

> Extendable strength bar for Angular

[![Travis CI](https://img.shields.io/travis/gund/ngx-strength-bar/master.svg?maxAge=2592000)](https://travis-ci.org/gund/ngx-strength-bar)
[![Coverage](https://img.shields.io/codecov/c/github/gund/ngx-strength-bar.svg?maxAge=2592000)](https://codecov.io/gh/gund/ngx-strength-bar)
[![Code Climate](https://img.shields.io/codeclimate/github/gund/ngx-strength-bar.svg?maxAge=2592000)](https://codeclimate.com/github/gund/ngx-strength-bar)
[![Npm](https://img.shields.io/npm/v/ngx-strength-bar.svg?maxAge=2592000)](https://badge.fury.io/js/ngx-strength-bar)
[![Npm Downloads](https://img.shields.io/npm/dt/ngx-strength-bar.svg?maxAge=2592000)](https://www.npmjs.com/package/ngx-strength-bar)
[![Licence](https://img.shields.io/npm/l/ngx-strength-bar.svg?maxAge=2592000)](https://github.com/gund/ngx-strength-bar/blob/master/LICENSE)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![Greenkeeper badge](https://badges.greenkeeper.io/gund/ngx-strength-bar.svg)](https://greenkeeper.io/)

## Installation

```bash
$ npm install ngx-strength-bar --save
```

## Attention

This is still Work In Progress (WIP)

## Usage

Import `StrengthBarModule` in your app module:
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { StrengthBarModule } from 'ngx-strength-bar';

@NgModule({
  imports: [
    BrowserModule,
    StrengthBarModule.forRoot(),
  ]
})
export class AppModule { }
```
(Only import in your root module with `.forRoot()`! In other submodules just import a module itself.)

Then in your component template use `ngx-strength-bar` component:
```ts
import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AdvancedRenderer, AdvancedRendererMethod, elementExpression } from 'ngx-strength-bar';

@Component({
  selector: 'my-component',
  template: `<ngx-strength-bar [string]="somePassword"></ngx-strength-bar>`
})
class MyComponent  {
  somePassword: string;
}
```

## Documentation

**TBD**

## License

MIT © [Alex Malkevich](malkevich.alex@gmail.com)
