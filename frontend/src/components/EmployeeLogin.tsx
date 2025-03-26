import * as React from "react";

import { Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function EmployeeLogin() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Employee/Manager Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Employee/Manager Login</DialogTitle>
          <DialogDescription>
            Enter your credentials here. Click enter to log in.
          </DialogDescription>
        </DialogHeader>
        <ProfileForm />
      </DialogContent>
    </Dialog>
  );
}

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = CheckLogin(e);
    if (check == 1) {
      //Employee
      window.location.href = "/kiosk";
    } else if (check == 2) {
      //Manager
      window.location.href = "/kiosk";
    } else {
      //Invalid
      window.location.href = "/kiosk";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-4", className)}
    >
      <div className="grid gap-2">
        <Label htmlFor="username">Email</Label>
        <Input type="username" id="username" defaultValue="" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="password">Username</Label>
        <Input id="password" defaultValue="" />
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}

function CheckLogin(e: React.FormEvent) {
  const [data, setData] = React.useState({});
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  const username = formData.get("username");
  const password = formData.get("password");

  useEffect(() => {
    async function getHome() {
      const res = await fetch("http://localhost:3000/logins/" + username + "/" + password);
      const json = await res.json();
      setData(json);
      // console.log(json["status"]);
    }

    getHome();
  }, []);

  return 1;
}

export default EmployeeLogin;
