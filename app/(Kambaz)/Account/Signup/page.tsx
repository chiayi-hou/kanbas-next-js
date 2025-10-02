import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signup() {
  return (
    <div id="wd-signup-screen" className="w-25">
      <h1>Sign up</h1>
      <FormControl placeholder="username" defaultValue={"hou.chi"} id="wd-username" className="mb-2"/>
      <FormControl placeholder="password" defaultValue={"12345"} type="password" id="wd-password" className="mb-2"/>
      <FormControl placeholder="verify password"  defaultValue={"12345"}
             type="password" id="wd-password-verify" className="mb-2"/>
      <Link  href="Profile" className="btn btn-primary w-100 mb-2"> Sign up </Link>
      <Link  href="Signin" > Sign in </Link>
    </div>
);}
