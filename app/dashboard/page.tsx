import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardContent from "@/components/DashboardContent";
import { CloudUpload } from "lucide-react";
import Navbar from "@/components/Navbar";

export default async function Dashboard() {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId) {
    redirect("/sign-in");
  }

  // Serialize the user data to avoid passing the Clerk User object directly
  const serializedUser = user
    ? {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        imageUrl: user.imageUrl,
        username: user.username,
        emailAddress: user.emailAddresses?.[0]?.emailAddress,
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-100">
      <Navbar user={serializedUser} />

      <main className="flex-1 container mx-auto py-8 px-6">
        <DashboardContent
          userId={userId}
          userName={
            user?.firstName ||
            user?.fullName ||
            user?.emailAddresses?.[0]?.emailAddress ||
            ""
          }
        />
      </main>

      <footer className="bg-zinc-950 border-t border-zinc-800 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <CloudUpload className="h-5 w-5 text-amber-500" />
              <h2 className="text-lg font-bold text-white">Droply</h2>
            </div>
            <p className="text-zinc-400 text-sm">
              &copy; {new Date().getFullYear()} Droply
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}