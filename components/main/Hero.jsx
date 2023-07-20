import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="flex flex-col-reverse sm:flex-row justify-center items-center p-8">
      <div className="w-full h-full sm:w-1/2 pb-8">
        <h1 className="font-h1 text-6xl font-black mt-0 mb-4">BBIA LIBRARY</h1>
        <h2 className="text-3xl font-bold mt-0 mb-4">
          Journey into the Realm of Learning
        </h2>
        <p className="text-gray-600 mb-8">
          Step into our school library and embark on a journey where books come
          to life and curiosity knows no bounds. Immerse yourself in captivating
          stories, delve into fascinating subjects, and expand your horizons
          with our extensive collection of books and educational resources.
          Ignite your passion for learning and let the library be your guide.
        </p>
        <Link href="/client/registration/signup">
          <button className="bg-cyan-700 hover:bg-orange-300 text-white font-bold text-base px-4 py-2 rounded-full">
            SIGNUP
          </button>
        </Link>
      </div>
      <div className="w-full h-full sm:w-1/2 flex justify-end items-center my-4 px-4">
        <Image
          src="/hero.svg"
          alt="Hero Image"
          width={ 8000 }
          height={ 8000 }
          className="object-contain"
        />
      </div>
    </section>
  );
};

export default Hero;
