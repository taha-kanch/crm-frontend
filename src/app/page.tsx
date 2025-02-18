import Link from "next/link";

export default function HomePage() {

    return (
        <div className="min-h-screen bg-white overflow-hidden">
            {/* Navigation */}
            <header className="flex w-full h-[155px] mb-5">
                <div className="flex-[8.5] flex items-center px-10 justify-between" style={{ borderRadius: "0 0 90px 0px" }}>
                    <img src="/MainLogo1.png" alt="Placeholder" width={120} height={120} />
                    <nav className="flex w-full items-center justify-between text-lg">
                        <div className="flex space-x-20 justify-center flex-1">
                            <button className="px-5 py-2 border border-black border-2 rounded-full font-bold">
                                Home
                            </button>
                            <button className="text-black font-bold">About</button>
                            <button className="text-black font-bold">Mission</button>
                        </div>
                    </nav>
                </div>
                <div className="flex-[1.5] bg-white flex items-center justify-center">
                    <img src="/MainLogo3.png" alt="Placeholder" width={100} height={100} />
                </div>
            </header>

            <main className="container mx-auto px-4 mt-20 flex justify-between items-center">
                <div className="relative w-1/2">
                    <img src="/MainLogo4.png" alt="Left Side Image" className="w-full h-full" />
                </div>
                <div className="w-1/2 pl-20">
                    <p className="text-gray-600 mb-2">As owner</p>
                    <h1 className="text-4xl font-bold mb-2">
                        Alit Tech<span className="text-primary">nologies</span>
                    </h1>
                    <div className="mt-8">
                        <h2 className="text-6xl font-bold leading-tight">
                            Grow Faster
                            <br />
                            Work Smarter
                        </h2>
                    </div>
                    <p className="text-gray-600 mt-6 text-xl">MAKE SMARTER DECISION</p>
                    <Link href="/signup" className="w-fit mt-12 bg-primary px-20 py-4 rounded-full text-xl font-medium flex items-center gap-4">
                        Click To Sign Up
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M4 12H20M20 12L14 6M20 12L14 18"
                                stroke="black"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </Link>
                </div>
            </main>
        </div>
    );
}