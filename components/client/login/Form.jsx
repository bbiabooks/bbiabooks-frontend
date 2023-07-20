"use client";
import Image from "next/image";

const Form = ({
  type,
  login,
  setLogin,
  submitting,
  handleSubmit }) => {

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="flex flex-col-reverse md:flex-row md:space-x-8 max-w-3xl mx-auto">
        <div className="glassmorphism w-full md:w-1/2 p-8 rounded-lg shadow-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">
              Your Gateway to Book Adventures!
            </h1>
            <p className="text-gray-600 mt-2">
              Log in to gain access to a vast collection of captivating books.
            </p>
          </div>
          <form onSubmit={ handleSubmit }>
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-900">Username</span>
                <div className="flex flex-row border border-gray-300 w-full bg-white rounded">
                  <div className="flex justify-start items-center mx-2 opacity-60">
                    <Image
                      src="/username.svg"
                      alt="Username"
                      width={ 24 }
                      height={ 24 }
                      className="object-cover"
                    />
                  </div>
                  <input
                    className="px-3 py-2 w-full rounded"
                    value={ login.username }
                    onChange={ (e) =>
                      setLogin({ ...login, username: e.target.value })
                    }
                    type="text"
                    placeholder=""
                    required
                  />
                </div>
              </label>
            </div>
            <div className="mb-4">
              <label className="block mb-2">
                <span className="text-gray-900">Password</span>
                <div className="flex flex-row border border-gray-300 w-full bg-white rounded">
                  <div className="flex justify-start items-center mx-2 opacity-60">
                    <Image
                      src="/password.svg"
                      alt="Password"
                      width={ 22 }
                      height={ 22 }
                      className="object-cover"
                    />
                  </div>
                  <input
                    className="px-3 py-2 w-full rounded"
                    value={ login.password }
                    onChange={ (e) =>
                      setLogin({ ...login, password: e.target.value })
                    }
                    type="password"
                    required
                  />
                </div>
              </label>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={ submitting }
                className={ `bg-cyan-700 ${submitting ? "cursor-not-allowed" : "hover:bg-orange-300"
                  } text-white font-bold px-4 py-2 rounded-full` }
              >
                { submitting ? "Logging in..." : type }
              </button>
            </div>
          </form>
        </div>
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <div className="flex items-center justify-center pl-10">
            <Image
              src="/login.svg"
              alt="Login Image"
              width={ 500 }
              height={ 500 }
              priority
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
