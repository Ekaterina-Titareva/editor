export interface MockServerResponse {
  status: "success" | "error";
  output?: string;
  error?: string;
}
