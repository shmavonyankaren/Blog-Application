import { SignIn } from "@clerk/nextjs";
import LogoName from "@/components/LogoName";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50 dark:bg-linear-to-br dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center py-12 px-4 transition-colors duration-300">
      <div className="w-full max-w-md flex justify-center items-center flex-col">
        <div className="mb-8 text-center">
          <div className="flex items-center text-black dark:text-white justify-center mb-6">
            <LogoName color="text-black dark:text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Sign in to continue to your blog
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white dark:bg-slate-900 shadow-xl dark:shadow-slate-950/40 rounded-2xl border border-gray-200 dark:border-slate-800 p-6",
              headerTitle: "text-gray-900 dark:text-white font-bold text-lg",
              headerSubtitle: "text-gray-600 dark:text-gray-300",
              socialButtonsBlockButton:
                "bg-white dark:bg-slate-800 border-2 border-gray-300 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-100 font-medium transition-all",
              socialButtonsBlockButtonText: "font-medium",
              formButtonPrimary:
                "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all",
              formFieldInput:
                "bg-white dark:bg-slate-800 text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
              formFieldLabel: "text-gray-700 dark:text-gray-200 font-medium",
              footerActionLink:
                "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 font-medium",
              identityPreviewText: "text-gray-700 dark:text-gray-200",
              identityPreviewEditButton:
                "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400",
              formResendCodeLink:
                "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400",
              otpCodeFieldInput:
                "bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500",
            },
          }}
        />
      </div>
    </div>
  );
}
