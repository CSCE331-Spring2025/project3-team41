import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { API_URL } from "@/lib/constants";
// EmployeeLogin verifies credentials against the backend and sets the user's role in localStorage.
export function EmployeeLogin() { //Main button and return
  const [open, setOpen] = React.useState(false);

  return (
    <div>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white">Employee/Manager Login</Button>
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
    </div>
  );
}

interface LoginForm {
  username: string;
  password: string;
}

export function ProfileForm() {
  const [error, setError] = useState<string | null>(null);

  const formSchema = z.object({
    username: z.string().nonempty(),
    password: z.string().nonempty(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const check = await CheckLogin(values as LoginForm);
    if (check == 0) {
      //Employee
      localStorage.setItem("userRole", "employee");
      window.location.href = "/order";
    } else if (check == 1) {
      //Manager
      localStorage.setItem("userRole", "manager");
      window.location.href = "/display";
    } else {
      //Invalid
      setError("Invalid username or password. Please try again.");
    }
  }

  return ( //Form of username and password with input validation
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="your_name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="your_password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

async function CheckLogin(values: LoginForm): Promise<number> { //Verifies with SQL database
  const res = await fetch(
    `${API_URL}/logins/${values.username}/${values.password}`
  );
  const json = await res.json();

  console.log(JSON.stringify(json));
  if (json.perm !== undefined) {
    return json.perm;
  }

  return 0;
}

export default EmployeeLogin;
