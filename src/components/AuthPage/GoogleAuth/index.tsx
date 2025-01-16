import { useGoogleLogin } from "@react-oauth/google";

export interface googleProp {
  isLoading: boolean;
  isLogin: boolean;
}

export const GoogleAuth = (google: googleProp) => {
  const login = useGoogleLogin(
    {
      onSuccess: async (credentialResponse) => {
        const userInfo = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            method: "GET",
            headers: {
              Authorization: `Token ${credentialResponse.access_token}`,
            },
          }
        ).then((res) => console.log(res));

        // const decodedCredentialResponse = jwtDecode(credentialResponse);
        console.log(userInfo);
      },
    }
    // onError: () => {
    //     console.log("Login Failed")
    // }}}
  );

  return (
    <button
      onClick={() => login()}
      disabled={google.isLoading}
      className="w-full inline-flex items-center py-2 px-8 justify-between border border-gray-300 rounded-full shadow-sm bg-white text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <svg className="h-8 w-8 mr-2" viewBox="0 0 24 24">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#EA4335"
        />
      </svg>
      Sign {google.isLogin ? "in" : "up"} with Google
      <div className=""></div>
    </button>
  );
};
