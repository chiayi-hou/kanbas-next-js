import Link from "next/link";
import { FormControl } from "react-bootstrap";

export default function Signin() {
 return (
   <div id="wd-signin-screen" className="w-25">
     <h1>Sign in</h1>
     <FormControl placeholder="username" id="wd-username" className="mb-2"/> 
     <FormControl placeholder="password" type="password" id="wd-password" className="mb-2"/> 
     <Link href="/Dashboard" id="wd-signin-btn" className="btn btn-primary w-100 mb-2"> Sign in </Link> 
     <Link href="Signup" id="wd-signup-link">Sign up</Link>
   </div>
);}
