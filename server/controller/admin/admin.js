'use Strict';

const sqlComponent = require('../../prototype/sqlComponent');
const crypto = require('crypto');
const formidable = require('formidable');
const dtime = require('time-formater');

class Admin extends sqlComponent {
    constructor() {
        super();
        this.adminLogin = this.adminLogin.bind(this);
        this.adminRegister = this.adminRegister.bind(this);
        
    }
}
