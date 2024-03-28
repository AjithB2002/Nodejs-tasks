var fs =require('fs');


var data = "New content for new file";
fs.writeFile('demo1.txt',data,function(err){
    if (err) {
        console.log(err);
    }
    console.log('success.The file is written');
    fs.readFile('demo.txt',function(err,data) {
            if (err) {
                console.log(err);
            }
            console.log(data.toString());
        });
})
