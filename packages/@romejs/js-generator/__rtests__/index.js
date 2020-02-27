/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*

import generate from '@romejs/js-generator';

describe('generation', function() {
  it('multiple sources', function() {
    const sources = {
      'a.js': 'function hi (msg) { console.log(msg); }\n',
      'b.js': "hi('hello');\n",
    };
    const parsed = Object.keys(sources).reduce(function(_parsed, filename) {
      _parsed[filename] = parse(sources[filename], {
        sourceFilename: filename,
      });
      return _parsed;
    }, {});

    const combinedAst = {
      type: 'File',
      program: {
        type: 'Program',
        sourceType: 'module',
        body: [].concat(
          parsed['a.js'].program.body,
          parsed['b.js'].program.body,
        ),
      },
    };

    const generated = generate(combinedAst, { sourceMaps: true }, sources);

    expect(generated.map).toEqual(
      {
        version: 3,
        sources: ['a.js', 'b.js'],
        mappings:
          'AAAA,SAASA,EAAT,CAAaC,GAAb,EAAkB;AAAEC,UAAQC,GAAR,CAAYF,GAAZ;AAAmB;;ACAvCD,GAAG,OAAH',
        names: ['hi', 'msg', 'console', 'log'],
        sourcesContent: [
          'function hi (msg) { console.log(msg); }\n',
          "hi('hello');\n",
        ],
      },
      'sourcemap was incorrectly generated',
    );

    expect(generated.rawMappings).toEqual(
      [
        {
          name: undefined,
          generated: { line: 1, column: 0 },
          source: 'a.js',
          original: { line: 1, column: 0 },
        },
        {
          name: 'hi',
          generated: { line: 1, column: 9 },
          source: 'a.js',
          original: { line: 1, column: 9 },
        },
        {
          name: undefined,
          generated: { line: 1, column: 11 },
          source: 'a.js',
          original: { line: 1, column: 0 },
        },
        {
          name: 'msg',
          generated: { line: 1, column: 12 },
          source: 'a.js',
          original: { line: 1, column: 13 },
        },
        {
          name: undefined,
          generated: { line: 1, column: 15 },
          source: 'a.js',
          original: { line: 1, column: 0 },
        },
        {
          name: undefined,
          generated: { line: 1, column: 17 },
          source: 'a.js',
          original: { line: 1, column: 18 },
        },
        {
          name: 'console',
          generated: { line: 2, column: 0 },
          source: 'a.js',
          original: { line: 1, column: 20 },
        },
        {
          name: 'log',
          generated: { line: 2, column: 10 },
          source: 'a.js',
          original: { line: 1, column: 28 },
        },
        {
          name: undefined,
          generated: { line: 2, column: 13 },
          source: 'a.js',
          original: { line: 1, column: 20 },
        },
        {
          name: 'msg',
          generated: { line: 2, column: 14 },
          source: 'a.js',
          original: { line: 1, column: 32 },
        },
        {
          name: undefined,
          generated: { line: 2, column: 17 },
          source: 'a.js',
          original: { line: 1, column: 20 },
        },
        {
          name: undefined,
          generated: { line: 3, column: 0 },
          source: 'a.js',
          original: { line: 1, column: 39 },
        },
        {
          name: 'hi',
          generated: { line: 5, column: 0 },
          source: 'b.js',
          original: { line: 1, column: 0 },
        },
        {
          name: undefined,
          generated: { line: 5, column: 3 },
          source: 'b.js',
          original: { line: 1, column: 3 },
        },
        {
          name: undefined,
          generated: { line: 5, column: 10 },
          source: 'b.js',
          original: { line: 1, column: 0 },
        },
      ],
      'raw mappings were incorrectly generated',
    );

    expect(generated.code).toBe(
      "function hi(msg) {\n  console.log(msg);\n}\n\nhi('hello');",
    );
  });

  it('identifierName', function() {
    const code = 'function foo() { bar; }\n';

    const ast = parse(code, { filename: 'inline' }).program;
    const fn = ast.body[0];

    const id = fn.id;
    id.name += '2';
    id.loc.identifierName = 'foo';

    const id2 = fn.body.body[0].expression;
    id2.name += '2';
    id2.loc.identiferName = 'bar';

    const generated = generate(
      ast,
      {
        filename: 'inline',
        sourceFileName: 'inline',
        sourceMaps: true,
      },
      code,
    );

    expect(generated.map).toEqual(
      {
        version: 3,
        sources: ['inline'],
        names: ['foo', 'bar'],
        mappings: 'AAAA,SAASA,IAAT,GAAe;AAAEC;AAAM',
        sourcesContent: ['function foo() { bar; }\n'],
      },
      'sourcemap was incorrectly generated',
    );

    expect(generated.rawMappings).toEqual(
      [
        {
          name: undefined,
          generated: { line: 1, column: 0 },
          source: 'inline',
          original: { line: 1, column: 0 },
        },
        {
          name: 'foo',
          generated: { line: 1, column: 9 },
          source: 'inline',
          original: { line: 1, column: 9 },
        },
        {
          name: undefined,
          generated: { line: 1, column: 13 },
          source: 'inline',
          original: { line: 1, column: 0 },
        },
        {
          name: undefined,
          generated: { line: 1, column: 16 },
          source: 'inline',
          original: { line: 1, column: 15 },
        },
        {
          name: 'bar',
          generated: { line: 2, column: 0 },
          source: 'inline',
          original: { line: 1, column: 17 },
        },
        {
          name: undefined,
          generated: { line: 3, column: 0 },
          source: 'inline',
          original: { line: 1, column: 23 },
        },
      ],
      'raw mappings were incorrectly generated',
    );

    expect(generated.code).toBe('function foo2() {\n  bar2;\n}');
  });

  it('lazy source map generation', function() {
    const code = 'function hi (msg) { console.log(msg); }\n';

    const ast = parse(code, { filename: 'a.js' }).program;
    const generated = generate(ast, {
      sourceFileName: 'a.js',
      sourceMaps: true,
    });

    expect(Array.isArray(generated.rawMappings)).toBe(true);

    expect(
      Object.getOwnPropertyDescriptor(generated, 'map'),
    ).not.toHaveProperty('value');

    expect(generated).toHaveProperty('map');
    expect(typeof generated.map).toBe('object');
  });
});

