module.exports = function (w){
  return{
    files: [
      'src/**/*.ts'
    ],
    "tests": [
      "tests/**/*Spec.ts"
     ],
  
  "testFramework": "jasmine",
  
  "env": {
    type: 'node'
  }
  };
};