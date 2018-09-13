const mysql = require('mysql2/promise');
const SQL = require('sql-template-strings')

const getConnection = () => {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: 'pager',
        insecureAuth : true,
    });
}

const execute = async (query) => {
    let connection;
    try {
        const connection = await getConnection();
        const [rows] = await connection.execute(query);
        return rows;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        connection && connection.end();
    }

}

const get = async () => {
    execute(SQL`SELECT * FROM Organizations`);
}

const getByName = async (name) => {
    execute(SQL`SELECT * FROM Organizations WHERE Name = ${name}`);
}

const getByCode = async (code) => {
    execute(SQL`SELECT * FROM Organizations WHERE Code = ${code}`);    
}

const create = async (organization) => {
    execute(SQL`INSERT INTO Organizations (Name, Description, Url, Type, Code) VALUES ('${organization.name}', '${organization.description}', '${organization.url}', '${organization.type}', '${organization.code});`);
}

const update = async () => {
   execute('SELECT * FROM Organizations'); 
}

const remove = async () => {
    execute(SQL`DELETE FROM Organizations WHERE `); 
}