import { Avatar, Dropdown, Navbar } from "flowbite-react";

export const Header = () => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand href="https://flowbite.com/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Flowbite
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline={true}
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded={true}
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/navbars" active={true}>
          Home
        </Navbar.Link>
        <Navbar.Link href="/navbars">About</Navbar.Link>
        <Navbar.Link href="/navbars">Services</Navbar.Link>
        <Navbar.Link href="/navbars">Pricing</Navbar.Link>
        <Navbar.Link href="/navbars">Contact</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

// import { signIn, signOut, useSession } from "next-auth/react";

// export const Header = () => {
//   const { data: sessionData } = useSession();

//   return (
//     <div className="navbar bg-primary text-primary-content">
//       <div className="flex-1 pl-5 text-3xl font-bold">
//         {sessionData?.user?.name ? `Notes for ${sessionData.user.name}` : ""}
//       </div>
//       <div className="flex-none gap-2">
//         <div className="dropdown-end dropdown">
//           {sessionData?.user ? (
//             <label
//               tabIndex={0}
//               className="btn-ghost btn-circle avatar btn"
//               onClick={() => void signOut()}
//             >
//               <div className="w-10 rounded-full">
//                 <img
//                   src={sessionData?.user?.image ?? ""}
//                   alt={sessionData?.user?.name ?? ""}
//                 />
//               </div>
//             </label>
//           ) : (
//             <button
//               className="btn-ghost rounded-btn btn"
//               onClick={() => void signIn()}
//             >
//               Sign in
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };
