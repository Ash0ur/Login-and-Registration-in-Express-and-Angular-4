import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  userData ={
    fullname:'',
    username:'',
    email:'',
    password:'',
    confirmPassword:''
  }

  resultMsg = {
    body:'',
    display:false,
    resultType:false
  }
  constructor(private http:HttpClient,private router:Router) { }

  ngOnInit() {
  }

  submitRegister(){
    var SubmitUrl = 'http://localhost:3000/register';
    console.log(this.userData);
    this.http.post(SubmitUrl,this.userData).subscribe(
      
      data=>{

              this.resultMsg.display = true;
              if(data["result"] == "success"){
                  console.log('entered');
                  this.resultMsg.resultType = true;
                  this.resultMsg.body = "Registration successfully , You can login now";
                  setTimeout(()=>{
                    this.router.navigate(['/login']);
                  },2000)
                  window.scrollTo(0,0);
              }else{
                  console.log(data);
                  this.resultMsg.resultType = false;
                  if(data["errors"])
                    this.resultMsg.body = data["errors"][0]["msg"];
                  else
                    this.resultMsg.body = data["message"];
                  
                  window.scrollTo(0,0);
              }
      },
      
      err=>{
               console.log(err);
      }
    )

  }
  
}
