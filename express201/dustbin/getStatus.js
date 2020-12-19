const express = require('express');
const helmet = require('helmet');
const mysql = require('mysql');

const app = express();
const port = 3000;


/* Begin DB Connection And Handling */

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: ""
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
  

function runQuery(sql){ 
      
     con.query(sql, function (err,result){
          if (err) throw err;
		  
		//console.log(JSON.stringify(result));

     });
 }



 /* End DB Connection And Handling */

app.use(helmet());
app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get('/getStatus',(req,res) => {
    
    console.log("Analysis Id is "+req.query.analysis_id);
    let analysis_id = req.query.analysis_id;

    /* ==== Get Data From Database ===== */
	let sql = "use sap_cli0001_a10004";
  	runQuery(sql);

	sql = 'SELECT table_rows FROM information_schema.tables WHERE table_schema = "sap_cli0001_a10005" AND table_name = "role_build" ';

	//sql = "Select count(*) as total_role_build from role_build ";
	console.log(sql);


   	con.query(sql, function (err,result){
          
   		  let total_role_build = 0;

          if (err) throw err;

          console.log("Length "+result.length);

          //console.log(JSON.stringify(result));

          if(result.length > 0 ){
          	total_role_build = JSON.stringify(result[0].table_rows);
          }
          
          //console.log(total_role_build);

          //total_role_build = 29;

          let rolebuild_html = '<div class="form-group" style="margin-top: -8px"><label class="clavel">Total Role Build : '+total_role_build+'</label><br></div>';
    	  res.jsonp({ "rolebuild_html" : rolebuild_html });

     });

   

   	

   	/* ==== Prepare Response ==== */

	



});

app.listen(port);