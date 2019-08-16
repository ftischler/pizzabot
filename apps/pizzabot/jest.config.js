module.exports = {
  name: 'pizzabot',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/pizzabot',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
