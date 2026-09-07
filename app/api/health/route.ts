export async function GET() {
  return Response.json({
    status: "ok",
    app: "KTU Mate",
    message: "KTU Mate API is running",
  });
}