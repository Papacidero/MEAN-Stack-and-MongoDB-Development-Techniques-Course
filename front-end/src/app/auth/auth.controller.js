export class AuthController {
  constructor ($auth) {
    'ngInject';
    
    this.$auth = $auth;
    
  }
  register(){
    console.log('');
    this.$auth.signup(
      {email: this.user}
    );
  };
}
