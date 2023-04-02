import axios from "axios";

export function Login() {
  const handleSubmit = (event) => {
    //overrides the submit button normal behavior in the form
    event.preventDefault();
    const params = new FormData(event.target);

    axios
      .post("http://localhost:3000/sessions.json", params)
      .then((response) => {
        console.log(response.data);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.jwt}`;
        localStorage.setItem("jwt", response.data.jwt);
        event.target.reset();
        response.data.user_admin === true
          ? (window.location.href = "/supervisor")
          : (window.location.href = "/field");
      })
      .catch((error) => {
        console.log(error.response.data.errors);
      });
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email"></input>
        <label>Password</label>
        <input type="password" name="password"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
