const express = require('express');
const helmet = require('helmet');
const mysql = require('mysql');
const datelib = require('./datelib');
const app = express();
const port = 3000;

var dbResultSet = [];

var con = '';
var db = '';
var sql = '';

app.use(helmet());
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/getStatus',(req,res) => {

    let analysis_id = req.query.analysis_id;

    sql = "Select * from iaudit_list_analysis where id = "+analysis_id;
    runQuery("admin_iaudit", sql, function (err, result) {
        
        let db = result[0].db_name;
        let create_datetime = result[0].create_datetime;

        /* ==== Get RCompleted === */

        sql = "Select count (*) as total_record from rcompleted ";
        
        try{
            runQuery( db, sql, (err,result) => {
            
               // if (err) throw new Error('Run Query Fn Found An Error');

            let total_record = result[0].total_record;
            console.log("Total Record "+total_record);
            
            console.log(datelib.getCurrentDateTime());

            let time_diff = datelib.getTimeDifference(create_datetime, datelib.getCurrentDateTime()) ;
            let elapsedTime = time_diff.hours+" Hour "+time_diff.minutes+" Minute "+time_diff.seconds+" Seconds ";

            let rolebuild_html = '<div class="form-group" style="margin-top: -8px"><label class="clavel">Total RCompleted : '+total_record+'</label><br></div>';
            res.jsonp({ "elapsed_time": elapsedTime, "rolebuild_html" : rolebuild_html });

            });
        }
        catch(ex){
            res.jsonp({ "error": "DB ERROR Found", "rolebuild_html" : "" });
        }
        
    });


}); // End Get Status

/* ========== Function that execute Dynamic Query ===== */

var  runQuery = function(db, sql, callback) {
    
    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: db
    });

    try{

        con.connect(function(err) {
            if (err) throw new Error('database failed to connect');
            console.log(db+ " Connected! ");
        });

        dbResultSet = [];
        
        con.query( sql , (err, res, fields) => {
        //console.log(sql);
        if (err)  return callback(err);

        if(res.length > 0 ){

            for( let i = 0; i < res.length; i++ ){     
                dbResultSet.push(res[i]);
            }

            callback(null, dbResultSet);
        }

        });

        con.end();
    }
    catch(ex){
        callback(ex);
    }

};

app.listen(port);




