'use strict';

let express = require('express');
let Admin = require('../controller/admin/admin');

const router = express.Router();

router.post('/adminLogin', Admin.adminLogin);
router.post('/adminRegister', Admin.adminRegister);
router.get('/singout', Admin.singout);
