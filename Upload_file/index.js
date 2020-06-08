const http = require('http')
const formidable = require('formidable')
const fs = require('fs')
// Sử dụng module fs để đọc nội dung view
const viewFormUpload = fs.readFileSync("./viewUpload.html");

//Khởi tạo sever
http.createServer(function (req, res) {
    //Bắt yêu cầu resquest gửi đến url /upload có method là POST
    if (req.url == '/upload' && req.method == 'POST') {
      //Khởi tạo đối tượng formidable
      const option = {
      }
      const form = new formidable.IncomingForm();
      //Tiến hành parse form
      form.parse(req, function (err, fields, files) {
        //Lấy đượng dẫn tạm thời của  file khi upload
        let oldPath = files.files.path
        //Đường dẫn mới khi upload 
        let newPath = __dirname + '/uploads/' + files.files.name
        //Tiến hành rename file tạm thời thành đường dẫn file mới
        fs.rename(oldPath, newPath, (err) => {
           //Trả ra lõi nếu gặp
           if (err) return res.end(err)
   
           //Trả về kết quả thành công
           return res.end('<h1 style="color: green;">Upload File Success!</h1>')
        })
      })
    } else {
      //Hiển thị ra form upload file
      res.writeHead(200, {'Content-Type': 'text/html'});
      return res.end(viewFormUpload);
    }
}).listen(3000);

