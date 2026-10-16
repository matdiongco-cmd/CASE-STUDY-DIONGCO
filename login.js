// Use the following to include this JavaScript file 
// <script src="script1.js"></script>
var i = 10;


const externalInfo = {
  UserLoginName: ""
}

let loginInfo =  JSON.parse(localStorage.getItem("LOGIN_INFO")) ?? []

 // A shortcut for creating a new innerHTML
          function modify(id, innerHTML) {
            document.getElementById(id).innerHTML = innerHTML
          }

          // A shortcut for getting the html element
          function retrieve(id) {
            return document.getElementById(id)
          }

          // A shortcut for getting the html element's text input
          function getinner(id) {
            return retrieve(id).value
          }


function OnAdd() {


  const inputInfo = {
    Username: getinner("Username"),
    Password: getinner("Password")
  }

  let add = true

  for (let v of loginInfo) {
      if (v.Username === inputInfo.Username) {
          add = false
          break
      }
  }

 
  if (add) {
    loginInfo.push(inputInfo)
  }

   console.log(loginInfo)
    
  externalInfo.UserLoginName = inputInfo.Username

  localStorage.setItem("LOGIN_INFO", JSON.stringify(loginInfo))
    window.location.href = 'home.html'
  
}
