import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData={
    email:'',
    password:''
  }
  resultMsg = {
    body:'',
    display:false,
    resultType:false
  }
  constructor(private router:Router,private http:HttpClient) { }

  ngOnInit() {
  }
  submitLogin(){
    var SubmitUrl = 'http://localhost:3000/login';
    console.log(this.userData);
    this.http.post(SubmitUrl,this.userData).subscribe(
      
      data=>{
              this.resultMsg.display = true;
              if(data["result"] == "success"){
                  this.resultMsg.resultType = true;
                  this.resultMsg.body = data["message"];
                  localStorage.setItem('username',data['username']);
                  localStorage.setItem('LoggedIn','true');
                  setTimeout(()=>{
                        this.router.navigate(['/dashboard']);
                  },1000)
                  window.scrollTo(0,0);
              }else{
                this.resultMsg.resultType = false;
                if(data["errors"])
                  this.resultMsg.body = data["errors"][0]["msg"];
                else
                  this.resultMsg.body = data["message"];
                  window.scrollTo(0,0);
                  
              }
              console.log(data);
      },

      err=>{
              console.log(err);
      }
    );

  }

}
