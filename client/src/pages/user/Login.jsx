import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useState } from "react"

const Login = () => {

    const [signupInput, setSignupInput] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [loginInput, setLoginInput] = useState({
        email: "",
        password: ""
    })

    const inputChangeHandler = (e, type) => {
        const { name, value } = e.target;

        if (type === "signup") {
            setSignupInput({ ...signupInput, [name]: value })
        } else {
            setLoginInput({ ...loginInput, [name]: value })
        }

    }

    const handleRegistration = (type) => {
        const inputData = type === "signup" ? signupInput : loginInput
    }

    return (
        <div className="w-full justify-center items-center flex">
            <Tabs defaultValue="signup" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                    <TabsTrigger value="login">Login</TabsTrigger>
                </TabsList>
                <TabsContent value="signup">
                    <Card>
                        <CardHeader>
                            <CardTitle>Signup</CardTitle>
                            <CardDescription>
                                Create a new account and Click signup when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    name='name'
                                    value={signupInput.name}
                                    onChange={(e)=>inputChangeHandler(e,"signup")}
                                    defaultValue="Eg. Name"
                                    type='text'
                                    required="true" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={signupInput.email}
                                    onChange={(e)=>inputChangeHandler(e,"signup")}
                                    defaultValue="Eg. abc@gmail.com"
                                    type='email'
                                    required="true"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    value={signupInput.password}
                                    onChange={(e)=>inputChangeHandler(e,"signup")}
                                    defaultValue="Eg. xyz"
                                    type='password'
                                    required="true"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={()=>handleRegistration("signup")}>Signup</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="login">
                    <Card>
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Login your account here with email and password.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="loginEmail">Email</Label>
                                <Input
                                    id="loginEmail"
                                    name="email"
                                    value={loginInput.email}
                                    onChange={(e)=>inputChangeHandler(e,"login")}
                                    defaultValue="Eg. abc@gmail.com"
                                    type='email'
                                    required="true"
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="loginPassword">Password</Label>
                                <Input
                                    id="loginPassword"
                                    name="password"
                                    value={loginInput.password}
                                    onChange={(e)=>inputChangeHandler(e,"login")}
                                    defaultValue="Eg. xyz"
                                    type='password'
                                    required="true"
                                />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={()=>handleRegistration("login")}>Login</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default Login
