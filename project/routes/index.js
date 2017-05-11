
exports.listSysTables = function(ibmdb,connString)
{
    return function(req, res) {


       ibmdb.open(connString, function(err, conn) {
			if (err ) {
			 res.send("error occurred " + err.message);
			}
			else
      {
							//DASH11223.BLADE_CLEANSED
              conn.query("SELECT FLIGHT_ID, DAMAGE from DASH11223.BLADE_CLEANSED limit 10", function(err, tables, moreResultSets) {

			  if ( !err )
        {

          console.log(Object.keys(tables[0]));
					//res.render('tablelist', {
          res.render('tablelist', {
						"tablelist" : tables,
						"tableName" : "10 rows from the DASH11223.BLADE_CLEANSED",
						"message": "Congratulations. Your connection to dashDB is successful."

          });//Cierre de render


				} else {
				   res.send("error occurred " + err.message);
				}

				/*
					Close the connection to the database
					param 1: The callback function to execute on completion of close function.
				*/
				conn.close(function(){
					console.log("Connection Closed");
					});
				});//Cierre conn.query
			}//Cierre de else
		} );

	}
	}
