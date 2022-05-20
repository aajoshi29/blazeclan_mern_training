function register() {
  document.getElementById("error_common").setAttribute("hidden", true);
  document.getElementById("success_common").setAttribute("hidden", true);
  if (document.getElementById("username").value.trim() === "") {
    document.getElementById("error_username").removeAttribute("hidden");
    return;
  }
  document.getElementById("error_username").setAttribute("hidden", true);
  if (document.getElementById("password").value.trim() === "") {
    document.getElementById("error_password").removeAttribute("hidden");
    return;
  }
  document.getElementById("error_password").setAttribute("hidden", true);
  let response = fetch("http://localhost:7011/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
    }),
  });

  response
    .then((res) => {
      if (res.status === 400) {
        res.json().then((data) => {
          document.getElementById("error_common").innerHTML = data.message;
          document.getElementById("error_common").removeAttribute("hidden");
          return;
        });
      }
      return res.json();
    })
    .then((data) => {
      document.getElementById("success_common").innerHTML = data.message;
      document.getElementById("success_common").removeAttribute("hidden");
    })
    .catch((error) => {
      console.log(error.error);
    });
}