describe('programmatic generation', function() {
  it('numeric member expression', function() {
    // Should not generate `0.foo`
    const mem = t.memberExpression(
      t.numericLiteral(60702),
      t.identifier('foo'),
    );
    new Function(generate(mem).code);
  });

  it('nested if statements needs block', function() {
    const ifStatement = t.ifStatement(
      t.stringLiteral('top cond'),
      t.whileStatement(
        t.stringLiteral('while cond'),
        t.ifStatement(
          t.stringLiteral('nested'),
          t.expressionStatement(t.numericLiteral(1)),
        ),
      ),
      t.expressionStatement(t.stringLiteral('alt')),
    );

    const ast = parse(generate(ifStatement).code);
    expect(ast.program.body[0].consequent.type).toBe('BlockStatement');
  });

  it('prints directives in block with empty body', function() {
    const blockStatement = t.blockStatement(
      [],
      [t.directive(t.directiveLiteral('use strict'))],
    );

    const output = generate(blockStatement).code;
    expect(output).toBe(`{
  'use strict';
}`);
  });

  it('flow object indentation', function() {
    const objectStatement = t.objectTypeAnnotation(
      [t.objectTypeProperty(t.identifier('bar'), t.stringTypeAnnotation())],
      null,
      null,
      null,
    );

    const output = generate(objectStatement).code;
    expect(output).toBe(`{
  bar: string
}`);
  });

  it('flow object exact', function() {
    const objectStatement = t.objectTypeAnnotation(
      [t.objectTypeProperty(t.identifier('bar'), t.stringTypeAnnotation())],
      null,
      null,
      null,
      true,
    );

    const output = generate(objectStatement).code;
    expect(output).toBe(`
  bar: string
}`);
  });

  it('flow object indentation with empty leading FlowObjectTypeProperty', function() {
    const objectStatement = t.objectTypeAnnotation(
      [],
      [
        t.objectTypeIndexer(
          t.identifier('key'),
          t.anyTypeAnnotation(),
          t.numberTypeAnnotation(),
        ),
      ],
      null,
    );

    const output = generate(objectStatement).code;

    expect(output).toBe(`{
  [key: any]: number
}`);
  });
});

describe('CodeGenerator', function() {
  it('generate', function() {
    const codeGen = new CodeGenerator(t.numericLiteral(123));
    const code = codeGen.generate().code;
    expect(parse(code).program.body[0].expression.value).toBe(123);
  });
});

const suites = fixtures(`${__dirname}/fixtures`);

suites.forEach(function(testSuite) {
  describe('generation/' + testSuite.title, function() {
    testSuite.tests.forEach(function(task) {
      it(
        task.title,
        !task.disabled &&
          function() {
            const expected = task.expect;
            const actual = task.actual;
            const actualCode = actual.code;

            if (actualCode) {
              const actualAst = parse(actualCode, {
                filename: actual.loc,
                sourceType: 'module',
              });
              const result = generate(actualAst, task.options, actualCode);

              if (
                !expected.code &&
                result.code &&
                fs.statSync(path.dirname(expected.loc)).isDirectory() &&
                !process.env.CI
              ) {
                console.log(`New test file created: ${expected.loc}`);
                fs.writeFileSync(expected.loc, result.code);
              } else {
                expect(result.code).toBe(expected.code);
              }
            }
          },
      );
    });
  });
});
*/