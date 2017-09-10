'use strict';

QUnit.module('Тестируем функцию plainify', function () {
	QUnit.test('plainify работает правильно', function (assert) {
		assert.deepEqual(plainify({foo: 'bar', baz: 42}), {'foo': 'bar', 'baz': 42});

		const nested1 = {
			deep: {
				foo: 'bar',
				baz: 42
			}
		};

		const plain1 = {
			'deep.foo': 'bar',
			'deep.baz': 42
		};

		assert.deepEqual(plainify(nested1), plain1);

		const nested2 = {
			deep: {
				foobar: 0,
				nested: {
					object: {
						fields: {
							foo: 42,
							bar: 42,
							baz: 42,
						}
					}
				}
			}
		};

		const plain2 = {
			'deep.foobar': 0,
			'deep.nested.object.fields.foo': 42,
			'deep.nested.object.fields.bar': 42,
			'deep.nested.object.fields.baz': 42
		};

		assert.deepEqual(plainify(nested2), plain2);
		//work with undefined
		const nested3 = {
			really: 1,
			deep: {
				foobar: undefined,
				nested: {
					object: {
						fields: {
							foo: 0,
							bar: 'null',
							baz: undefined,
						}
					}
				}
			}
		};

		const plain3 = {
			'really': 1,
			'deep.foobar': undefined,
			'deep.nested.object.fields.foo': 0,
			'deep.nested.object.fields.bar': 'null',
			'deep.nested.object.fields.baz': undefined,
		};

		//work with arrays
		assert.deepEqual(plainify(nested3), plain3);
		const nested4 = {
			really: 1,
			deep: {
				foobar: 0,
				people: [
					{name: 'Habib', id: 123},
					{name: 'Marie', id: 783},
					{name: 'Petya', id: 666}
				]	
			}
		};

		const plain4 = {
			'really': 1,
			'deep.foobar': 0,
			'deep.people.0.name': 'Habib',
			'deep.people.0.id': 123,
			'deep.people.1.name': 'Marie',
			'deep.people.1.id': 783,
			'deep.people.2.name': 'Petya',
			'deep.people.2.id': 666,	
		};

		assert.deepEqual(plainify(nested4), plain4);
	});
});
