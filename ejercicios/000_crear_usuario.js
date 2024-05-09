const fb = require('./fb').default;
const fakeuser = require('./000_fakeuser')

const crearUsuario = async () => {
    console.log(this.email, this.pass)
    await fb.auth.createUserWithEmailAndPassword(fakeuser.email, fakeuser.pass);
}

crearUsuario()
    .then((res) => {
        console.log('Usuario creado')
        process.exit()
    })
    .catch(e => {
        console.log('Error', e.message);
        process.exit()
    })