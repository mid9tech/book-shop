import Link from "next/link";

const AuthHeader = () => {
  return (
    <>
      <header className="bg-black pl-40 pr-40 py-5 flex justify-between items-center">
        <div className="flex">
          <Link
            href="/"
            className="flex text-5xl font-mono font-semibold hover:cursor-pointer"
          >
            <span className="text-white font-bold bg-gradient-to-r from-blue-500 to-blue-700 px-2 rounded-md">
              Mid9
            </span>
            <p className="text-blue-700">Shop</p>
          </Link>
          <h1 className="text-white text-4xl ml-5">Authentication</h1>
        </div>

        <a
          href="/"
          className="text-white hover:text-blue-700 hover:cursor-pointer"
        >
          You need any help?
        </a>
      </header>
    </>
  );
};

export default AuthHeader;
