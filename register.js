// Use the following to include this JavaScript file 
// <script src="script1.js"></script>
var i = 10;

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


  if (!inputInfo.Username) {
    alert("Please don't leave the username blank.")
    return
  }

   if (!inputInfo.Password) {
    alert("Please don't leave the password blank.")
    return
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
  } else {
    alert("Username already exists! Use a different username.")
    return
  }

  localStorage.setItem("LOGIN_INFO", JSON.stringify(loginInfo))
  alert("Register successful, you may now login!")
    window.location.href = 'index.html'
  
}
