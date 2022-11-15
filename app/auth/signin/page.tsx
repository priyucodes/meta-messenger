import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import SignInComponent from './SignInComponent';
const SignInPage = async () => {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div className="">
        <Image
          className="rounded-full object-cover mx-2"
          width={700}
          height={700}
          alt="Meta Logo"
          src="https://links.papareact.com/161"
        />
      </div>

      <SignInComponent providers={providers} />
    </div>
  );
};
export default SignInPage;
