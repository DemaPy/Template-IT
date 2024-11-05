import PageContainer from "@/components/PageContainer";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

type ErrorPageProps = {
  message: string | null;
  path: string;
};

class ErrorItem {
  timestamp: number;
  token: string;
  message: string;

  constructor({ message }: { message: string }) {
    this.timestamp = Date.now();
    this.token = localStorage.getItem("token") || "Token not found";
    this.message = message;
  }
}

export const ErrorPage = ({ message, path }: ErrorPageProps) => {
  useEffect(() => {
    try {
      toast.error(message || "Something went wrong.");
      const errors = JSON.parse(localStorage.getItem("errors") || "[]");
      const err = new ErrorItem({
        message: message || "Something went wrong.",
      });
      localStorage.setItem("errors", JSON.stringify([...errors, err]));
    } catch (error) {
      const err = new ErrorItem({
        message: localStorage.getItem("errors") || "Error storage empty",
      });
      localStorage.setItem("critical-errors", JSON.stringify(err));
    }
  }, []);

  return (
    <PageContainer>
      <Title title={message} />
      <Button variant={"outline"} asChild>
        <Link to={path}>Go to {path.replace("/", "") === "" ? "Return to home" : "Go to" + path.replace("/", "")}</Link>
      </Button>
    </PageContainer>
  );
};
