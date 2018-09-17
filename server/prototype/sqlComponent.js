const mysql = require('mysql');
const sqlcfg = require('../config/sqlcfg');
const baseComponent = require('./baseComponent');

class sqlComponent extends baseComponent {
    constructor() {
        super();
        this.mycon = {
            host: sqlcfg.host,
            user: sqlcfg.user,
            password: sqlcfg.password,
            port: sqlcfg.port,
            database: sqlcfg.database
        }
        this.pool = null;
    }

    handleError() {
        if (err) {
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                connect();
            } else {
                console.error(err.stack || err);
            }
        } else {
            console.log('Connect to MySql://' + this.mycon.host + ':' + this.mycon.port + '/' +  this.mycon.database + ' OK.');
        }
    }

    connect() {
        this.pool = mysql.createPool(this.mycon);
        // this.mysqlc.connect(this.handleError);
        // this.mysqlc.on('error', this.handleError);
    }

    queryPromise(sql) {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, con) => {
                con.query(this.queryPromise, sql, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        });
    }
}