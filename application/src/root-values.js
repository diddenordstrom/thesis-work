import { dbMysql, dbMongo } from './db.js';

const queryDB = (sql, args) => new Promise((resolve, reject) => {
    dbMysql.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        rows.changedRows || rows.affectedRows || rows.insertId ? resolve(true) : resolve(rows);
    });
});

var root = {
    hello: () => {
        return 'Hello world!';
    },
};

var rootMysql = { 
    books: {
        title: () => {
            return 'Unknown';
        },
        author: () => {
            return 'Unknown';
        },
        getBooks: (args, req) => queryDB("select * from books", null).then(data => data),
        getBookInfo: (args, req) => queryDB("select * from books where id = ?", [args.id]).then(data => data[0])
    }
}
var rootMongo = {
    books: {
        title: () => {},
        getBooks: () => {
            return dbMongo.collection("books").find().toArray()
        },
        author: () => {
            return 'Unknown';
        },
        getBookInfo: (args, req) => "Not ready yet"
    },
    foo: {
        foo: () => {
            return "test"
        } ,
        getFoos: () => {
            return dbMongo.collection("foo").find().toArray()
            /*
            return [{
                "foo": "foo",
                "bar": "bar"
            }]
            */
        }
    },
    libraries: {
        getLibraries: () => {
            return dbMongo.collection("libraries").find().toArray()
        },
        getLibrariesWithBooks: () => {
            dbMongo.collection("libraries").find().toArray()
            .then(function(libraries){
                libraries.forEach( (element, index, array) => {
                    console.log(`Library ID : ${element.id}`)
                    dbMongo.collection("books").find({ library_id : element.id }).toArray() //Find parameters is wrong
                    .then(function(books){
                        array[index].books = books
                        console.log(array[index])
                    })
                })
                console.log(libraries)
            })
        }
    }
}

export { root, rootMysql, rootMongo }