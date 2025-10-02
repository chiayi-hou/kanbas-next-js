import Link from "next/link";
import { FormControl, Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div id="wd-profile-screen" className="w-25">
      <h1>Profile</h1>
      <FormControl defaultValue="hou.chi" placeholder="username" id="wd-username" className="mb-2"/>
      <FormControl defaultValue="12345"   placeholder="password" type="password" id="wd-password" className="mb-2" />
      <FormControl defaultValue="Chia-Yi" placeholder="First Name" id="wd-firstname" className="mb-2" />
      <FormControl defaultValue="Hou" placeholder="Last Name" id="wd-lastname" className="mb-2" />
      <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" className="mb-2" />
      <FormControl defaultValue="hou.chi@northeastern.edu" type="email" id="wd-email" className="mb-2" />
      <Form.Select defaultValue="FACULTY" id="wd-role" className="mb-2">
        <option value="USER">User</option>       <option value="ADMIN">Admin</option>
        <option value="FACULTY">Faculty</option> <option value="STUDENT">Student</option>
      </Form.Select>
      <Link href="Signin" className="btn btn-danger w-100 mb-2"> Sign out </Link>
    </div>
);}
