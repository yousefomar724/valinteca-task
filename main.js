const form = document.getElementById("register")
let username = document.getElementById("username"),
  email = document.getElementById("email"),
  password = document.getElementById("password"),
  password_confirmation = document.getElementById("password_confirmation"),
  errorMsgs = document.getElementsByClassName("error-msg"),
  emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  userData,
  userEmail = document.getElementById("user-email")

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

let validate = (values) => {
  // username
  if (values.username.trim() === "") {
    errorMsgs[0].innerHTML = "Username is required"
  } else if (
    values.username.length < 5 ||
    values.username.length > 15 ||
    /^[0-9]/.test(values.username) ||
    /[0-9]$/.test(values.username)
  ) {
    errorMsgs[0].innerHTML = "Invalid Username"
  } else {
    errorMsgs[0].innerHTML = ""
  }

  // email
  if (values.email.trim() === "") {
    errorMsgs[1].innerHTML = "Email is required"
  } else if (!values.email.match(emailRegex)) {
    errorMsgs[1].innerHTML = "Invalid email"
  } else {
    errorMsgs[1].innerHTML = ""
  }

  // password
  if (values.password.trim() === "") {
    errorMsgs[2].innerHTML = "Password is required"
  } else if (!values.password.match(passwordRegex)) {
    errorMsgs[2].innerHTML = "Invalid password"
  } else {
    errorMsgs[2].innerHTML = ""
  }

  // confirm password
  if (values.password_confirmation.trim() === "") {
    errorMsgs[3].innerHTML = "Confirm password is required"
  } else if (values.password_confirmation !== values.password) {
    errorMsgs[3].innerHTML = "Passwords must match"
  } else {
    errorMsgs[3].innerHTML = ""
  }

  let errors = {
    username: errorMsgs[0].innerHTML,
    email: errorMsgs[1].innerHTML,
    password: errorMsgs[2].innerHTML,
    password_confirmation: errorMsgs[3].innerHTML,
  }
  return errors
}

const handleSubmit = async (e) => {
  e.preventDefault()

  const newUser = {
    username: e.target.username.value,
    email: e.target.email.value,
    password: e.target.password.value,
    password_confirmation: e.target.password_confirmation.value,
  }

  let errors = validate(newUser)

  const endpoint = "https://goldblv.com/api/hiring/tasks/register"

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newUser),
  }

  if (Object.values(errors).every((err) => err === "")) {
    try {
      const response = await fetch(endpoint, options)
      const result = await response.json()
      e.target.reset()
      console.log(result)
      localStorage.clear()
      userData = localStorage.setItem("user-data", JSON.stringify(result))
      window.location.replace(
        "http://127.0.0.1:5500/htmlcss/linkedin-task/success.html"
      )
    } catch (error) {
      console.log(error)
    }
  }
}

// Check for page success & get the user data from localStorage
if (window.location.pathname === "/htmlcss/linkedin-task/success.html") {
  let data = JSON.parse(localStorage.getItem("user-data"))
  userEmail.innerHTML = data?.email
  userEmail.href = `mailto:${data?.email}`
}

form.addEventListener("submit", (e) => handleSubmit(e))
