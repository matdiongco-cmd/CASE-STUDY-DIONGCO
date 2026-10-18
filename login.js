// Use the following to include this JavaScript file 
// <script src="script1.js"></script>

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

localStorage.setItem("Username", "")

  const inputInfo = {
    Username: getinner("Username"),
    Password: getinner("Password")
  }

  let add = false

  for (let v of loginInfo) {
      if (v.Username === inputInfo.Username) {
          add = true
          break
      }
  }
 
  if (!add) {
      alert("Register an account first, account does not exist.")
      return
  }

  console.log(loginInfo)
  localStorage.setItem("Username", inputInfo.Username)
    window.location.href = 'home.html'
  
}
