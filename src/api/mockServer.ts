import { MockServerResponse } from "../types/mockServer";

const mockServer = (
  code: string,
  language: string
): Promise<MockServerResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (language === "javascript" && code.includes("console.log")) {
        resolve({ status: "success", output: "Hello, JavaScript!" });
      } else if (language === "python" && code.includes("print")) {
        resolve({ status: "success", output: "Hello, Python!" });
      } else {
        resolve({ status: "error", error: "SyntaxError: Unexpected token" });
      }
    }, 1000);
  });
};

export default mockServer;
