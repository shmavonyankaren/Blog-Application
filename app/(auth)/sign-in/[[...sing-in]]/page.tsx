import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex-1 min-h-screen bg-linear-to-br from-gray-50 via-indigo-50 to-purple-50 flex justify-center items-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Sign in to continue to your blog</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "bg-white shadow-2xl rounded-2xl border border-gray-200",
              headerTitle: "text-gray-900 font-bold",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton:
                "bg-white border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-medium transition-all",
              socialButtonsBlockButtonText: "font-medium",
              formButtonPrimary:
                "bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all",
              formFieldInput:
                "border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500",
              formFieldLabel: "text-gray-700 font-medium",
              footerActionLink:
                "text-indigo-600 hover:text-indigo-700 font-medium",
              identityPreviewText: "text-gray-700",
              identityPreviewEditButton:
                "text-indigo-600 hover:text-indigo-700",
              formResendCodeLink: "text-indigo-600 hover:text-indigo-700",
              otpCodeFieldInput:
                "border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500",
            },
          }}
        />
      </div>
    </div>
  );
}
