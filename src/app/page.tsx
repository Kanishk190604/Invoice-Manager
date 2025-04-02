import { Button } from "@/components/ui/button";
import { SignInButton, SignedOut } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Link from "next/link";

export default function Home() {
  return (<div>
    {/* <header className="flex items-baseline justify-between mx-7  my-4"><div className="m-4"><span className="font-bold text-xl ">Invoiceopedia</span><span className="m-4 text-xl text-gray-300">/</span></div><div><DropdownMenu>
  <DropdownMenuTrigger>Open</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel><Link href={'/signin'}>My Account</Link></DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Billing</DropdownMenuItem>
    <DropdownMenuItem>Team</DropdownMenuItem>
    <DropdownMenuItem>Subscription</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu></div>
</header> */}
    <div className="flex flex-col justify-center items-center h-screen position-relative gap-6">
      <div className="font-bold text-5xl">
        Invoicopedia
      </div>
      <div><SignedOut><SignInButton/></SignedOut>
      <Button><Link href={'/invoice/dashboard'}>Dashboard</Link></Button></div>

      
    </div>
    </div>
  );
}
