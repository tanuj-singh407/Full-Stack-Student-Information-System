let express = require("express");
let connection = require("./mysqlconnection");
let cors = require("cors");
let app = express();
app.use(express.json());
app.use(cors([""]));

app.get("/", (req, resp) => {
    connection.query("select * from student_data", (err, result) => {
        if (err) { resp.send("error in api") }
        else { resp.send(result) }
    });
});

app.post("/", (req, resp) => {
    let data = req.body;
    connection.query("INSERT INTO student_data SET?", data, (error, result, fields) => {
        if (error) { return resp.status(500).send("error:-" + error) }
        else { return resp.status(200).send(result) }
    })
})


app.put("/:id", (req, resp) => {
    // console.log( req.body.name, req.body.username, req.body.emailid, req.body.password, req.params.id)
    let data = [req.body.Sfirstname, req.body.Ssecondname, req.body.Srollno, req.body.Smobile, req.body.Sclass, req.params.id];
    console.log(data);
    connection.query("UPDATE student_data SET Sfirstname = ?, Ssecondname = ?, Srollno = ?, Smobile = ?, Sclass = ? WHERE userid = ?", data, (error, result, fields) => {
        if (error) {
            return resp.status(500).send("here is some error" + error)
        }
        else {
            return resp.status(200).send({ "Success": result })
        }
    })
})
app.delete("/:id", (req, resp) => {
    let id = [req.params.id];
    connection.query("DELETE FROM student_data WHERE userid = ?", id, (err, result, fields) => {
        if (err) { return resp.status(500).send("here is some error:" + err) }
        else { return resp.status(200).send(result) }
    })
})

app.listen(20201);

