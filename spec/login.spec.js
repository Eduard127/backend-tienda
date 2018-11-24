const frisby = require('frisby');
const Joi = frisby.Joi; // Frisby exports Joi for convenience on type assersions

const user = {
  email: "example3@hotmail.com",
  password: "teletubie"
};

it('Probando el Login correcto', function () {
  return frisby
    .post('http://localhost:3000/user/login', user)
    .expect('status', 200)
    .expect('json', 'status', true)
    .expect('jsonTypes', 'content', {
      id: Joi.number().required(),
      email: Joi.string().required(),
      token: Joi.string().required()
    })
    .expect('json', 'content.email', user.email)
    .expect('json', 'content.password', '*****')
});

it('Probando el Login incorrecto', function () {
  return frisby
    .post('http://localhost:3000/user/login', {
      email: "example31@hotmail.com",
      password: "teletubbie"
    })
    .expect('status', 200)
    .expect('json', 'status', false)
    .expect('json', 'content', 'usuario no esta')
});