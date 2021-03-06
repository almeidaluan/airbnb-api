'use strict'
//Attempt faz o login e retorna o token jwt.
class SessionController {
    async create( { request,auth } ){
    
        const { email,password } = request.all()
        
        const token = await auth.attempt(email,password)

        return token
    
    }
}

module.exports = SessionController
