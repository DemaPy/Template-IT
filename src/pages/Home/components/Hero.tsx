import { Button } from "@/components/ui/button";
import Title from "../../../components/Title";
import { Link } from "react-router-dom";
import { useAuth } from "@/store/login";

const Hero = () => {
  const { isLogged } = useAuth();

  return (
    <section className="flex items-center justify-center min-h-screen text-center select-none relative">
      <div className="absolute inset-0 backdrop-blur-sm bg-gradient-to-b from-cyan-300/20 to-slate-200/50"/>
      <div className="container max-w-5xl grid place-items-center relative px-4">
        <div className="cursor-pointer hover:scale-105 transition-all rounded-full text-stone-100 text-lg flex font-semibold items-center px-3 py-1 -top-1/3 bg-gradient-to-tr from-slate-900/80 to-blue-950/80">
          enroll now for <span className="text-blue-400 ms-1.5">free</span>
        </div>
        <Title
          size={"lg"}
          title={`
            Create templates,
            swap content
            and render sections conditioonally
            with integrated services
          `}
        />
        {!isLogged && (
          <div className="mt-12 flex gap-2">
            <Button asChild variant={"ghost"}>
              <Link to={"/register"}>Register</Link>
            </Button>
            <Button className="bg-slate-700" asChild>
              <Link to={"/login"}>Login</Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
