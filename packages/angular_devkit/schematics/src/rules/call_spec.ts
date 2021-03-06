/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
// tslint:disable:non-null-operator
// tslint:disable:no-any
import { MergeStrategy } from '@angular-devkit/schematics';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import { Rule, SchematicContext, Source } from '../engine/interface';
import { Tree } from '../tree/interface';
import { empty } from '../tree/static';
import {
  InvalidRuleResultException,
  InvalidSourceResultException,
  callRule,
  callSource,
} from './call';


const context: SchematicContext = {
  engine: null,
  debug: false,
  strategy: MergeStrategy.Default,
} as {} as SchematicContext;


describe('callSource', () => {
  it('errors if undefined source', done => {
    const source0: any = () => undefined;

    callSource(source0, context)
      .toPromise()
      .then(() => done.fail(), err => {
        expect(err.constructor).toBe(InvalidSourceResultException);
      })
      .then(done, done.fail);
  });

  it('errors if invalid source object', done => {
    const source0: Source = () => ({} as Tree);

    callSource(source0, context)
      .toPromise()
      .then(() => done.fail(), err => {
        expect(err.constructor).toBe(InvalidSourceResultException);
      })
      .then(done, done.fail);
  });

  it('errors if Observable of invalid source object', done => {
    const source0: Source = () => Observable.of({} as Tree);

    callSource(source0, context)
      .toPromise()
      .then(() => done.fail(), err => {
        expect(err.constructor).toBe(InvalidSourceResultException);
      })
      .then(done, done.fail);
  });

  it('works with a Tree', done => {
    const tree0 = empty();
    const source0: Source = () => tree0;

    callSource(source0, context)
      .toPromise()
      .then(tree => {
        expect(tree).toBe(tree0);
      })
      .then(done, done.fail);
  });

  it('works with an Observable', done => {
    const tree0 = empty();
    const source0: Source = () => Observable.of(tree0);

    callSource(source0, context)
      .toPromise()
      .then(tree => {
        expect(tree).toBe(tree0);
      })
      .then(done, done.fail);
  });
});

describe('callRule', () => {
  it('errors if invalid source object', done => {
    const tree0 = Observable.of(empty());
    const rule0: Rule = () => ({} as Tree);

    callRule(rule0, tree0, context)
      .toPromise()
      .then(() => done.fail(), err => {
        expect(err.constructor).toBe(InvalidRuleResultException);
      })
      .then(done, done.fail);
  });

  it('errors if Observable of invalid source object', done => {
    const tree0 = Observable.of(empty());
    const rule0: Rule = () => Observable.of({} as Tree);

    callRule(rule0, tree0, context)
      .toPromise()
      .then(() => done.fail(), err => {
        expect(err.constructor).toBe(InvalidRuleResultException);
      })
      .then(done, done.fail);
  });

  it('works with undefined result', done => {
    const tree0 = empty();
    const rule0: Rule = () => undefined;

    callRule(rule0, Observable.of(tree0), context)
      .toPromise()
      .then(tree => {
        expect(tree).toBe(tree0);
      })
      .then(done, done.fail);
  });

  it('works with a Tree', done => {
    const tree0 = empty();
    const rule0: Rule = () => tree0;

    callRule(rule0, Observable.of(tree0), context)
      .toPromise()
      .then(tree => {
        expect(tree).toBe(tree0);
      })
      .then(done, done.fail);
  });

  it('works with an Observable', done => {
    const tree0 = empty();
    const rule0: Rule = () => Observable.of(tree0);

    callRule(rule0, Observable.of(tree0), context)
      .toPromise()
      .then(tree => {
        expect(tree).toBe(tree0);
      })
      .then(done, done.fail);
  });
});
