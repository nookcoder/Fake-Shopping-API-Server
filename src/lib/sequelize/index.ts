import {Sequelize} from "sequelize";

let sequelize: Sequelize;

export  function initOrGetSequelize(): Sequelize{
    if(sequelize){
        return sequelize;
    }
    sequelize =  new Sequelize('test', 'root', '', {
        dialect: 'mysql',
        host: 'localhost',
        port: 3306,
        sync: {alter: true, force:true}
    });
    return sequelize;
}
